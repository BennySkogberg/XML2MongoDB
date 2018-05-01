const MongoClient = require('mongodb').MongoClient
const Parser = require('xml2json')
const fs = require('fs')

fs.readFile('./food_data/20170101.xml', function (error, data) {
  if (error) throw error
  var json = Parser.toJson(data)
  var myJson = JSON.parse(json)
  // console.log(myJson.LivsmedelDataset.LivsmedelsLista.Livsmedel.Namn)

  // Connect to the db
  MongoClient.connect('mongodb://localhost:27017', (error, client) => {
    if (error) throw error

    var db = client.db('foodData')

    db.collection('foodItems', function (error, collection) {
      if (error) throw error
      var foodList = myJson.LivsmedelDataset.LivsmedelsLista

      console.log('Livsmedel length: ' + foodList.Livsmedel.length)

      for (var j = 0; j < foodList.Livsmedel.length; j++) {
        var namn = foodList.Livsmedel[j].Namn
        var nummer = parseInt(foodList.Livsmedel[j].Nummer)
        var viktGram = parseInt(foodList.Livsmedel[j].ViktGram)
        var energiVarde = 0.0
        var energiEnhet = ''
        var kolhydratVarde = 0.0
        var kolhydratEnhet = ''
        var proteinVarde = 0.0
        var proteinEnhet = ''
        var fettVarde = 0.0
        var fettEnhet = ''

        var naringsvarden = myJson.LivsmedelDataset.LivsmedelsLista.Livsmedel[j].Naringsvarden.Naringsvarde
        // console.log('n Näringsvärden: ' + myJson.LivsmedelDataset.LivsmedelsLista.Livsmedel.Naringsvarden.Naringsvarde.length)

        for (var i = 0; i < naringsvarden.length; i++) {
          if (naringsvarden[i].Namn === 'Energi (kcal)') {
            // console.log(naringsvarden[i].Namn)
            let varde = naringsvarden[i].Varde.replace(',', '.')
            energiVarde = parseFloat(varde)
            energiEnhet = naringsvarden[i].Enhet
          }

          if (naringsvarden[i].Namn === 'Kolhydrater') {
            // console.log(naringsvarden[i].Namn)
            let varde = naringsvarden[i].Varde.replace(',', '.')
            kolhydratVarde = parseFloat(varde)
            kolhydratEnhet = naringsvarden[i].Enhet
          }

          if (naringsvarden[i].Namn === 'Protein') {
            // console.log(naringsvarden[i].Namn)
            let varde = naringsvarden[i].Varde.replace(',', '.')
            proteinVarde = parseFloat(varde)
            proteinEnhet = naringsvarden[i].Enhet
          }

          if (naringsvarden[i].Namn === 'Fett') {
            // console.log(naringsvarden[i].Namn)
            let varde = naringsvarden[i].Varde.replace(',', '.')
            fettVarde = parseFloat(varde)
            fettEnhet = naringsvarden[i].Enhet
          }
        }

        collection.insert({
          Nummer: nummer,
          Namn: namn,
          ViktGram: viktGram,
          Energi: {
            Varde: energiVarde,
            Enhet: energiEnhet
          },
          Kolhydrater: {
            Varde: kolhydratVarde,
            Enhet: kolhydratEnhet
          },
          Protein: {
            Varde: proteinVarde,
            Enhet: proteinEnhet
          },
          Fett: {
            Varde: fettVarde,
            Enhet: fettEnhet
          }
        })

        db.collection('foodItems').count(function (err, count) {
          if (err) throw err

          // console.log('foodItems: ' + count)
        })

        // console.log('Tillagd i mongoDB: ' + namn)
      }
      console.log('Finished import to database, exit by [ctrl] + C')
    })
  })
})
