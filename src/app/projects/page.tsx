import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects – Fedor Tatarintsev',
    description: 'A collection of projects developed using modern technologies.',
    openGraph: {
        title: 'Projects – Fedor Tatarintsev',
        description: 'A collection of projects developed using modern technologies.',
        url: 'https://fedor.tech/projects', // Замените на ваш домен
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects – Fedor Tatarintsev',
        description: 'A collection of projects developed using modern technologies.',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: '/projects',
    },
}

export default function ProjectsPage() {
    return (
        <main className="container-second pb-[100px]">
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#D3E97A] to-[#7e8b4a]">Projects</h1>
            <ProjectsGrid limit={12} />
        </main>
    )
}