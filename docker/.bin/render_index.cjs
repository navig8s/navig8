#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const prettify = require('html-prettify')
const pipe = require('ramda.pipe')

const frontendDir = path.resolve(__dirname, '../../frontend')
const manifestFilePath = path.resolve(frontendDir, 'dist/manifest.json')
const templateFilePath = path.resolve(frontendDir, 'index.html')

pipe(
    () => [
        JSON.parse(fs.readFileSync(manifestFilePath, 'UTF-8')),
        fs.readFileSync(templateFilePath, 'UTF-8')
    ],
    ([manifest, template]) => {
        const entry = Object.values(manifest).find(asset => asset.isEntry)

        return ejs.render(template, {
            JS: entry.file,
            CSS: entry.css[0],
            NAVIG8_SEO_TITLE: process.env.SEO_TITLE || '',
            NAVIG8_FAVICON: process.env.FAVICON || '',
            NAVIG8_METAS: JSON.parse(process.env.METAS || '[]'),
            NAVIG8_LINKS: JSON.parse(process.env.LINKS || '[]'),
            NAVIG8_TOP_HEAD: process.env.NAVIG8_TOP_HEAD,
            NAVIG8_BOTTOM_HEAD: process.env.NAVIG8_BOTTOM_HEAD,
            NAVIG8_TOP_BODY: process.env.NAVIG8_TOP_BODY,
            NAVIG8_BOTTOM_BODY: process.env.NAVIG8_BOTTOM_BODY,
        })
    },
    prettify,
    html => fs.writeFileSync(path.resolve(frontendDir, 'dist/index.html'), html)
)();
