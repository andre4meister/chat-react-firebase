import logger from 'pino';
import dayjs from "dayjs";

const log = logger({
    formatters: {},
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
})

export default log;