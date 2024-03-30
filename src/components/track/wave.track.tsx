'use client'
import { GET } from '@/app/api/route'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {

    const searchParams = useSearchParams()
    const audioName = searchParams.get('audio')
    const containerRef = useRef<HTMLInputElement>(null)

    useEffect(() => {

        console.log("Check ContainerRef: ", containerRef.current)
        if (containerRef.current) {
            const wavesurfer = WaveSurfer.create({
                container: containerRef.current,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',

                url: `/api?audio=${audioName}`
            })
            wavesurfer.on('click', () => {
                wavesurfer.play()
            })
        }
    }, [])
    return (
        <div ref={containerRef}></div>
    )
}
export default WaveTrack;