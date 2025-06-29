'use client'

import { label } from "three/tsl"

export default function TechStack() {
    const techData = [
        { id: '1', label: 'HTML', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/html-logo.svg' },
        { id: '2', label: 'CSS', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/css-icon.svg' },
        { id: '3', label: 'JS', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/js-logo.svg' },
        { id: '4', label: 'Tailwind', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/1746554868606-TailwindCSS.png' },
        { id: '5', label: 'Supabase', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/1746554683833-logo (3).png' },
        { id: '6', label: 'Payload', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/payload-logo.png' },
        { id: '7', label: 'React', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/react-logo.svg' },
        { id: '9', label: 'SQL', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/sql-logo.svg' },
        { id: '10', label: 'Figma', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/figma-logo.svg' },
        { id: '11', label: 'Three JS', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/threejs-logo.png' },
        { id: '13', label: 'WordPress', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/wp-logo.png' },
        { id: '14', label: 'Next JS', icon: 'https://zkfyodmlqstgnqvkemxo.supabase.co/storage/v1/object/public/project-images/next-logo.svg' }
    ]

    return (
        <div className="flex flex-wrap gap-3">
            {techData.map((tech) => (
                <div
                    key={tech.id}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-sm bg-[#c3c3c3] hover:shadow-md transition-all"
                >
                    <div className="rounded-full">
                        <img src={tech.icon} alt={tech.label} className="w-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-800">{tech.label}</span>
                </div>
            ))}
        </div>
    )
}