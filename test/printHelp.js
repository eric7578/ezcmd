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

  t.is(
    out,
    'command description\n' +
    '  --mail, -m  Mail\n' + 
    '  --password  Password\n'
  )
})
