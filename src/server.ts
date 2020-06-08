require('dotenv').config();

import express = require("express")
import body_parser = require("body-parser")
import { WebClient } from '@slack/web-api'
import yargs = require("yargs")

import { get } from "lodash"

import { get_chart_blocks, get_chart_help_blocks } from "./blocks/messages"
import VALIDATORS from "./validators";

const app = express()
app.use(body_parser.urlencoded({extended: true}))

const web = new WebClient(process.env.SLACK_BOT_AUTH_TOKEN)

const chart_cmd = yargs.command("chart", false)

app.post("/slack/chart", (req, res) => {
    const text:string = req.body.text
    
    chart_cmd.parse(text, (err: any, argv: { _: any; }, output: any) => {
        if (err) {
            res.json({
                "response_type": "in_channel",
                blocks: get_chart_help_blocks()
            })
            return
        }
        const ticker_param = get(argv._, 0, "")
        const candle_param = get(argv._, 1, "")

        const validated = [
            VALIDATORS.TICKER(ticker_param),
            VALIDATORS.CANDLE_DURATION(candle_param)
        ]

        for (const validated_item of validated) {
            if (validated_item.error) {
                res.json({
                    "response_type": "in_channel",
                    blocks: get_chart_help_blocks()
                })
                return
            }
        }
        
        const [ticker, tf] = validated.map(val => val["param"])

        if (err) {
        } else { 
            res.json({
                "response_type": "in_channel",
                blocks: get_chart_blocks(ticker, tf)
            });
        }
    })
})

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log("Listening on 80")
})