const countriesList =require( "../../models/countries-list");


// import * as CountryStateData from "../../../../mor-back-office-api/app/controllers/static-data/countries-states.json" assert {type: "json"};

exports.getStatesList = async (res) => {
  // const { countryId  = 101;

  const StatesData = await countriesList.findOne(
    { id: 101 },
    {
      id: 1,
      name: 1,
      phone_code: 1,
      currency: 1,
      currency_symbol: 1,
      //   "timezones.zoneName": 1,
      //   "timezones.gmtOffset": 1,
      //   "timezones.gmtOffsetName": 1,
      //   latitude: 1,
      //   longitude: 1,
      //   emoji: 1,
      //   emojiU: 1,
      //   states: 1
      "states.id": 1,
      "states.name": 1,
      //   "states.latitude": 1,
      //   "states.longitude": 1,
      "states.cities.id": 1,
      "states.cities.name": 1,
      //   "states.cities.latitude": 1,
      //   "states.cities.longitude": 1,
    }
  );
  var element;
  var result=[]
  var city
  var cities=[]
  for (let index = 0; index < StatesData.states.length; index++) {
    element = StatesData.states[index].name;
    city= StatesData.states[index].cities
    result.push(element)
  }
for (let index = 0; index < city.length; index++) {
  const elem= city[index].name;
  cities.push(elem)
}
  res.render('registers',{layout:'index', result,cities})
  //  res.json({
  //   status: 200,
  //   message: "State and City List Fetch Successfully.",
  //   response:result ,
  // });
};
