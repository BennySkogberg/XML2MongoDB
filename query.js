const MongoClient = require('mongodb').MongoClient

/*
From StackOverflow
https://stackoverflow.com/a/494122/286244
  This is because, although "." is a String, in the RegExp constructor
  it's still interpreted as a regular expression, meaning any non-line-break
  character, meaning every character in the string. For this purpose, the
  following function may be useful:
*/
RegExp.quote = function (str) {
  return str.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1')
}

var url = 'mongodb://localhost:27017/foodData'
MongoClient.connect(url)
  .then(function (db) {
    var foodDb = db.db('foodData')
    foodDb.collection('foodItems', function (error, collection) {
      if (error) throw error

      // The users search string. Beware of capitaization.
      var searchstring = 'fett 34'

      // Make the searchstring into a wildcard search working in MongoDB
      var searchFor = new RegExp(RegExp.quote(searchstring), 'g')

      // Find all items containing searchstring stored as a RegExp in variable searchFor
      // and return the items as a single entity (to be used in a response)
      collection.find({ Namn: searchFor }).toArray(function (error, docs) {
        if (error) throw error
        console.log(docs)
        console.log('Done with array')
      })

      // You'll have the same response using forEach statement, but it's slower
      var fooditem = collection.find({ Namn: searchFor })

      // console.log all items containing searchstring
      fooditem.forEach(function (item) {
        console.log(item.Namn)
        console.log('Done with item')
      })
    })
  })
  .catch(function (err) {
    console.log(err)
  })
