
document.getElementById("header_1").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        document.getElementById("header_1").blur();
    }
});
document.getElementById("rowsInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();

        document.getElementById("rowsInput").blur();
    }
});

var header_1;
var dataLength;
function f(event) {
    event.preventDefault();

    // input fields column and row 
    header_1 = document.getElementById("header_1").value;
    if (document.getElementById("rowsInput").value.length == 0) {
        dataLength = data.length;
    } else if (document.getElementById("rowsInput").value.length != 0) {
        dataLength = parseInt(document.getElementById("rowsInput").value);
    } 

    // alert window 
    if (dataLength > data.length) {
        window.alert("Too many rows, decrease the number.");
    }

    // get array and calculations
    if (dataLength <= data.length) {

        // make array of selected header and rows
        var dataArray = [];
        for (let i = 0; i < dataLength; i++) {
            dataArray.push(parseFloat(data[i][header_1]));
        }

        // calculations
        // mean 
        var sum = 0;
        for (let i = 0; i < dataLength; i++) {
            sum += dataArray[i];
        }
        var mean = sum / dataLength;

        // sd
        var sumSD = 0;
        for (let i = 0; i < dataLength; i++) {
            sumSD += Math.pow((dataArray[i] - mean), 2);
        }

        // population sd and variance
        var pSD = Math.sqrt(sumSD / dataLength);
        var pVar = sumSD / dataLength;

        // sample sd and variance
        var sSD = Math.sqrt(sumSD / (dataLength - 1));
        var sVar = sumSD / (dataLength - 1)

        document.getElementById("result_1").innerHTML = pSD;
        document.getElementById("result_2").innerHTML = sSD;
        document.getElementById("result_3").innerHTML = pVar;
        document.getElementById("result_4").innerHTML = sVar;
        document.getElementById("result_5").innerHTML = dataLength;
    }
    
}

var elCal = document.getElementById("calculateButton");
elCal.addEventListener("click", f, false); 