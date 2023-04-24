// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import link from '@/database'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { code } = req.query,
        found = await link.findOne({ code })

    if (!found) return res.status(200).json({ url: null })

    return res.status(200).json({ url: found.get ('url') })

    // TO DO: fix the application error due to the asynchronicity here
}