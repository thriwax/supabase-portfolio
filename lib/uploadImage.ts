import { supabase } from './supabaseClient'

function sanitizeFileName(fileName: string): string {
  return fileName
    .normalize('NFKD')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()
}

export async function uploadImage(file: File): Promise<{ url: string; name: string } | null> {
  const cleanName = sanitizeFileName(file.name)
  const fileName = `${Date.now()}-${cleanName}`
  const safeFile = new File([file], fileName, { type: file.type })

  const { error } = await supabase.storage
    .from('project-images')
    .upload(fileName, safeFile, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Ошибка при загрузке изображения:', error.message)
    return null
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-images/${fileName}`
  return { url, name: fileName }
}
