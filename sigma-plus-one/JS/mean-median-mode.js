
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

        // median 
        // if even then return mean of two number if odd return one 
        // + 1 because it starts form 0 
        // data length start form 1 not 0
        var median;
        if (dataLength % 2 == 0) {
            dataArray.sort((a,b)=>a-b);
            var first = dataArray[dataLength/2 - 1];
            var second = dataArray[dataLength/2];
            median = (first + second) / 2;
        } else {
            dataArray.sort((a,b)=>a-b);
            median = dataArray[(dataLength-1)/2];
        }

        // mode
        var freq = [];
        for (let i = 0; i < dataLength; i++) {
            // get the freq of the i element
            var freqValue = dataArray.filter(x => x == dataArray[i]).length;
            // create an array of freq in the pos of their value
            freq.push(freqValue);
        }
        // get the max freq 
        var maxFreq = Math.max(...freq);
        // get the index that are in the pos of the max freq of the freq list
        var index = []; // index list of the one that have max freq 
        for (let ii = 0; ii < freq.length; ii++) {
            if (freq[ii] == maxFreq) {
                index.push(ii);
            }
        }
        mode = [];
        for (let ix = 0; ix < index.length; ix++) {
            mode.push(dataArray[index[ix]]);
        }
        // eliminte form mode array the repeting value 
        // by converting array into a set that will remove duplicate and 
        // reconverting into an array
        mode = [...new Set(mode)];

        // max and min
        dataArray.sort((a,b)=>a-b);
        var min = dataArray[0];
        var max = dataArray[dataArray.length -1];

        
        document.getElementById("result_1").innerHTML = mean;
        document.getElementById("result_2").innerHTML = median;
        document.getElementById("result_3").innerHTML = mode;
        document.getElementById("result_4").innerHTML = maxFreq;
        document.getElementById("result_5").innerHTML = min;
        document.getElementById("result_6").innerHTML = max;
        document.getElementById("result_7").innerHTML = dataLength;
    }

}

var elCal = document.getElementById("calculateButton");
elCal.addEventListener("click", f, false); 