const log4js = require('log4js');

log4js.configure({
    appenders: {
        out: { type: 'stdout' },
        security: {
            type: 'file',
            filename: 'logs/security.log'
        },
        accounts: {
            type: 'file',
            filename: 'logs/accounts.log'
        },
        error: {
            type: 'file',
            filename: 'logs/error.log'
        }
    },
    categories: {
        default: {
            appenders: ['out'],
            level: 'trace'
        },
        security: {
            appenders: ['security'],
            level: 'trace'
        },
        accounts: {
            appenders: ['accounts'],
            level: 'trace'
        },
        error: {
            appenders: ['error'],
            level: 'error'
        }
    }
});

module.exports.securityLog = log4js.getLogger('security');
module.exports.accountsLog = log4js.getLogger('accounts');
module.exports.errorLog = log4js.getLogger('error');