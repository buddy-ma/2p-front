// Content modules reference images as "/images/services/<file>.webp". Production only serves
// what Vite bundles under /assets/, so every path is resolved to its hashed build URL by file name.
const files = import.meta.glob('../assets/images/services/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const urlsByName = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop(), url]),
)

export function serviceImageUrl(src) {
  if (!src) return src
  return urlsByName[src.split('/').pop()] || src
}
