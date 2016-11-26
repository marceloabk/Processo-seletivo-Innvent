$(document).ready(function() {

    // set endpoint and your access key
    endpoint = 'historical'
    access_key = '0a27d12beb3002410379fbfde65fe054';

    USDBRL = new Array();
    USDEUR = new Array();
    USDARS = new Array();

    function apiRequest(date) {
        // get the most recent exchange rates via the "live" endpoint:

        $.ajax({
            url: 'http://apilayer.net/api/' + endpoint + '?access_key=' + 
            access_key + '&date=' + date + "&currencies=BRL,EUR,ARS",   
            dataType: 'jsonp',
            success: function(json) {

                USDBRL.push(json.quotes.USDBRL);
                USDEUR.push(json.quotes.USDEUR);
                USDARS.push(json.quotes.USDARS);

            },                   
            complete: function(){ 

                if (USDBRL.length == 7 && USDARS.length == 7 && USDARS.length == 7) {
                    convertArraysToBRL(USDARS);
                    convertArraysToBRL(USDEUR);
                }
            }
        });

    }

    function parseJSDateToYYYYMMDD(date) {

        var stringDate = date.toISOString().slice(0,10);
        return stringDate;
    }

    function createHistoricalArrays() {

        let date = new Date();


        for (var i = 0; i < 7; i++) {
            let formatedDate = parseJSDateToYYYYMMDD(date);
            let conversion = apiRequest(formatedDate);
            date.setDate(date.getDate() - 1);
        }
    }

    function convertArraysToBRL(array) {

        for (var i = 0; i < array.length; i++) {
            array[i] = USDBRL[i] / array[i];
        }

    }


    $("#first-slider-item").click(function() {
        createHistoricalArrays();
    });

});