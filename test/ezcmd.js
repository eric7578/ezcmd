const test = require('ava')
const path = require('path')
const sinon = require('sinon')

const ezcmd = require('../src/index')
const cmd1 = require('../example/cmds/cmd1')

const cmddir = path.resolve(__dirname, '../example/cmds')
const handler = sinon.spy(cmd1, 'handler')

test.afterEach.always(t => {
  handler.reset()
})

test.after.always(t => {
  handler.restore()
})

test.serial('execute cmd1', async t => {
  process.argv[2] = 'cmd1'

  await ezcmd(cmddir)

  t.true(handler.calledOnce)
})

test.serial('execute cmd1 with options', async t => {
  process.argv[2] = 'cmd1'
  process.argv[3] = '--option1'
  process.argv[4] = 'value1'

  await ezcmd(cmddir)

  t.true(handler.calledOnce)
  t.true(handler.calledWithExactly({
    option1: 'value1'
  }))
})

test('printting command help', async t => {
  const write = sinon.spy(process.stdout, 'write')
  process.argv[2] = 'cmd1'
  process.argv[3] = '--help'

  await ezcmd(cmddir)

  t.true(write.calledOnce)
})
