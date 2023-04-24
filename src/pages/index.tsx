import { useState, useEffect } from 'react'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] })

export default function Home() {
    const [code, setCode] = useState(''),
          [location, setLocation] = useState ('')

    const copy = () => {
        const copyButton = document.querySelector('button')

        navigator.clipboard.writeText(document.querySelector('textarea')?.value as string)

        copyButton?.classList.toggle('bg-blue-600')
        copyButton?.classList.toggle('bg-green-600')

        if (copyButton) copyButton.innerHTML = 'Copied!'

        setTimeout(() => {
            copyButton?.classList.toggle('bg-green-600')
            copyButton?.classList.toggle('bg-blue-600')

            if (copyButton) copyButton.innerHTML = 'Copy'
        }, 3000)
    }

    useEffect(() => {
        // setting the window location

        setLocation (window.location.href)

        // on form submission

        const form = document.querySelector('form')

        if (form) form.onsubmit = (event: Event) => {
            event.preventDefault()

            fetch(`/api/shorten?url=${document.querySelector('input')?.value}`)
                .then(res => res.json())
                .then(data => {
                    setCode(data.code)
                })
        }

        if (code) {
            document.getElementById('send')?.classList?.toggle('hidden')

            document.getElementById('code')?.classList?.toggle('hidden')
            document.getElementById('code')?.classList?.toggle('flex')
        }
    }, [code])

    return (
        <main className='flex flex-col justify-center items-center px-4'>
            <div className='w-full' id='send'>
                <h1 className={inter.className + ' text-center text-3xl font-bold xl:text-4xl'}>Enter URL to Shorten</h1>
                <form action='/api/shorten' method='GET' className='flex flex-col justify-center items-center w-full'>
                    <input required name='url' type='url' className='mt-8 mb-4 py-1 px-6 bg-zinc-800 bg-opacity-80 w-full text-xl leading-loose shadow-inner rounded-full xl:w-1/2 xl:text-2xl' id='url' />
                    <input type='submit' value='Go' className='px-12 py-3 bg-blue-600 text-xl shadow-inner rounded-full cursor-pointer' />
                </form>
            </div>
            <div className='hidden flex-col justify-center items-center w-full' id='code'>
                <h1 className={inter.className + ' text-center text-3xl font-bold xl:text-4xl'}>Your Shortened URL:</h1>
                <textarea value={location + code} rows={1} className='mt-8 mb-4 py-1 px-6 bg-zinc-800 bg-opacity-80 w-full text-xl leading-loose shadow-inner rounded-full resize-none xl:w-1/2 xl:text-2xl' id='shortened' />
                <button className='px-12 py-3 bg-blue-600 text-xl shadow-inner rounded-full cursor-pointer transition-all duration-300' onClick={copy}>Copy</button>
            </div>
        </main>
    )
}
