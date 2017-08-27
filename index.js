var suggestedMovies;
var allMovies;
var searchBy;
var input; 
var directors = [];
var minyear;
var maxyear;
var countries = [];
var genres = [];


var xhr = new XMLHttpRequest();
xhr.open('GET', '/movies.csv', true);

// If specified, responseType must be empty string or "text"
xhr.responseType = 'text';

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
         
      		allMovies = CSVToArray(xhr.responseText);

      		console.log(allMovies[0]); /*testing*/

          $.each(allMovies, function(index, value){
              if(directors.indexOf(value['director']) === -1){
                  directors.push(value['director']);
                }
          });

          /*

          for (var i = 0; i < directors.length; i++) {
             var $input = $('<input type="button" value="'+directors[i]+'" />');
             $input.appendTo($("body"));
          }
*/


          $.each(allMovies, function(index, value){
              if(countries.indexOf(value['country']) === -1){
                  countries.push(value['country']);
              }
          });

                    /*

          for (var i = 0; i < countries.length; i++) {
             var $input = $('<input type="button" value="'+countries[i]+'" />');
             $input.appendTo($("body"));
          }
*/

          /* finish genres */

          
          console.log(directors);     
          console.log(countries); 



      		


        }
    }
};

xhr.send(null);







function searchByDirector() {
            $("director-search").show();
            $("year-search").hide();
            $("country-search").hide();
            $("genre-search").hide();
}


function searchByYear() {
            $("director-search").hide();
            $("year-search").show();
            $("country-search").hide();
            $("genre-search").hide();
}




function searchByCountry() {
	            $("director-search").hide();
            $("year-search").hide();
            $("country-search").show();
            $("genre-search").hide();
}




function searchByGenre() {
	            $("director-search").hide();
            $("year-search").hide();
            $("country-search").hide();
            $("genre-search").show();
}


function showAll() {

}





function csvJSON(csv){

  var lines=csv.split('\n');

  var result = [];

  var headers=lines[0].split(',');
  lines.splice(0, 1);
  lines.forEach(function(line) {
    var obj = {};
    var currentline = line.split(',');
    headers.forEach(function(header, i) {
      obj[header] = currentline[i];
    });
    result.push(obj);
  });

  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray( strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [];
    var headers = [];
    var headersFound = false;
    var headerIndex = 0;

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( {} );
            headersFound = true;
            headerIndex = 0;
        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(new RegExp( "\"\"", "g" ),"\"");

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        if (!headersFound) {
          headers.push(strMatchedValue);
        } else {
          arrData[arrData.length -1][headers[headerIndex]] = strMatchedValue;
          headerIndex ++;
        }
    }

    // Return the parsed data.
    return( arrData );
}

function csvFileToJSON(file) {
  if (!window.FileReader || !window.File) {
    return Promise.reject('Does not support File API');
  }
  if (!(file instanceof File)) {
    return Promise.reject('Not a file');
  }

  return new Promise(function(resolve, reject) {
    var reader = new FileReader();

    reader.onerror = function(err) {
      reject(err);
    };

    // Closure to capture the file information.
    reader.onload = function() {
      var text = reader.result;
      resolve(CSVToArray(text));
    };

    // Read in the image file as a data URL.
    reader.readAsText(file);
  });
}