import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const mainJs = path.join(root, 'src', 'main.js')
const publicDir = path.join(root, 'public')

const mustExist = [
  '/assets/hero-video.mp4',
  '/assets/hero-beachbucket-premium.jpg',
  '/assets/beachbucket-logo-full.jpg',
  '/assets/logo-bird-left.jpg',
  '/assets/logo-shark-right.jpg',
  '/assets/gift-card.jpg',
  '/assets/menu/smoked-fish-dip.jpg'
]

const src = fs.readFileSync(mainJs, 'utf8')
const refs = [...src.matchAll(/['"](\/assets\/[^'"\s)]+)['"]/g)].map(m => m[1])
const allRefs = [...new Set([...mustExist, ...refs])]

const missing = []
for (const ref of allRefs) {
  const normalized = ref.replace(/%2520/g, '%20')
  const rel = normalized.replace(/^\//, '')
  const filePath = path.join(publicDir, rel)
  if (!fs.existsSync(filePath)) missing.push(ref)
}

if (missing.length) {
  console.error('Missing required public assets:')
  for (const m of missing) console.error(` - ${m}`)
  process.exit(1)
}

console.log(`Asset validation passed (${allRefs.length} refs checked).`)
