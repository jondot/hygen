#!/usr/bin/env node
const fs = require('fs-extra')
const execa = require('execa')
const path = require('path')

const package = require(path.join(__dirname, '../package.json'))
const wd = path.join(__dirname, '../standalone')
const v = package.version
const name = package.name

const plats = ['macos', 'win.exe', 'linux']
const repo = 'github.com/jondot/homebrew-tap'

const main = async () => {
  for (const plat of plats) {
    console.log(`standalone: packing ${plat}`)
    const file = `${name}-${plat}`

    await fs.remove(`${wd}/tar-${file}`)
    await fs.mkdir(`${wd}/tar-${file}`)
    // give Windows special treatment: it should be a zip file and keep an .exe suffix
    if(plat === 'win.exe'){
      await fs.move(`${wd}/${file}`, `${wd}/tar-${file}/hygen.exe`)
      await execa.shell(
        `cd ${wd}/tar-${file} && zip ../hygen.${plat}.v${v}.zip hygen.exe`
      )
    } else {
      await fs.move(`${wd}/${file}`, `${wd}/tar-${file}/hygen`)
      await execa.shell(
        `cd ${wd}/tar-${file} && tar -czvf ../hygen.${plat}.v${v}.tar.gz hygen`
      )
    }
    await fs.remove(`${wd}/tar-${file}`)
  }

  console.log('standalone: done.')
  console.log((await execa.shell(`ls ${wd}`)).stdout)

  console.log('standalone: publishing to homebrew tap...')
  const matches = (await execa.shell(
    `shasum -a 256 ${wd}/hygen.macos.v${v}.tar.gz`
  )).stdout.match(/([a-f0-9]+)\s+/)
  console.log(matches)
  if (matches && matches.length > 1) {
    const sha = matches[1]
    await fs.writeFile('/tmp/hygen.rb', brewFormula(sha, v))
    const cmd = [
      `cd /tmp`,
      `git clone git://${repo} brew-tap`,
      `cd brew-tap`,
      `mv /tmp/hygen.rb .`,
      `git config user.email jondotan@gmail.com`,
      `git config user.name 'Dotan Nahum'`,
      `git add .`,
      `git commit -m 'hygen: auto-release'`,
      `git push https://${process.env.GITHUB_TOKEN}@${repo}`
    ].join(' && ')
    console.log(await execa.shell(cmd).stdout)

    console.log('standalone: publish done.')
  }
}

const brewFormula = (sha, ver) => `
VER = "${ver}"
SHA = "${sha}"

class Hygen < Formula
  desc "The scalable code generator that saves you time."
  homepage "http://www.hygen.io"
  url "https://github.com/jondot/hygen/releases/download/v#{VER}/hygen.macos.v#{VER}.tar.gz"
  version VER
  sha256 SHA

  def install
    bin.install "hygen"
  end
end
`
main()
