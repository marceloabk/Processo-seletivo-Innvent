$(document).ready(function() {

    // set endpoint and access key
    endpoint = 'historical'
    access_key = '0a27d12beb3002410379fbfde65fe054';

    // currency arrays
    usdbrl = new Array();
    usdeur = new Array();
    usdars = new Array();

    const DAYS_OF_WEEK = 7;

    // create a request at currency layer
    function apiRequest(date) {

        // ajax request for historical endpoint
        // returns historical rate of a given data of USD to BRL, USD to EUR and USD to ARS
        $.ajax({
            url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + 
            access_key + '&date=' + date + "&currencies=BRL,EUR,ARS",   
            dataType: 'jsonp',
            success: function(json) {

                usdbrl.push(json.quotes.USDBRL);
                usdeur.push(json.quotes.USDEUR);
                usdars.push(json.quotes.USDARS);                

            },                   
            complete: function(){ 
                
                // compare arrays length with 7 to see if is the last apiRequest call
                // it's 7 because it show result of the last week

                if (usdbrl.length == DAYS_OF_WEEK && usdars.length == DAYS_OF_WEEK && usdars.length == DAYS_OF_WEEK) {
                    convertArraysToBRL(usdars);
                    convertArraysToBRL(usdeur);
                }
            }
        });

    }

    // receive a js object Date() and transform it to string with format YYYY-MM-DD
    // the currency layer APIS needs the date with this format
    function parseJSDateToYYYYMMDD(date) {

        // slice(0,10) to get the first 10 characters (YYYY-MM-DD)
        var stringDate = date.toISOString().slice(0,10);
        
        return stringDate;
    }

    // fill usdbrl, usdeur and usdars with data from currency layer
    function fillHistoricalRatesArray() {

        // get current date
        let date = new Date();


        for (var i = 0; i < DAYS_OF_WEEK; i++) {

            let formatedDate = parseJSDateToYYYYMMDD(date);

            // get data for the given date
            apiRequest(formatedDate);

            // set the current date to date - 1. Js do all the math with date
            date.setDate(date.getDate() - 1);
        }
    }


    /* if 1 USD = 3 BRL and
     *    1 USD = 15 ARS then
     *
     *    3 BRL = 15 ARS and
     *    1 BRL = 0.2 ARS    (BRL/ARS)
     *
     *
     * this method use this logic to divide USDBRL by USDXXX and get how much 1 XXX worth in BRL currency
     */
    function convertArraysToBRL(array) {

        for (var i = 0; i < array.length; i++) {

            array[i] = usdbrl[i] / array[i];
        }

    }

    // call fillHistoricalRatesArray when the page is ready
    // fillHistoricalRatesArray();

});