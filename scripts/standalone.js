#!/usr/bin/env node
const fs = require('fs-extra')
const execa = require('execa')
const path = require('path')

const package = require(path.join(__dirname, '../package.json'))
const wd = path.join(__dirname, '../standalone')
const v = package.version
const name = package.name

const plats = ['macos', 'win.exe', 'linux']

const main = async () => {
  for (const plat of plats) {
    console.log(`standalone: packing ${plat}`)
    const file = `${name}-${plat}`

    await fs.remove(`${wd}/tar-${file}`)
    await fs.mkdir(`${wd}/tar-${file}`)
    await fs.move(`${wd}/${file}`, `${wd}/tar-${file}/hygen`)
    await execa.shell(
      `cd ${wd}/tar-${file} && tar -czvf ../hygen.${plat}.v${v}.tar.gz hygen`
    )
    await fs.remove(`${wd}/tar-${file}`)
  }

  console.log('standalone: done.')
  console.log((await execa.shell(`ls ${wd}`)).stdout)
}

main()
