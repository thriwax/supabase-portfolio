import { useEffect, useState } from 'react'
import { supabase } from '../../../../lib/supabaseClient'

type MediaPickerProps = {
    onSelect: (url: string) => void
    onClose: () => void
}

const BUCKET = 'project-images'
const FILES_PER_PAGE = 12

export default function MediaPicker({ onSelect, onClose }: MediaPickerProps) {
    const [files, setFiles] = useState<{ name: string; url: string }[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredFiles, setFilteredFiles] = useState<{ name: string; url: string }[]>([])

    useEffect(() => {
        const fetchFiles = async () => {
            const { data, error } = await supabase.storage.from(BUCKET).list('', { limit: 100 })
            if (error) return
            const items = data
                .filter((f) => f.name.match(/\.(png|jpe?g|webp|gif|svg|bmp|avif)$/i))
                .map((f) => ({
                    name: f.name,
                    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${f.name}`,
                }))
            setFiles(items)
        }

        fetchFiles()
    }, [])

    // Фильтрация по поисковому запросу
    useEffect(() => {
        setFilteredFiles(
            files.filter((file) =>
                file.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    }, [searchTerm, files])

    // Разбиение файлов на страницы
    const currentFiles = filteredFiles.slice((currentPage - 1) * FILES_PER_PAGE, currentPage * FILES_PER_PAGE)

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage * FILES_PER_PAGE < filteredFiles.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center'>
            <div className='bg-white text-black max-w-4xl w-full p-6 rounded shadow-lg space-y-4 overflow-auto max-h-[80vh]'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg font-semibold'>Выберите изображение</h2>
                    <button onClick={onClose} className='text-gray-600 hover:text-black'>✕</button>
                </div>

                {/* Поиск */}
                <input
                    type="text"
                    placeholder="Поиск по файлам..."
                    className="w-full p-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Сетка файлов */}
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
                    {currentFiles.map((file) => (
                        <img
                            key={file.name}
                            src={file.url}
                            alt={file.name}
                            onClick={() => {
                                onSelect(file.url)
                                onClose()
                            }}
                            className='w-full h-32 object-contain bg-gray-100 rounded cursor-pointer hover:ring-2 ring-blue-600'
                        />
                    ))}
                </div>

                {/* Пагинация */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                    >
                        Предыдущая
                    </button>
                    <span>
                        Страница {currentPage} из {Math.ceil(filteredFiles.length / FILES_PER_PAGE)}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage * FILES_PER_PAGE >= filteredFiles.length}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
                    >
                        Следующая
                    </button>
                </div>
            </div>
        </div>
    )
}
