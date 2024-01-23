const removeFromArray = function(array, ...elementsToDel) {
    let tempArray = array;
    elementsToDel.forEach(element => {
        if (tempArray.includes(element)) {
            tempArray.splice(tempArray.indexOf(element), 1);
        }
    })

    return tempArray;
}

// Do not edit below this line
module.exports = removeFromArray;
