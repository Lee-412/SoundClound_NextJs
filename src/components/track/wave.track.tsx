'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useSearchParams } from 'next/navigation';
import { useWavesurfer } from "@/utils/customHook";
import { WaveSurferOptions } from 'wavesurfer.js';
import './wave.scss';
import { Container, Tooltip } from "@mui/material";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
const WaveTrack = () => {
    const searchParams = useSearchParams()
    const fileName = searchParams.get('audio');
    const containerRef = useRef<HTMLDivElement>(null);
    const hoverRef = useRef<HTMLDivElement>(null);

    const [time, setTime] = useState<string>("0:00");
    const [duration, setDuration] = useState<string>("0:00");


    const optionsMemo = useMemo((): Omit<WaveSurferOptions, 'container'> => {
        let gradient, progressGradient;
        if (typeof window !== "undefined") {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            // Define the waveform gradient
            gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
            gradient.addColorStop(0, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
            gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
            gradient.addColorStop(1, '#B1B1B1') // Bottom color

            // Define the progress gradient
            progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35)
            progressGradient.addColorStop(0, '#EE772F') // Top color
            progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
            progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
            progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
            progressGradient.addColorStop(1, '#F6B094') // Bottom color
        }

        return {
            waveColor: gradient,
            progressColor: progressGradient,
            height: 100,
            barWidth: 3,
            url: `/api?audio=${fileName}`,
        }
    }, []);
    const wavesurfer = useWavesurfer(containerRef, optionsMemo);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // Initialize wavesurfer when the container mounts
    // or any of the props change
    useEffect(() => {
        if (!wavesurfer) return
        setIsPlaying(false)

        const hover = hoverRef.current!;
        const waveform = containerRef.current!;
        waveform.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`))

        const subscriptions = [
            wavesurfer.on('play', () => setIsPlaying(true)),
            wavesurfer.on('pause', () => setIsPlaying(false)),
            wavesurfer.on('decode', (duration) => {
                setDuration(formatTime(duration));
            }),
            wavesurfer.on('timeupdate', (currentTime) => {
                setTime(formatTime(currentTime));
            }),
        ]
        wavesurfer.on('click', () => {
            wavesurfer.play()
        })

        return () => {
            subscriptions.forEach((unsub) => unsub())
        }
    }, [wavesurfer])

    // On play button click
    const onPlayClick = useCallback(() => {
        if (wavesurfer) {
            wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
        }
    }, [wavesurfer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }
    const arrComments = [
        {
            id: 1,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 10,
            user: "username 1",
            content: "just a comment1"
        },
        {
            id: 2,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 30,
            user: "username 2",
            content: "just a comment3"
        },
        {
            id: 3,
            avatar: "http://localhost:8000/images/chill1.png",
            moment: 50,
            user: "username 3",
            content: "just a comment3"
        },
    ]
    const calLeft = (moment: number, length: number) => {
        const percent = moment / length * 100;
        return (`${percent}% `)
    }

    return (
        <Container>
            <div className="containerDiv">
                <div className="trackDiv">
                    <div className="play-title-div">
                        <div className="buttonPlay" onClick={() => onPlayClick()}
                        >
                            {isPlaying ? <PauseIcon /> : <PlayArrowRoundedIcon />}
                        </div>

                        <div className="titleSong">
                            <p>Lee Song</p>
                            <p>Long time no see</p>
                        </div>
                    </div>
                    <div className="wavetrack-div"
                        style={{ marginTop: 100 }}>
                        <div ref={containerRef} className="wave-form-container">
                            <div className="time" >{time}</div>
                            <div className="duration" >{duration}</div>
                            <div ref={hoverRef} className="hover-wave"></div>
                            <div className="overlay">
                            </div>

                            <div className="imageCommentDiv">
                                {
                                    arrComments.map(item => {
                                        return (
                                            <Tooltip title={item.content} arrow>
                                                <img
                                                    onPointerMove={(e) => {
                                                        const hover = hoverRef.current!;
                                                        hover.style.width = calLeft(item.moment + 3, 199)
                                                    }}
                                                    key={item.id}
                                                    className="imageComment"
                                                    style={{
                                                        left: calLeft(item.moment, 199)
                                                    }}
                                                    src="http://localhost:8000/images/chill1.png" alt=""
                                                />
                                            </Tooltip>

                                        )
                                    })
                                }
                            </div>

                        </div>

                    </div>
                </div>
                <div className="imageDiv">
                    <div className="image">
                        <img src="" alt="" />
                    </div>
                </div>
            </div>
        </Container >

    )
}

export default WaveTrack;