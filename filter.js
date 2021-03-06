var fs = require('fs');
var fourLetters = [];
var wordLimit = 500;

function readLines(input, func) {
  var remaining = "";

  input.on("data", function(data) {
    remaining += data;
    var index = remaining.indexOf("\n");
    var last = 0;
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf("\n", last);
    }

    remaining = remaining.substring(last);
  });

  input.on("end", function() {
    if (remaining.length > 0) {
      func(remaining);
    }

    fs.writeFile('fourletters.json', JSON.stringify(fourLetters), 'utf8', function(err) {
      if (err) return console.log(err);
      console.log(`${fourLetters.length} words saved`);
    });
  });
}

function func(line) {
  if (line.length === 4 && fourLetters.length < wordLimit) fourLetters.push(line);
}

var input = fs.createReadStream('en.txt');
readLines(input, func);
