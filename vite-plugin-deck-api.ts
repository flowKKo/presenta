import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'

const USER_DECKS_DIR = path.resolve(__dirname, 'src/data/user-decks')
const MAX_BODY_SIZE = 10 * 1024 * 1024 // 10 MB

export default function deckApiPlugin(): Plugin {
  return {
    name: 'deck-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/__deck-api\/([a-zA-Z0-9_-]+)$/)
        if (!match) return next()

        const id = match[1]

        if (req.method === 'PUT') {
          const chunks: Buffer[] = []
          let size = 0
          let aborted = false
          req.on('data', (chunk: Buffer) => {
            if (aborted) return
            size += chunk.length
            if (size > MAX_BODY_SIZE) {
              aborted = true
              res.statusCode = 413
              res.end('payload too large')
              req.destroy()
              return
            }
            chunks.push(chunk)
          })
          req.on('end', () => {
            if (aborted) return
            const body = Buffer.concat(chunks).toString()
            try {
              JSON.parse(body) // validate JSON
              fs.mkdirSync(USER_DECKS_DIR, { recursive: true })
              fs.writeFileSync(path.join(USER_DECKS_DIR, `${id}.json`), body, 'utf-8')
              res.statusCode = 200
              res.end('ok')
            } catch {
              res.statusCode = 400
              res.end('invalid json')
            }
          })
          return
        }

        if (req.method === 'DELETE') {
          const filePath = path.join(USER_DECKS_DIR, `${id}.json`)
          // Only allow deleting .json files (protect AI-generated .ts)
          if (!fs.existsSync(filePath)) {
            res.statusCode = 404
            res.end('not found')
            return
          }
          fs.unlinkSync(filePath)
          res.statusCode = 200
          res.end('ok')
          return
        }

        res.statusCode = 405
        res.end('method not allowed')
      })
    },
  }
}
