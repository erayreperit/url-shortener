// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import link from '@/database'

function generate() {
    const uppercase = Array.from(Array(26))
        .map((e, i) => i + 65)
        .map(i => String.fromCharCode (i)),
          lowercase = uppercase.map (letter => letter.toLowerCase ()),
          numeral = Array.from (Array(10).keys ())
            .map (num => num.toString ()),
          chars = uppercase.concat (lowercase, numeral)

    let generatedPassword = ''

    for (let i = 0; i < 8; i++) {
        generatedPassword += chars [Math.floor (Math.random () * chars.length)]
    }

    return generatedPassword
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const url = req.query.url ?? 'https://youtu.be/dQw4w9WgXcQ',
          code = generate (),
          newLink = new link ({url: url, code: code})

    newLink.save ()
        .catch (console.log)

    // return res.status (200).json ({ url, code })

    return res
        .status (200)
        .json ({ code })
}