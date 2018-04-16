// const MongoClient = require('mongodb').MongoClient
const Parser = require('xml2json')

var xml = '<foo attr=\'value\'>bar</foo>'
console.log('input -> %s', xml)

// xml to json
var json = Parser.toJson(xml)
console.log('to json -> %s', json)

// json to xml
xml = Parser.toXml(json)
console.log('back to xml -> %s', xml)

// Connect to the db
/*
MongoClient.connect('mongodb://localhost:27017', (error, client) => {
  if (error) throw error

  var db = client.db('foodData')

  db.collection('foodItems', function (error, collection) {
    if (error) throw error

    collection.insert({
      Nummer: 1,
      Namn: 'Talg nöt',
      ViktGram: 100,
      Energi: {
        Varde: 656.3,
        Enhet: 'kcal'
      },
      Kolhydrater: {
        Varde: 0.00,
        Enhet: 'g'
      },
      Protein: {
        Varde: 7.00,
        Enhet: 'g'
      },
      Fett: {
        Varde: 71.0,
        Enhet: 'g'
      }
    })

    db.collection('foodItems').count(function (err, count) {
      if (err) throw err

      console.log('foodItems: ' + count)
    })
  })
})
*/
