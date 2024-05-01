const { small } = require("jsverify");

function findDist(distance_matrix, from, to){

    return (distance_matrix[from][to])

}

function findSmallest(list){

    if(!(list.length > 0)){
            return null
        }

        let smallestVal = Infinity

        for (k = 0; k < list.length; k++){

            if (list[k] < smallestVal){
                smallestVal = list[k]
            }

        }

    return smallestVal

}

function tsp_hk(distance_matrix) {

    //Recursively go through the citites
    function heldKarp(cities, start){
        //console.log("starting the loop right now with cities: " + cities + " and start is " + start)
        //-----------------------------------------------------------------------------------------------------------------------------------------------
        
        if (cities.length == 2){
            //console.log("distances are " + findDist(distance_matrix, cities[0], cities[1]))
            return findDist(distance_matrix, cities[0], cities[1])
        }


        //-----------------------------------------------------------------------------------------------------------------------------------------------

        //Get the set of cities without the start value, need to do an 'empty' slice to initialize a copy of citites
        let editedCities = cities.slice()

        let startIndex = editedCities.indexOf(start)
        editedCities.splice(startIndex, 1)
        //console.log('cities is equal to ' + cities)
        

        //-----------------------------------------------------------------------------------------------------------------------------------------------


        let minVals = []

        //not having a let in the for loop for i caused me a lot of problems

        for (let i = 0; i < editedCities.length; i++){

            //console.log("In loop number #" + i)
            let returnVal = heldKarp(editedCities, editedCities[i])

            minVals.push(returnVal  + findDist(distance_matrix, start, editedCities[i]))
        }
        //console.log(minVals)

        return findSmallest(minVals)
         
    }

//-----------------------------------------------------------------------------------------------------------------------------------------------

    if(!(distance_matrix.length > 0) || distance_matrix.length == 1) {return 0}

    //we first push in the cities, considering that cities will be integers 0 - N.
    let cities = []

    for ( c = 0; c < distance_matrix.length; c++){
        cities.push(c)
    } //console.log("cities are " + cities)

    //loop thorugh all the possible starting cities

    let minStartCity = []

    for (s = 0; s < distance_matrix.length; s++){
        minStartCity.push(heldKarp(cities,s))
    }

    //console.log("end of start city" + minStartCity) 

    return findSmallest(minStartCity) 
} 

    