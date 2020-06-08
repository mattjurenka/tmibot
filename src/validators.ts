import { get } from "lodash"

const durations = {
    daily: "d",
    monthly: "m",
    weekly: "w"
}

const VALIDATORS = {
    CANDLE_DURATION: (raw: string) => {
        const param = get(durations, raw, "")
        return {
            param,
            error: param === ""
        }
    },
    TICKER: (raw: string) => {
        const upper = raw.toUpperCase()
        return {
            param: upper,
            error: upper === ""
        }
    }
}

export default VALIDATORS