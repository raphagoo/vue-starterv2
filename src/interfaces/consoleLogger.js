/**
 * light log system, wrapping console.log methods:
 *  - configurable log level (trace|debug|info|warn|error)
 *  - 5 levels
 *
 * typical use:
 * webpack.config.js:
 *     resolve: {
 *         alias: {
 *             logger$: path.resolve(__dirname, 'tools/consoleLogger.js'),
 *         }
 *     }
 *
 * anywhere.js:
 *     import $log from 'logger'
 *     // ...
 *     $log.info('my message')
 *
 * or, as Vue property:
 * // main.js
 * import logger from 'logger'
 * Vue.prototype.$log = logger
 * // ...
 * new Vue({
 *     created () {
 *         // in any method of instanciated Vue:
 *         this.$log.info('my message')
 *     }
 * })
 */
import $config from 'config'

const logLevelConf = $config.logLevel;

const LOG_LEVELS = ['trace', 'debug', 'info', 'warn', 'error']

const logLevel = (LOG_LEVELS.includes(logLevelConf)) ? logLevelConf : 'error';

function _log(level, ...msg) {
    /* eslint-disable no-console */
    if (LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(logLevel)) {
        switch (level) {
        case 'error':
            console.error(...msg);
            break;
        case 'warn':
            console.warn(...msg);
            break;
        case 'info':
            console.info(...msg);
            break;
        default:
            console.log(...msg);
            break;
        }
    }
    /* eslint-enable no-console */
}

export default {
    trace: (...msg) => _log('trace', ...msg),
    debug: (...msg) => _log('debug', ...msg),
    info: (...msg) => _log('info', ...msg),
    warn: (...msg) => _log('warn', ...msg),
    error: (...msg) => _log('error', ...msg),
}
