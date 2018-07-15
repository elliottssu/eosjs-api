const Eos = require('eosjs')

const config = {
    chainId: null, // 32 byte (64 char) hex string
    keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'], // WIF string or array of keys..
    httpEndpoint: 'http://127.0.0.1:8888',
    expireInSeconds: 60,
    broadcast: true,
    verbose: false, // API activity
    sign: true
}

const eos = Eos(config)

module.exports = eos;

