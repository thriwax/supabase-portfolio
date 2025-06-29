// src/lib/uploadImage.ts
import { supabase } from './supabaseClient'

export async function uploadImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from('project-images') // название твоего bucket
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    console.error('Ошибка при загрузке изображения:', error.message)
    return null
  }

  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/project-images/${fileName}`
}
