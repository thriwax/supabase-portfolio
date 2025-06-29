'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Music2, SkipBack, SkipForward, X } from 'lucide-react'
import { useAudioPlayer } from '../AudioPlayerContext/AudioPlayerContext'

export const FloatingAudioPlayer = () => {
    const {
        isOpen,
        toggleOpen,
        trackTitle,
        coverUrl,
        isPlaying,
        play,
        pause,
        nextTrack,
        prevTrack,
        setVolume,
        seekTo,
        currentTime,
        duration,
    } = useAudioPlayer()

    const [isMini, setIsMini] = useState(false)
    const [idleTime, setIdleTime] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return

        const interval = setInterval(() => setIdleTime(t => t + 1), 1000)

        const reset = () => setIdleTime(0)
        window.addEventListener('mousemove', reset)
        window.addEventListener('click', reset)
        window.addEventListener('keydown', reset)

        return () => {
            clearInterval(interval)
            window.removeEventListener('mousemove', reset)
            window.removeEventListener('click', reset)
            window.removeEventListener('keydown', reset)
        }
    }, [isOpen])

    useEffect(() => {
        if (idleTime >= 20) setIsMini(true)
    }, [idleTime])

    useEffect(() => {
        const scroll = scrollRef.current
        if (!scroll) return
        const scrollText = () => {
            scroll.scrollLeft += 1
            if (scroll.scrollLeft >= scroll.scrollWidth - scroll.clientWidth) {
                scroll.scrollLeft = 0
            }
        }
        const interval = setInterval(scrollText, 50)
        return () => clearInterval(interval)
    }, [trackTitle])

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`
    }

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 70 }}
            className="fixed bottom-6 right-6 z-50"
        >
            {!isOpen ? (
                <button
                    onClick={toggleOpen}
                    className="w-14 h-14 rounded-full bg-[#d3e97a] text-black shadow-lg flex items-center justify-center animate-bounce"
                >
                    <Music2 size={24} />
                </button>
            ) : isMini ? (
                <div
                    onClick={() => setIsMini(false)}
                    className="w-52 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg p-2 flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition"
                >
                    <img src={coverUrl} alt="cover" className="w-10 h-10 rounded-md object-cover" />
                    <p className="truncate text-sm font-semibold text-white">{trackTitle}</p>
                </div>
            ) : (
                <div className="w-[22rem] max-md:w-fit max-md:ml-6 rounded-xl p-4 flex flex-col gap-3 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg ring-1 ring-white/10">
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4 items-center">
                            <img src={coverUrl} alt="cover" className="w-16 h-16 rounded-md object-cover" />
                            <div className="flex-1 overflow-hidden max-w-[12rem]" ref={scrollRef}>
                                <p className="text-sm font-bold text-white whitespace-nowrap">{trackTitle}</p>
                            </div>
                        </div>
                        <button onClick={() => setIsMini(true)} className="text-gray-300 hover:text-white">
                            <X size={16} />
                        </button>
                    </div>

                    <input
                        type="range"
                        min={0}
                        max={duration || 0}
                        value={currentTime}
                        onChange={(e) => seekTo(Number(e.target.value))}
                        className="w-full h-1 bg-gray-300/30 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-300">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    <div className="flex justify-between items-center gap-3">
                        <button onClick={prevTrack} className="text-white hover:text-gray-300">
                            <SkipBack size={20} />
                        </button>
                        <button
                            onClick={isPlaying ? pause : play}
                            className="bg-white text-black px-4 py-1 rounded-full hover:bg-gray-100"
                        >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        <button onClick={nextTrack} className="text-white hover:text-gray-300">
                            <SkipForward size={20} />
                        </button>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="h-1 w-24 bg-gray-300/30 rounded-lg cursor-pointer"
                        />
                    </div>
                </div>
            )}
        </motion.div>
    )
}
