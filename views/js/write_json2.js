var obj = {person: [ {id: '646868716', name: 'Caroline', picture: 'kfsdf/sdfdsf/htkl.jpg' }] }

var json = JsonConvert.SerializeObject(_data);

System.IO.File.WriteAllText ("C:\Users\carol\Desktop\objeto.json", json);