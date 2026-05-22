import { deflateSync } from 'zlib'
import { writeFileSync, mkdirSync } from 'fs'

// CRC32 table
const crcTable = new Uint32Array(256)
for (let i = 0; i < 256; i++) {
  let c = i
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  crcTable[i] = c
}

function crc32(buf) {
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const t = Buffer.from(type)
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])))
  return Buffer.concat([len, t, data, crc])
}

function makePNG(size, r, g, b) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8  // bit depth
  ihdr[9] = 2  // RGB
  // raw rows: filter(0) + RGB pixels
  const raw = Buffer.alloc(size * (1 + size * 3))
  for (let y = 0; y < size; y++) {
    const row = y * (1 + size * 3)
    raw[row] = 0 // no filter
    for (let x = 0; x < size; x++) {
      const p = row + 1 + x * 3
      raw[p] = r; raw[p + 1] = g; raw[p + 2] = b
    }
  }
  return Buffer.concat([sig, chunk('IHDR', ihdr), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))])
}

mkdirSync('public/icons', { recursive: true })

// Soft mauve #d4a5c9 = rgb(212, 165, 201)
const [r, g, b] = [212, 165, 201]

for (const size of [72, 96, 128, 144, 152, 192, 384, 512]) {
  writeFileSync(`public/icons/icon-${size}x${size}.png`, makePNG(size, r, g, b))
}
writeFileSync('public/apple-touch-icon.png', makePNG(180, r, g, b))
console.log('✓ PWA icons generated')
