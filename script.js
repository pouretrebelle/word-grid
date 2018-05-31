var fs = require('fs');

fs.readFile('words.json', function(err, data) {
  if (err) throw err;
  process(data);
});

function process(data) {
  data = JSON.parse(data);
  var grids = [];

  var length = data.length;
  for (var a = 0; a < length; a++) {
    for (var b = 0; b < length; b++) {
      if (
          // not the same word
          a !== b &&
          // first letter of b is the second letter of a
          data[b][0] === data[a][1]
      ) {

        // if the second word works
        for (var c = 0; c < length; c++) {
          if (
              // not the same word
              a !== c &&
              // first letter of c is the third letter of a
              data[c][0] === data[a][2] &&
              // second letter of c is the third letter of b
              data[c][1] === data[b][2]
          ) {

            // if the third word works
            for (var d = 0; d < length; d++) {
              if (
                  // not the same word
                  a !== d &&
                  // first letter of d is the fourth letter of a
                  data[d][0] === data[a][3] &&
                  // second letter of d is the fourth letter of b
                  data[d][1] === data[b][3] &&
                  // third letter of d is the fourth letter of c
                  data[d][2] === data[c][3]
              ) {


                // if the third word works
                for (var e = 0; e < length; e++) {
                  if (
                      // not the same word
                      a !== e &&
                      // first letter of e is the fifth letter of a
                      data[e][0] === data[a][4] &&
                      // second letter of e is the fifth letter of b
                      data[e][1] === data[b][4] &&
                      // third letter of e is the fifth letter of c
                      data[e][2] === data[c][4] &&
                      // third letter of e is the fifth letter of d
                      data[e][3] === data[d][4]
                  ) {

                    // it works!
                    grids.push([
                        data[a],
                        data[b],
                        data[c],
                        data[d],
                        data[e],
                      ]
                        .join('\n')
                        .toUpperCase());
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fs.writeFile('grids.txt', grids.join('\n\n'), function(err) {
    if (err) return console.log(err);
    console.log(`found ${grids.length} word grids`);
  });
};
