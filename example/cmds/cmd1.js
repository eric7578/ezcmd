const sinon = require('sinon')

exports.describe = 'Describe for cmd1'

exports.options = {
  option1: {
    opt1: {
      describe: 'Option1'
    }
  }
}

exports.handler = sinon.spy()