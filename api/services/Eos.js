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


// Just test account

/**
 * default PW5K3e2Hpvd88kQn1b4eZEFNtNsn4frvB3UacwoA7CBMpHGy98GCs
 */

/**
 * w1 PW5HwypnscGFjio9GU4tVcamKzeFvTJshNA1SvPQ8g5VzLnYhRL5M
 * a1 5JoMZ371uCYCQKtaNjW941XqakAV1VsK9Zy9iFAWYVhjBQvtjqF EOS5FACe8WeFYraVvx7CUb496fnQw1bFcWP6SDCoDXwfguQj5NaS3
 */
/**
 * 
 * a2 5KaUTMzeDbbPbVuHYsZ5Lt9uH5quEq6HnxwWgRZcMXxow1t33xm EOS7aM17MLeLp2tkkNc5LaiQk4naAKFMJCJDXURgTtEK6frkFK1nW
 */
/**
 * 
 * a3 5Kdc3UEee1cDo76sLnnwp4NHpvYvDp13hKddsokL1DK5EVU3Zaz EOS52Z8RUGaaLp4xUv3FjfRrUZFFxVkvBX8nqEAkYvQVDmZgtu587
 */
/**
 * 
 * a4 5KDhxb2pnRveh8hUCYjjcQH86jVyj4s9FJRXYDxqS3PP6tDZNaz EOS6MHEi4AmjSfebiAR4s1f1wgEJHSCQx1sUNqpmqhGdVmAjQjCf6
 */
