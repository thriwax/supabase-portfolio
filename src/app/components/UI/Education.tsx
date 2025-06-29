'use client'

export default function Education() {
    const educationData = [
        { id: '1', label: "Gzhel State Unversity - Bachelor of Design (2022)" },
        { id: '2', label: "Yandex Praktikum - 'React-Developer' (2023)" },
        { id: '3', label: "Moscow Coding School (GUIDEDAO) - 'Solidity-Developer' (WIP)" }
    ]

    return (
        <div className="flex flex-col gap-3">
            {educationData.map((tech) => (
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