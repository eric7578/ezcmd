const test = require('ava')
const path = require('path')
const sinon = require('sinon')

const cmd1 = require('../example/cmds/cmd1')
const ezcmd = require('../src/index')

test('execute cmd1', t => {
  process.argv[2] = 'cmd1'

  ezcmd(path.resolve(__dirname, '../example/cmds'))

  t.true(cmd1.handler.called)
})
