<template>
  <img :src="imageSrc" :alt="alt" class="w-full h-auto  rounded-lg" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: {
    type: Object,
    default: null
  },
  typeId: {
    type: String,
    default: null
  },
  typeTitle: {
    type: String,
    default: null
  },
  types: {
    type: Array,
    default: () => []
  },
  typesImmobilier: {
    type: [String, Array],
    default: null
  },
  defaultImage: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'Immobilier au Maroc'
  }
})

// Helper to get type title from types array if typeId is provided
const getTypeTitle = computed(() => {
  // If typeTitle prop is explicitly provided, use it
  if (props.typeTitle) {
    return props.typeTitle
  }

  // If we have types array and typeId, try to find the type and get its title
  if (props.types && props.types.length > 0 && props.typeId) {
    // Try to find type by ID (handle both string and numeric IDs, and hash IDs)
    const foundType = props.types.find(t => {
      if (!t) return false
      // Match by id (handle hash IDs)
      if (t.id && String(t.id) === String(props.typeId)) {
        return true
      }
      // Also try matching by type_title_original or title if typeId is actually a title
      if (t.type_title_original && t.type_title_original === props.typeId) {
        return true
      }
      if (t.title && t.title === props.typeId) {
        return true
      }
      return false
    })

    if (foundType) {
      // Priority: type_title_original > title
      const title = foundType.type_title_original || foundType.title
      if (title) {
        return title
      }
    }
  }

  // Fallback to typeId (which might already be the title)
  return props.typeId
})

// Pre-load all type images using Vite's import.meta.glob for build-time optimization
const typeImagesGlob = import.meta.glob('../assets/images/types_pages/*.webp', { eager: true, import: 'default' })
// Pre-load all main page images
const mainPageImagesGlob = import.meta.glob('../assets/images/main_pages/*.webp', { eager: true, import: 'default' })

// Create lookup maps by filename for easier matching (case-insensitive)
const typeImagesMap = new Map()
const typeImagesMapLower = new Map() // For case-insensitive lookup
Object.keys(typeImagesGlob).forEach(key => {
  const filename = key.split('/').pop()
  typeImagesMap.set(filename, typeImagesGlob[key])
  // Also store lowercase version for case-insensitive matching
  typeImagesMapLower.set(filename.toLowerCase(), typeImagesGlob[key])
})

const mainPageImagesMap = new Map()
const mainPageImagesMapLower = new Map() // For case-insensitive lookup
Object.keys(mainPageImagesGlob).forEach(key => {
  const filename = key.split('/').pop()
  mainPageImagesMap.set(filename, mainPageImagesGlob[key])
  mainPageImagesMapLower.set(filename.toLowerCase(), mainPageImagesGlob[key])
})

// Helper function to get dynamically imported image
const getDynamicImage = (imagePath) => {
  // Safety check
  if (!imagePath || typeof imagePath !== 'string') {
    console.warn('PageImage: Invalid imagePath provided', imagePath)
    return '/assets/images/main_pages/Annonces-immobilier-a-vendre-au-Maroc.webp'
  }

  // Extract filename from path (handle both 'folder/filename.webp' and 'filename.webp')
  const filename = imagePath.includes('/') ? imagePath.split('/').pop() : imagePath

  if (!filename) {
    console.warn('PageImage: Could not extract filename from path', imagePath)
    return `/assets/images/${imagePath || 'main_pages/Annonces-immobilier-a-vendre-au-Maroc.webp'}`
  }

  // Determine which map to check based on path prefix
  const isTypeImage = imagePath.startsWith('types_pages/')
  const isMainPageImage = imagePath.startsWith('main_pages/')

  // Try main page images first if path indicates it
  if (isMainPageImage && mainPageImagesMap.has(filename)) {
    const imageUrl = mainPageImagesMap.get(filename)
    if (imageUrl) return imageUrl
  }

  // Try type images if path indicates it (case-sensitive first, then case-insensitive)
  if (isTypeImage) {
    if (typeImagesMap.has(filename)) {
      const imageUrl = typeImagesMap.get(filename)
      if (imageUrl) return imageUrl
    }
    // Try case-insensitive match
    const filenameLower = filename.toLowerCase()
    if (typeImagesMapLower.has(filenameLower)) {
      const imageUrl = typeImagesMapLower.get(filenameLower)
      if (imageUrl) return imageUrl
    }
  }

  // Fallback: try to find in either map by filename (case-sensitive first, then case-insensitive)
  if (mainPageImagesMap.has(filename)) {
    const imageUrl = mainPageImagesMap.get(filename)
    if (imageUrl) return imageUrl
  }
  const filenameLower = filename.toLowerCase()
  if (mainPageImagesMapLower.has(filenameLower)) {
    const imageUrl = mainPageImagesMapLower.get(filenameLower)
    if (imageUrl) return imageUrl
  }

  if (typeImagesMap.has(filename)) {
    const imageUrl = typeImagesMap.get(filename)
    if (imageUrl) return imageUrl
  }
  if (typeImagesMapLower.has(filenameLower)) {
    const imageUrl = typeImagesMapLower.get(filenameLower)
    if (imageUrl) return imageUrl
  }

  // Final fallback: use public path (for images that might be in public folder)
  // This handles cases where images might be served from public/assets/images
  return `/assets/images/${imagePath}`
}

const imageSrc = computed(() => {
  let result = ''

  // If API provides an image path, use it (as full URL or as public asset)
  if (props.typeId) {
    result = getDynamicImage(`types_pages/${props.typeId}.webp`)
  }

  // Logic: if type title exists, is not empty, not 'Toutes les propriétés', and types_immobilier has only one type, use type-specific image
  // Parse types_immobilier first (can be string or array)
  let typesImmobilierArray = []
  if (typeof props.typesImmobilier === 'string') {
    typesImmobilierArray = props.typesImmobilier.split(',').map(t => t.trim()).filter(Boolean)
  } else if (Array.isArray(props.typesImmobilier)) {
    typesImmobilierArray = props.typesImmobilier
  }

  // Only use type-specific image if there's exactly one type
  if (!result && typesImmobilierArray.length === 1) {
    // Try to get type title from types array using the type from types_immobilier
    let typeTitleToUse = getTypeTitle.value

    // If we still have a hash ID, try to find the type from types_immobilier
    if (typeTitleToUse && typeTitleToUse.match(/^[a-f0-9]{32}$/i)) {
      // It's a hash ID, try to find the type from types_immobilier array
      const typeFromImmobilier = typesImmobilierArray[0]
      if (props.types && props.types.length > 0) {
        // Try to find type by matching the type from types_immobilier
        const foundType = props.types.find(t => {
          if (!t) return false
          // Match by type_title_original, title, or normalized versions
          const typeTitle = t.type_title_original || t.title
          if (!typeTitle) return false
          return typeTitle.toLowerCase() === String(typeFromImmobilier).toLowerCase() ||
            typeTitle.replace(/\s+/g, '-').toLowerCase() === String(typeFromImmobilier).replace(/\s+/g, '-').toLowerCase()
        })
        if (foundType) {
          typeTitleToUse = foundType.type_title_original || foundType.title
        } else {
          // Use the type from types_immobilier directly
          typeTitleToUse = typeFromImmobilier
        }
      } else {
        // Use the type from types_immobilier directly
        typeTitleToUse = typeFromImmobilier
      }
    }

    if (typeTitleToUse &&
      typeTitleToUse !== '' &&
      typeTitleToUse !== 'Toutes les propriétés' &&
      typeTitleToUse !== 'Toutes-les-propriétés' &&
      !typeTitleToUse.match(/^[a-f0-9]{32}$/i) // Not a hash ID
    ) {
      // Format type title to match filename format
      // The filenames are capitalized (e.g., "Appartements.webp")
      // So we need to capitalize the first letter of each word
      const cleanedTitle = String(typeTitleToUse).trim()
      // Handle titles with dashes: "appartements" -> "Appartements", "chambres-d-hotes" -> "Chambres D'hôtes"
      let typeTitleFormatted = cleanedTitle
        .split(/[-_\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

      // Special handling for titles with apostrophes (e.g., "Appart'hôtels", "Chambres d'hôtes")
      // Keep the original capitalization after apostrophes
      typeTitleFormatted = typeTitleFormatted.replace(/'([a-z])/g, (match, letter) => {
        return "'" + letter.toUpperCase()
      })

      // Use dynamic import for type-specific image
      result = getDynamicImage(`types_pages/${typeTitleFormatted}.webp`)
    }
  }

  // Default image - convert public path to dynamic import path
  if (!result && props.defaultImage) {
    // Input format: /images/main_pages/filename.webp
    // Convert to: main_pages/filename.webp for dynamic import
    if (props.defaultImage.startsWith('/images/')) {
      const relativePath = props.defaultImage.replace(/^\/images\//, '')
      result = getDynamicImage(relativePath)
    } else if (props.defaultImage.startsWith('/assets/images/')) {
      // If it's already a public assets path, convert it
      const relativePath = props.defaultImage.replace(/^\/assets\/images\//, '')
      result = getDynamicImage(relativePath)
    } else if (props.defaultImage.startsWith('../assets/images/')) {
      // If defaultImage is already a relative path (from old imports), use it directly
      const relativePath = props.defaultImage.replace(/^\.\.\/assets\/images\//, '')
      result = getDynamicImage(relativePath)
    } else {
      // Fallback: use as-is
      result = props.defaultImage
    }
  }

  // Ensure we always return a valid string
  return result || '/assets/images/main_pages/Annonces-immobilier-a-vendre-au-Maroc.webp'
})
</script>
