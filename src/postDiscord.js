const axios = require('axios')
require('dotenv').config()

exports.postDiscord = async (params) => {
    if (process.env.DISCORD_WEBHOOK_URL === undefined) {
        return null
    }

    const {type, description, link, nft} = params

    const embed = {
        'title': `${type} ${nft?.name ?? ''}`
    }

    if (description) {
        embed.description = description
    }

    if (nft?.image) {
        embed.thumbnail = {
            "url": nft.image
        }
    }

    if (link) {
        embed.url = link
    }

    return axios.post(process.env.DISCORD_WEBHOOK_URL, {
        "username": process.env.DISCORD_USERNAME ?? "Alert Bot by Oppty Labs",
        "avatar_url": process.env.DISCORD_AVATAR_URL ?? `https://famousfoxes.com/hd/1617.png`,
        "embeds": [embed]
    })
}