import {postDiscord} from "../src/postDiscord";
import {getMetadata} from "../src/getMetadata";

export default async function handler(req, res) {
    if (req.body === undefined) {
        return res.send(`ready`)
    }

    const signature = req.body[0]?.signature
    const description = req.body[0]?.description
    const mint = req.body[0]?.events?.nft?.nfts[0].mint
    const metadata = await getMetadata(mint)

    let link = `https://solscan.io/tx/${signature}`

    if (mint) {
        switch (req.body[0]?.source) {
            case 'MAGIC_EDEN':
                link = `https://magiceden.io/item-details/${mint}`
                break;
            case 'OPENSEA':
                link = `https://opensea.io/assets/solana/${mint}`
                break;
            case 'CORAL_CUBE':
                link = `https://coralcube.io/detail/${mint}`
                break;
            default:
                break;
        }
    }

    console.log(signature, description)

    await postDiscord({
        signature,
        type: req.body[0]?.type,
        description: description,
        link,
        nft: {
            name: metadata?.onChainData?.data?.name,
            image: metadata?.offChainData?.image
        }
    })

    return res.send(`${signature}`);
}