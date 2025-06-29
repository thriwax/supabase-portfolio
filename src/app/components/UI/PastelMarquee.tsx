'use client'

import { motion, useAnimation, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect } from 'react'

const pastelColors = ['#d3e97a']

const technologies = [
    'HTML', 'CSS', 'JS', 'PHP', 'React',
    'Supabase', 'Tailwind', 'Payload', 'Strapi',
    'PostrgeeSQL', 'Figma', 'Wordpress',
]

export default function PastelMarquee() {
    const controls = useAnimation()
    const { scrollY } = useScroll()

    // 💡 Сглаживание скролла:
    const smoothScroll = useSpring(scrollY, {
        stiffness: 50,
        damping: 20,
        mass: 1,
    })

    const x = useTransform(smoothScroll, [0, 3000], ['0%', '-100%'])

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            i = (i + 1) % pastelColors.length
            controls.start({ backgroundColor: pastelColors[i] })
        }, 4000)
        return () => clearInterval(interval)
    }, [controls])

    const repeated = [...technologies, ...technologies]

    return (
        <section className="marquee">
            <motion.div
                animate={controls}
                initial={{ backgroundColor: pastelColors[0] }}
                className="w-full py-5 overflow-hidden"
            >
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        style={{ x }}
                        className="flex gap-16 text-5xl font-normal katana whitespace-nowrap"
                    >
                        {repeated.map((tech, index) => (
                            <span key={index} className="text-black">
                                {tech.toUpperCase()}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
