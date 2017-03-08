const fs = require('mz/fs')
const path = require('path')
const parseArgs = require('minimist')

const { printHelp } = require('./utils/cli')

module.exports = async function (target) {
  const args = parseArgs(process.argv.slice(2))
  console.log(process.argv.slice(2))
  const subCmd = args._[0]
  delete args._
  const opts = args

  let stats = await fs.stat(target)
  if (stats.isDirectory()) {
    target = path.resolve(target, subCmd)
  } else if (!stats.isFile()) {
    throw new Error(`${target} is not applicable as a command`)
  }

  const module = require(target)
  if (opts.help || subCmd === 'help') {
    process.std.out(printHelp(module.describe || module.desc, modle.options))
  } else {
    await module.handler(opts)
  }
}
