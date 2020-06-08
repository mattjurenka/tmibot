import { Block } from "@slack/web-api";
import { get_markdown_section, get_image_section } from "./templates";

//Returns blocks for slack message when ticker is requested
function get_chart_blocks(ticker: string, tf: string): Block[] {
    return [
        get_image_section(
            `Chart for ${ticker}`,
            `https://finviz.com/chart.ashx?t=${ticker.toUpperCase()}&ty=c&ta=0&p=${tf}&s=l`
        )
    ]
}

const chart_help_str = "Incorrect arguments for /chart, correct usage is */chart <TICKER> [DURATION]*\n\nTicker is required, it must be a stock symbol like QQQ\nDuration is optional, if provided it must be either *daily*, *weekly* or *monthly*. Defaults to *daily* if not present. This controls the duration of candles in the chart.\n\nIf you need additional help send a message to *Matthew Jurenka*"

function get_chart_help_blocks(): Block[] {
    return [
        get_markdown_section(chart_help_str)
    ]
}

export {
    get_chart_blocks,
    get_chart_help_blocks
}