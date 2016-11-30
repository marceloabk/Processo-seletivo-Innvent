//= require currencylayer


describe("CurrencyLayer#parseJSDateToYYYYMMDD", function() {

  it("parse a js Date to YYYY-MM-DD format", function() {
  	var date = new Date(2016,10,30);
  	var formattedDate = parseJSDateToYYYYMMDD(date);

    expect(formattedDate).toBe("2016-11-30");
  });

  it("should not parse a js Date to YYYY/MM/DD format", function() {
  	var date = new Date(2016,10,30);
  	var formattedDate = parseJSDateToYYYYMMDD(date);

    expect(formattedDate).not.toBe("2016/11/30");
  });

});