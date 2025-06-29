import Image from 'next/image'
import Link from 'next/link'

type Project = {
    slug: string;
    title: string;
    description: string;
    url: string;
    image_url: string;
    tags: string[];
}

export default function ProjectCard({ project }: { project: Project }) {

    const tagsArray = project.tags

    return (
        <Link
            href={`/projects/${project.slug}`}
            className='block bg-[#3f3f3f] rounded-lg shadow-md hover:shadow-lg transition duration-500 hover:scale-105'
        >
            <div className="group w-full h-48 rounded-t-lg overflow-hidden relative">
                <Image
                    src={project.image_url}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full transition-all duration-500 ease-in-out hover:scale-110"
                />
            </div>

            <div className='p-4'>
                <h3 className='text-2xl font-semibold'>{project.title}</h3>
                {tagsArray.map((tag) => (
                    <span key={tag} className='text-xs p-1 bg-gray-200 text-gray-600 rounded-sm mr-2 max-sm:text-[8px] hover:bg-[#d3e97a]'>
                        {tag}
                    </span>
                ))}
            </div>
        </Link>
    )
}
