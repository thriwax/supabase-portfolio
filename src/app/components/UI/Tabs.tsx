"use client";

import { useState } from "react";
import TechStack from "./TechStack"; // пример — можешь вставить свои
import Work from "./Work";
import Education from "./Education";

export default function Tabs() {
    const tabs = [
        { name: "Skills", content: <TechStack /> },
        { name: "Education", content: <Education /> },
        { name: "Experience", content: <Work /> },
    ];

    const [active, setActive] = useState(tabs[0].name);

    return (
        <div className="w-full">
            <div className="flex space-x-2 border-b border-gray-200">
                {tabs.map((tab) => (
                    // biome-ignore lint/a11y/useButtonType: <explanation>
                    <button
                        key={tab.name}
                        onClick={() => setActive(tab.name)}
                        className={`font-bebas px-4 py-2 text-xl font-medium transition-colors ${active === tab.name
                            ? "border-b-2 border-[#D3E97A] text-[#D3E97A]"
                            : "text-gray-500 hover:text-[#D3E97A]"
                            }`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>

            <div className="mt-4">
                {tabs.map(
                    (tab) =>
                        tab.name === active && (
                            <div key={tab.name} className="animate-fade h-[300px]">
                                {tab.content}
                            </div>
                        )
                )}
            </div>
        </div>
    );
}
