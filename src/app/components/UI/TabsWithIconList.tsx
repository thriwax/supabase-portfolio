'use client'

import { useState } from 'react'
import { CheckCircle, PlusCircle, Settings } from 'lucide-react'

type Tab = 'skills' | 'education' | 'experience'

const tabData: Record<Tab, { label: string; items: string[] }> = {
    skills: {
        label: 'Навыки',
        items: ['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'TypeScript'],
    },
    education: {
        label: 'Образование',
        items: ['Gzhel State Unversity - Bachelor of Design (2022)', 'Yandex Praktikum - "React Developer" (2023)', 'Moscow Coding School (GUIDEDAO) - "Solidity-Developer" (WIP)'],
    },
    experience: {
        label: 'Опыт',
        items: ['Just Web Agency (CA) - "Wordpress Developer" (February 2023 - September 2023)', 'WGG Agency (UAE) - "Wordpress Developer" (September 2023 - January 2024)', 'Rostov Electronics Factory - "Linux Embedded Developer" (January 2024 - March 2024)'],
    },
}

export default function TabsWithIconList() {
    const [active, setActive] = useState<Tab>('skills')

    const renderIcon = (tab: Tab) => {
        switch (tab) {
            case 'skills':
                return <CheckCircle className="text-green-500 w-5 h-5" />
            case 'education':
                return <PlusCircle className="text-blue-500 w-5 h-5" />
            case 'experience':
                return <Settings className="text-gray-600 w-5 h-5" />
        }
    }

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <div className="flex gap-4 border-b mb-6">
                {Object.entries(tabData).map(([key, tab]) => (
                    // biome-ignore lint/a11y/useButtonType: <explanation>
                    <button
                        key={key}
                        onClick={() => setActive(key as Tab)}
                        className={`py-2 px-3 text-sm font-medium transition-all border-b-2 ${active === key
                            ? 'border-black text-black'
                            : 'border-transparent text-gray-500 hover:text-black'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <section className="min-h-64 p-6 bg-white rounded-2xl shadow-sm">
                <ul className="space-y-3">
                    {tabData[active].items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-gray-800">
                            {renderIcon(active)}
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    )
}
