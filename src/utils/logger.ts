import { createLogger, format, transports } from 'winston';
import { ConsoleTransportInstance } from 'winston/lib/winston/transports';
import config from '../config/config';
import { EApplicationEnvironmnet } from '../constant/application';
import util from 'util';
import sourceMapSupport from 'source-map-support';
import { green, magenta, red, yellow } from 'colorette';

sourceMapSupport.install();

const colorizeLevel = (level: string) => {
    switch (level) {
        case 'ERROR':
            return red(level);
        case 'WARN':
            return yellow(level);
        case 'INFO':
            return green(level);
        default:
            return level;
    }
};

const consoleLogFormat = format.printf((info) => {
    const { timestamp, level, message, meta = {} } = info;
    const customTimestamp = timestamp;
    const customLevel = colorizeLevel(level.toUpperCase());
    const customMessage = message as string;
    const customMeta = util.inspect(meta, {
        depth: null,
        colors: true,
        showHidden: true
    });

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n ${magenta('META')}${customMeta}\n`;
    return customLog;
});

const consoleTransports = (): Array<ConsoleTransportInstance> => {
    if (config.NODE_ENV === EApplicationEnvironmnet.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ];
    }
    return [];
};

export default createLogger({
    defaultMeta: { meta: {} },
    transports: [...consoleTransports()]
});
