const axios = require('axios')
require('dotenv').config()

exports.getMetadata = async (mint) => {
    if (process.env.HELIUS_API_KEY && mint !== undefined) {
        try {
            const { data } = await axios.post(`https://api.helius.xyz/v0/tokens/metadata?api-key=${process.env.HELIUS_API_KEY}`, { mintAccounts: [mint]})

            return data[0]
        } catch (e) {
            console.log(e)
            return null
        }
    }

    return null
}