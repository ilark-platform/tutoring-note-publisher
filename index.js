const fs = require('fs')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const publishDir = './html/tutoring-note'
const htmlFiles = []

const template = fs.readFileSync('./template.html')
const dom = new JSDOM(template.toString())

const document = dom.window.document
const table = document.querySelector('.list-index')
const tbody = table.querySelector('tbody')

const inspectionFindFile = (destPath) => {
    try {
        fs.readdirSync(destPath, { withFileTypes: true })
            .forEach((file) => {
                const path = `${destPath}/${file.name}`;

                if (file.isDirectory()) {
                    inspectionFindFile(path);
                } else {
                    console.log(path, file.name)
                    htmlFiles.push({
                        menuDir: destPath?.split('/').reverse()[0] ?? destPath,
                        fileFullPath: path,
                        fileName: file.name
                    })
                }
            });
    } catch(err) {
        return console.error('Read Error', err);
    }
}

// 예시 경로입니다.
inspectionFindFile(publishDir);

function td (content) {
    const td = document.createElement('td')
    if (content) {
        td.innerHTML = content
    }
    return td
}
htmlFiles.forEach(itemInfo => {
    console.log(itemInfo)
    const tr = document.createElement('tr')

    const filename = td()
    const anchor = document.createElement('a')
    anchor.innerHTML = itemInfo.fileName
    anchor.setAttribute('href', itemInfo.fileFullPath)
    filename.appendChild(anchor)
    tr.appendChild(td(itemInfo.menuDir))
    tr.appendChild(filename)

    tbody.appendChild(tr)
})


fs.writeFileSync(`./index.html`, dom.serialize())
