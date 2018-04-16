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
MongoClient.connect('mongodb://localhost:27017/Livsmedel', function (error, db) {
  if (error) throw error
  // Write databse Insert/Update/Query code here..
})
