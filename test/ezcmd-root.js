const test = require('ava')
const path = require('path')
const sinon = require('sinon')

const ezcmd = require('../src/index')
const rootCmd = require('../example/root')

const root = path.resolve(__dirname, '../example/root.js')
const handler = sinon.spy(rootCmd, 'handler')

test.afterEach.always(t => {
  handler.reset()
})

test.after.always(t => {
  handler.restore()
})

test.serial('execute root command with options', async t => {
  process.argv[2] = '--option1'
  process.argv[3] = 'value1'

  await ezcmd(root)

  t.true(handler.calledOnce)
  t.true(handler.calledWithExactly({
    option1: 'value1'
  }))
})

test('printting root command help', async t => {
  const write = sinon.spy(process.stdout, 'write')
  process.argv[2] = '--help'

  await ezcmd(root)

  t.true(write.calledOnce)
})
