import { SectionBlock, ImageBlock } from "@slack/web-api";

//Creates Markdown Block from a markdown string
function get_markdown_section(text: string): SectionBlock {
    return {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": text
        }
    }
}

//Creates Image Block from a title and image url
function get_image_section(title: string, url: string): ImageBlock {
    return {
        "type": "image",
        "title": {
            "type": "plain_text",
            "text": title,
            "emoji": true
        },
        "image_url": url,
        "alt_text": title
    }
}

export {
    get_markdown_section,
    get_image_section
}