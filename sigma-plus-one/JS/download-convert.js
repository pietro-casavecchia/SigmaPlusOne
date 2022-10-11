var headers;
var data = [];

function CSVDataToArray(event) {
    event.preventDefault();

    const csvFile = document.getElementById("csv");
    const input = csvFile.files[0];
    const reader = new FileReader();
    reader.readAsText(input);

    function csvToArray(str, delimiter = ",") {
        headers = str.slice(0, str.indexOf("\n")).split(delimiter);
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");

        const arr = rows.map(function (row) {
            const values = row.split(delimiter);
            const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
            }, {});
            return el;
        });
        return arr;
    }

    reader.onload = function (f) {
        const text = f.target.result;
        data = csvToArray(text);

        document.getElementById("submitted").innerHTML = "Submitted!";
        document.getElementById("headers").innerHTML = headers;
        document.getElementById("rowsOutput").innerHTML = data.length;
    };
}

var elSubmit = document.getElementById("submitButton"); 
elSubmit.addEventListener("click", CSVDataToArray, false); 