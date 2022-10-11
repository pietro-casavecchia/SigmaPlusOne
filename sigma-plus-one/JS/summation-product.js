
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
var dataLength = 0;
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
        var sum = 0;
        // equal to 1 else would make always zero 
        var product = 1;
        var dataIndex;
        for (i=0; i < dataLength; i++) {
            dataIndex = parseFloat(data[i][header_1]);
            sum += dataIndex;
            product *= dataIndex;
        }

        document.getElementById("result_1").innerHTML = sum;
        document.getElementById("result_2").innerHTML = product;
        document.getElementById("result_3").innerHTML = dataLength;
    } 

}

var elCal = document.getElementById("calculateButton");
elCal.addEventListener("click", f, false); 