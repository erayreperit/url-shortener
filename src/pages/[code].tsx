import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

export default function Home() {
    const [link, setLink] = useState(null),
        [isLoading, setLoading] = useState(false),
        { query, push } = useRouter(),
        { code } = query

    useEffect(() => {
        setLoading(true)

        if (!code) return

        fetch(`/api/find?code=${code as string}`)
            .then(data => data.json())
            .then(jsonData => {
                setLink(jsonData.url)
                setLoading(false)
            })
    }, [code])

    if (isLoading) return <p>Loading...</p>
    if (link) return push(link)

    return (
        <div>
            <h1>Link not found</h1>
        </div>
    )
}
