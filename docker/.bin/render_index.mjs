import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import prettify from 'html-prettify'
import pipe from 'ramda.pipe'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const frontendDir = path.resolve(__dirname, '../../frontend')
const manifestFilePath = path.resolve(frontendDir, 'manifest.json')
const templateFilePath = path.resolve(frontendDir, 'index.template.html')

pipe(
    () => [
        JSON.parse(fs.readFileSync(manifestFilePath, 'UTF-8')),
        fs.readFileSync(templateFilePath, 'UTF-8')
    ],
    ([manifest, template]) => {
        const entry = Object.values(manifest).find(asset => asset.isEntry)

        return ejs.render(template, {
            JS: process.env.NAVIG8_BASE_URL + entry.file,
            CSS: process.env.NAVIG8_BASE_URL + entry.css[0],
            NAVIG8_SEO_TITLE: process.env.NAVIG8_SEO_TITLE || '',
            NAVIG8_FAVICON: process.env.NAVIG8_FAVICON || '',
            NAVIG8_METAS: JSON.parse(process.env.NAVIG8_METAS || '[]'),
            NAVIG8_LINKS: JSON.parse(process.env.NAVIG8_LINKS || '[]'),
            NAVIG8_TOP_HEAD: process.env.NAVIG8_TOP_HEAD,
            NAVIG8_BOTTOM_HEAD: process.env.NAVIG8_BOTTOM_HEAD,
            NAVIG8_TOP_BODY: process.env.NAVIG8_TOP_BODY,
            NAVIG8_BOTTOM_BODY: process.env.NAVIG8_BOTTOM_BODY,
        })
    },
    prettify,
    html => {
        fs.writeFileSync(path.resolve(frontendDir, 'index.html'), html)
        fs.unlinkSync(manifestFilePath)
        fs.unlinkSync(templateFilePath)
    }
)();
