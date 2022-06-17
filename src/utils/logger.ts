import pino from 'pino'
import pretty from 'pino-pretty'
import dayjs from 'dayjs';

const logger = pino(pretty({
    colorize: true,
    customPrettifiers: {
        time: () => `🕰 "${dayjs().format()}"`,
    }
}));

export default logger;