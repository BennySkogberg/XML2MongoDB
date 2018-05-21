const MongoClient = require('mongodb').MongoClient

/*
MongoClient.connect('mongodb://localhost:27017', (error, client) => {
  if (error) throw error
  var db = client.db('foodData')
  // console.log(client)
  db.collection('foodItems', function (error, collection) {
    if (error) throw error
    console.log('Upper: ' + collection)
    var fooditem = collection.find({ Nummer: 1 })
    fooditem.forEach(function (doc) {
      // console.log(doc)
      // process.exit()
    }, function (err) {
      if (err) throw err
    })
  })
})
*/

var url = 'mongodb://localhost:27017/foodData'
MongoClient.connect(url)
  .then(function (db) { // <- db as first argument
    var foodDb = db.db('foodData')
    foodDb.collection('foodItems', function (error, collection) {
      if (error) throw error
      // find
      // var querystring = 'olja'
      // var fooditem = collection.find({ Namn: /.*querystring.*/ })
      var fooditem = collection.find({ Namn: /.*olja.*/ })
      fooditem.forEach(function (item) {
        console.log(item)
        // process.exit()
      })

      // findOne - returns the first occurrance of Namn containing 'fett'
      collection.findOne({ Namn: /.*fett.*/ }, function (error, document) {
        if (error) throw error
        // console.log(document)
      })
    })
  })
  .catch(function (err) {
    console.log(err)
  })
