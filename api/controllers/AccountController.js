/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const ecc = require('eosjs-ecc')

module.exports = {

    /**
     * 判断用户名是否存在
     */
    isExitUsername: async function (req, res) {
        let username = req.query.username
        Eos.getAccount(username)
            .then(result => {
                res.send(Message.successMessage('', true))
            })
            .catch(err => {
                res.send(Message.errMessage(err))
            });
    },

    /**
    * 登录（用户名，私钥登录）
    */
    login: (req, res) => {
        let username = req.body.username
        let password = req.body.password
        let permName = 'owner'

        //私钥生成的公钥
        if (!ecc.isValidPrivate(password)) return res.send(Message.errMessage('Incorrect Password')) // privatekey is not valid
        let publicKeyFromPrivate = ecc.privateToPublic(password)

        //通过用户名拿到的公钥
        Eos.getAccount(username)
            .then(result => {

                let publicKeyFromAccount = []
                for (let i of result.permissions) {
                    if (i.perm_name == permName) {
                        for (let j of i.required_auth.keys) {
                            publicKeyFromAccount.push(j.key)
                        }
                    }
                }

                if (publicKeyFromAccount.indexOf(publicKeyFromPrivate) > -1) {
                    res.send(Message.errMessage('Incorrect Password')) // account and privatekey is not match
                } else {
                    res.send(Message.successMessage('', { publicKey: publicKeyFromPrivate }))
                }

            })
            .catch(err => {
                res.send(Message.errMessage('Incorrect Password')) // account is not exit
            });

    },


    /**
     * 注册账户
     */
    register: async function (req, res) {
        let username = req.body.username    // Note that account names must be lower case and should be less than 13 characters. (Only contains the following symbol .12345abcdefghijklmnopqrstuvwxyz). Note that 6,7,8,9,0 are not allowed.

        let initaPrivate = await ecc.randomKey()
        let initaPublic = ecc.privateToPublic(initaPrivate)

        let data = {
            username: username,
            privateKey: initaPrivate,
            publicKey: initaPublic,
        }

        Eos.transaction(tr => {
            tr.newaccount({
                creator: 'eosio',
                name: username,
                owner: initaPublic,
                active: initaPublic
            })

            tr.buyrambytes({
                payer: 'eosio',
                receiver: username,
                bytes: 8192
            })

            tr.delegatebw({
                from: 'eosio',
                receiver: username,
                stake_net_quantity: '10.0000 SYS',
                stake_cpu_quantity: '10.0000 SYS',
                transfer: 0
            })
        })
            .then(result => {
                sails.log.info(`${new Date()}, username: '${username}' is signup`)
                res.send(Message.successMessage('', data))
            })
            .catch(err => {
                res.send(Message.errMessage(err))
            });
    },

};

