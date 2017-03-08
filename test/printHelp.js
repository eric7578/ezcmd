const test = require('ava')
const { printHelp } = require('../src/utils/cli')

test('printting help with options', t => {
  const out = printHelp(
    'command description',
    {
      mail: {
        alias: 'm',
        describe: 'Mail'
      },
      password: {
        describe: 'Password'
      }
    }
  )
  const expect = [
    'command description',
    '  --mail, -m  Mail',
    '  --password  Password',
    ''
  ]

  t.deepEqual(out.split('\n'), expect)
})

test('printting help without options', t => {
  const out = printHelp('command description')
  const expect = [
    'command description',
    ''
  ]

  t.deepEqual(out.split('\n'), expect)
})
