'use client'

export default function Work() {
    const workData = [
        { id: '1', label: "Just Web Agency (CA) - 'Wordpress Developer' (February 2023 - September 2023)" },
        { id: '2', label: "WGG Agency (UAE) - 'Wordpress Developer' (September 2023 - January 2024)" },
        { id: '3', label: "Rostov Electronics Factory - 'Linux Embedded Developer' (January 2024 - March 2024)" },
        { id: '4', label: "NDA - 'Wordpress Developer' (March 2024 - May 2024)" },
        { id: '5', label: "Digital Strategy - 'Web Developer' (June 2024 - Still Working)" }
    ]

    return (
        <div className="flex flex-col gap-3">
            {workData.map((tech) => (
                <div
                    key={tech.id}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-sm bg-[#c3c3c3] hover:shadow-md transition-all"
                >
                    <span className="text-sm font-medium text-gray-800">{tech.label}</span>
                </div>
            ))}
        </div>
    )
}