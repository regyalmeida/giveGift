var jsonfile = require('jsonfile')

var file = 'C:/Users/carol/Desktop/data.json'

var obj = {person: [ {id: '646868716', name: 'Caroline', picture: 'kfsdf/sdfdsf/htkl.jpg' }] }

jsonfile.writeFile(file, obj, {flag: 'a'}, function (err) {
  console.error(err)
})