# XML2MongoDB
Convert XML and import to MongoDB

## Download Food Data
Download food data from [Livsmedelsdatabasen](https://www.livsmedelsverket.se/om-oss/psidata/livsmedelsdatabasen) and specify YYYYMMDD as 20180521
[http://www7.slv.se/apilivsmedel/LivsmedelService.svc/Livsmedel/Naringsvarde/<YYYYMMDD>](http://www7.slv.se/apilivsmedel/LivsmedelService.svc/Livsmedel/Naringsvarde/20180521). Save the file 20180521.xml in folder food_data.

## Download dependencies
...
npm install
...

## Start MongoDB
on localhost:27017

## Start import
...
npm test
...

## References
 - [How to use MongoDB with promises in Node.js?](https://stackoverflow.com/questions/37911838/how-to-use-mongodb-with-promises-in-node-js) 
 - [How do you use a variable in a regular expression?](https://stackoverflow.com/questions/494035/how-do-you-use-a-variable-in-a-regular-expression) 
