
document.getElementById("eq").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        document.getElementById("eq").blur();
    }
});
document.getElementById("rowsInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        document.getElementById("rowsInput").blur();
    }
});
document.getElementById("nameCSV").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        document.getElementById("nameCSV").blur();
    }
});

// create or remove fields
var a = 2;
function add_field() { 
    var div = document.createElement("div");
    div.setAttribute("id", "headerDiv_" + String(a));
    div.setAttribute("class", "headerDiv");

    var br = document.createElement("br");
    br.setAttribute("id", "br_" + String(a));
    var label = document.createElement("label");
    label.setAttribute("for", "header_" + String(a));
    label.setAttribute("id", "label_" + String(a))
    label.innerHTML = 'Column ' + String(a) + ":";
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("class", "headerClass");
    input.setAttribute("id", "header_" + String(a));
    input.setAttribute("placeholder", "Header name " + String(a));
    input.setAttribute("autocomplete", "off");

    div.appendChild(label);
    div.appendChild(br);
    div.appendChild(input);

    var form = document.getElementsByTagName("form")[1];
    form.appendChild(div);
    a++;
}
function remove_field() {
    if (a > 2) {
        var r = a -1;
        document.getElementById("headerDiv_" + String(r)).remove();
        a--;
    }
}

// function 
var allDataHeaders;
var inputHeadersArray = [];
var allDataArray = [];
var transposeAllDataArray = [];
var trasposeArray = [];
var outputArray = [];
var dataLength = 0;
function applyFunction(event) {
    event.preventDefault();

    if (data.length != 0) {
        // get the number of rows 
        if (document.getElementById("rowsInput").value.length == 0) {
            dataLength = data.length;
        } else if (document.getElementById("rowsInput").value.length != 0) {
            dataLength = parseInt(document.getElementById("rowsInput").value);
        } 
        // window alert 
        if (dataLength > data.length) {
            window.alert("Too many rows, decrease the number.");
        }

        // enter function only if an eccepted value exit
        allDataArray = [];
        if (dataLength <= data.length) {

            // make an array of all the data csv 
            // get headers in data 
            allDataHeaders = Object.keys(data[0]);
            //document.getElementById("result_2").innerHTML = JSON.stringify(allDataHeaders);
            for (let i = 0; i < allDataHeaders.length; i++) {
                var rowAllDataArray = [];
                for (let ii = 0; ii < dataLength; ii++) {
                    rowAllDataArray.push(parseFloat(data[ii][allDataHeaders[i]]));
                }
                allDataArray.push(rowAllDataArray);
            }

            // for substitute the functioin array into the all data array 
            // get the idex of the selected array and put into the new array 
            // then use the new index array for substitute the function array 

            // loop every header and for every apply function 
            var indexArray = []; // array of index of selected header 
            for (let i = 1; i < a; i++) {
            
                var header_i = document.getElementById("header_" + String(i)).value;

                // make array to contain the index of the changed column given the input header_i
                indexArray.push(allDataHeaders.indexOf(header_i));
                // push header_i for make header array of input headers for print in the csv later
                inputHeadersArray.push(header_i);

                // make array of selected header and rows
                var dataArray = [];
                for (let i = 0; i < dataLength; i++) {
                    dataArray.push(parseFloat(data[i][header_i]));
                }

                // now we have an array of rows values of the i header 
                var dataArrayFunction = [];
                // loop through dataArray values and pass one by one into function 
                for (let ii = 0; ii < dataArray.length; ii++) {

                    var inputFunction = document.getElementById("eq").value;
                    var value_i = dataArray[ii];

                    // put the value_i into the function the evaluate as sting 
                    var eqXReplace = inputFunction.replace("x", String(value_i));
                    // evaluate
                    var value_iFunction = Function("return " + eqXReplace)();
                    // put into the column array
                    dataArrayFunction.push(parseFloat(value_iFunction));
                }
                // append to array of column 
                outputArray.push(dataArrayFunction);
            }

            // substitute columns of the not transposed array width input column by knowing their index
            for (let ix = 0; ix < indexArray.length; ix++) {
                allDataArray.splice(indexArray[ix], 1, outputArray[ix]);
            }

            // transpose the output array that is array of array
            // make the all the first elements of every sub array be in the first array ...
            // make transpose of updated array 
            transposeAllDataArray = [];
            // for every row element index loop through all the column
            var j;
            var jj;
            for (j = 0; j < dataLength; j++){
                // need to reset array row every time
                let arrayRow = [];
                for (jj = 0; jj < allDataArray.length; jj++) {
                    arrayRow.push(allDataArray[jj][j]); 
                }
                transposeAllDataArray.push(arrayRow);
            }

            // make transpose of new array 
            trasposeArray = [];
            // for every row element index loop through all the column
            var i;
            var ii;
            for (i = 0; i < dataLength; i++){
                // need to reset array row every time
                let arrayRow = [];
                for (ii = 0; ii < outputArray.length; ii++) {
                    arrayRow.push(outputArray[ii][i]); 
                }
                trasposeArray.push(arrayRow);
            }

            // output transpose array 
            document.getElementById("result_1").innerHTML = JSON.stringify(trasposeArray);
            document.getElementById("result_2").innerHTML = JSON.stringify(transposeAllDataArray);
        }
    } else if (data.length == 0) {
        window.alert("no data to calculate, first select a file then submit");
    }
}

// download csv 
function downloadNewCSV() {

    if (trasposeArray.length != 0) {
        var content = "data:text/csv;charset=utf-8,";
        // add headers
        content += inputHeadersArray.join() + "\n";
  
        trasposeArray.forEach(function(row, index) {
          content += row.join(",") + "\n";
        });
        
        var encodedUri = encodeURI(content);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        // get name of file 
        var name = document.getElementById("nameCSV").value;
        link.setAttribute("download", name);
        document.body.appendChild(link); 
        link.click();
    } else if (trasposeArray.length == 0) {
        window.alert("Nothing to download, first upload then calculate")
    }
}
function downloadUpdatedCSV() {

    if (transposeAllDataArray.length != 0) {
        var content = "data:text/csv;charset=utf-8,";
        // add headers
        content += allDataHeaders.join() + "\n";
  
        transposeAllDataArray.forEach(function(row, index) {
          content += row.join(",") + "\n";
        });
        
        var encodedUri = encodeURI(content);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        // get name of file 
        var name = document.getElementById("nameCSV").value;
        link.setAttribute("download", name);
        document.body.appendChild(link); 
        link.click();
    } else if (transposeAllDataArray.length == 0) {
        window.alert("Nothing to download, first upload then calculate")
    }
}

var calc = document.getElementById("calculateButton"); 
calc.addEventListener("click", applyFunction, false);

var downNew = document.getElementById("downloadNewButton"); 
downNew.addEventListener("click", downloadNewCSV, false);

var downUpdated = document.getElementById("downloadUpdatedButton"); 
downUpdated.addEventListener("click", downloadUpdatedCSV, false);
