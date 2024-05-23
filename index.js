const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const dayjs = require('dayjs')
const publishDir = './html/'
const menuDir = fs.readdirSync(publishDir)
const htmlFiles = []

const template = fs.readFileSync('./template.html')
const dom = new JSDOM(template.toString())

const document = dom.window.document
const table = document.querySelector('.list-index')
const tbody = table.querySelector('tbody')

for(let i =0; i < menuDir.length; i++){
    let dir = `${publishDir}${menuDir[i]}/`
    let fileList = fs.readdirSync(dir).filter(chk => {
        return chk.match(/.+\.html$/)
    }).map(fileName => {
        return {
            fileName : fileName,
            dir : dir,
            menuDir : menuDir[i],
            info : fs.statSync(`${dir}${fileName}`)
        }
    })
    if(fileList.length > 0) htmlFiles.push(fileList)
}

function td (content) {
    const td = document.createElement('td')
    if (content) {
        td.innerHTML = content
    }
    return td
}

htmlFiles.forEach(menu => {
    menu.forEach(itemInfo => {
        console.log(itemInfo)
        const tr = document.createElement('tr')

        const filename = td()
        const anchor = document.createElement('a')
        anchor.innerHTML = itemInfo.fileName
        anchor.setAttribute('href', `${itemInfo.dir}${itemInfo.fileName}`)
        filename.appendChild(anchor)

        const format = 'YYYY/MM/DD hh:mm'

        tr.appendChild(td(itemInfo.menuDir))
        tr.appendChild(filename)
        tr.appendChild(td( dayjs(itemInfo.ctime).format(format) ))
        tr.appendChild(td( dayjs(itemInfo.mtime).format(format) ))
        tr.appendChild(td( dayjs(itemInfo.birthtime).format(format) ))

        tbody.appendChild(tr)
    })
})


fs.writeFileSync(`./index.html`, dom.serialize())
