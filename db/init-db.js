let exec = require('child_process').exec
let command = 'mongoimport --db movie_db --collection movies --file db-data/movies.json'
exec(command, (err, stdout, stderr) => {
  // check for errors or if it was succesfuly
  cb()
})