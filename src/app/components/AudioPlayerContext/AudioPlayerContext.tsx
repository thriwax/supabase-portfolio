'use client'

import { createContext, useContext, useRef, useState, useEffect, type ReactNode } from 'react'
import { supabase } from '../../../../lib/supabaseClient'

interface AudioContextProps {
    isOpen: boolean
    toggleOpen: () => void
    trackUrl: string
    trackTitle: string
    coverUrl: string
    play: () => void
    pause: () => void
    isPlaying: boolean
    setTrack: (url: string, title: string, cover: string) => void
    nextTrack: () => void
    prevTrack: () => void
    setVolume: (value: number) => void
    seekTo: (time: number) => void
    currentTime: number
    duration: number
}

const AudioPlayerContext = createContext<AudioContextProps | null>(null)

export const useAudioPlayer = (): AudioContextProps => {
    const ctx = useContext(AudioPlayerContext)
    if (!ctx) throw new Error('AudioPlayerProvider missing')
    return ctx
}

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [trackUrl, setTrackUrl] = useState<string | null>(null)
    const [trackTitle, setTrackTitle] = useState('')
    const [coverUrl, setCoverUrl] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [tracks, setTracks] = useState<any[]>([])
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    const toggleOpen = () => setIsOpen(prev => !prev)

    const play = () => {
        audioRef.current?.play()
        setIsPlaying(true)
    }

    const pause = () => {
        audioRef.current?.pause()
        setIsPlaying(false)
    }

    const setTrack = (url: string, title: string, cover: string) => {
        setTrackUrl(url)
        setTrackTitle(title)
        setCoverUrl(cover)
        setIsOpen(true)
    }

    const nextTrack = () => {
        if (tracks.length > 0) {
            const nextIndex = (currentIndex + 1) % tracks.length
            const track = tracks[nextIndex]
            setTrack(track.audio_url, track.title, track.cover_url)
            setCurrentIndex(nextIndex)
        }
    }

    const prevTrack = () => {
        if (tracks.length > 0) {
            const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length
            const track = tracks[prevIndex]
            setTrack(track.audio_url, track.title, track.cover_url)
            setCurrentIndex(prevIndex)
        }
    }

    const setVolume = (value: number) => {
        if (audioRef.current) audioRef.current.volume = value
    }

    const seekTo = (time: number) => {
        if (audioRef.current) audioRef.current.currentTime = time
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const onEnd = () => {
            setIsPlaying(false)
            nextTrack()
        }

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
            setDuration(audio.duration)
        }

        audio.addEventListener('ended', onEnd)
        audio.addEventListener('timeupdate', onTimeUpdate)

        return () => {
            audio.removeEventListener('ended', onEnd)
            audio.removeEventListener('timeupdate', onTimeUpdate)
        }
    }, [tracks, currentIndex])

    useEffect(() => {
        const fetchInitialTrack = async () => {
            const { data } = await supabase.from('audio_tracks').select('*').order('created_at', { ascending: false })
            if (data && data.length > 0) {
                setTracks(data)
                const first = data[0]
                setTrack(first.audio_url, first.title, first.cover_url)
                setCurrentIndex(0)
            }
        }

        fetchInitialTrack()
    }, [])

    return (
        <AudioPlayerContext.Provider
            value={{
                isOpen,
                toggleOpen,
                trackUrl: trackUrl || '',
                trackTitle,
                coverUrl,
                play,
                pause,
                isPlaying,
                setTrack,
                nextTrack,
                prevTrack,
                setVolume,
                seekTo,
                currentTime,
                duration,
            }}
        >
            {children}
            {trackUrl && <audio ref={audioRef} src={trackUrl} hidden preload="metadata" />}
        </AudioPlayerContext.Provider>
    )
}
