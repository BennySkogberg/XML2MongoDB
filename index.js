const MongoClient = require('mongodb').MongoClient
const http = require('http')
const hostname = '127.0.0.1'
const port = 2018

// Start server
const server = http.createServer((requset, response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/plain')
  response.end('Hello World\n')
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// Connect to the db
MongoClient.connect('mongodb://localhost:27017', (error, client) => {
  if (error) throw error

  var db = client.db('foodData')

  db.collection('foodData', function (error, collection) {
    if (error) throw error

    collection.insert({
      id: 1,
      Namn: 'Talg nöt',
      ViktGram: 100,
      kcal: 656.3
    })

    db.collection('foodData').count(function (err, count) {
      if (err) throw err

      console.log('foodData: ' + count)
    })
  })
})
