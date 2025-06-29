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
        const audio = audioRef.current
        if (audio) {
            audio.play().catch(console.warn)
            setIsPlaying(true)
        }
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

        // Ждём обновление src, затем воспроизводим
        setTimeout(() => {
            const audio = audioRef.current
            if (audio) {
                audio.load()
                audio.play().then(() => {
                    setIsPlaying(true)
                }).catch(console.warn)
            }
        }, 0)
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
        if (audioRef.current) {
            audioRef.current.volume = value
        }
    }

    const seekTo = (time: number) => {
        const audio = audioRef.current
        if (audio) {
            audio.currentTime = time
            if (audio.paused && audio.readyState >= 2) {
                audio.play().catch(console.warn)
                setIsPlaying(true)
            }
        }
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const onLoadedMetadata = () => {
            setDuration(audio.duration || 0)
        }

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime || 0)
        }

        const onEnd = () => {
            setIsPlaying(false)
            nextTrack()
        }

        audio.addEventListener('loadedmetadata', onLoadedMetadata)
        audio.addEventListener('timeupdate', onTimeUpdate)
        audio.addEventListener('ended', onEnd)

        return () => {
            audio.removeEventListener('loadedmetadata', onLoadedMetadata)
            audio.removeEventListener('timeupdate', onTimeUpdate)
            audio.removeEventListener('ended', onEnd)
        }
    }, [trackUrl])

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
