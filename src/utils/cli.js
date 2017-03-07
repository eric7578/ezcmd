function padding(str, width) {
  str = str.slice(0, width)
  while(str.length < width) {
    str = str + ' '
  }
  return str
}

exports.printHelp = function (desc, options) {
  const optDescs = Object
    .keys(options)
    .map(opt => {
      const { alias } = options[opt]
      let args = `--${opt}`
      if (alias) {
        args = `${args}, -${alias}`
      }

      return {
        args,
        describe: options[opt].describe
      }
    })

  const maxLen = optDescs.reduce((cur, next) => Math.max(cur, next.args.length), 0)
  return optDescs.reduce((out, next) => {
    const { args, describe } = next
    const descLine = `  ${padding(args, maxLen)}  ${describe}\n`
    return out + descLine
  }, `${desc}\n`)
}
