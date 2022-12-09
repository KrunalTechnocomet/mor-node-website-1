const mongoose =require("mongoose");
const { v4:uuid } =require("uuid");

const { Schema } = mongoose;

const CitiesList = new Schema({
  id: Number,
  name: String,
  latitude: String,
  longitude: String,
});
const StatesList = new Schema({
  id: Number,
  name: String,
  state_code: String,
  latitude: String,
  longitude: String,
  type: String,
  cities: [CitiesList],
});
const timeZoneList = new Schema({
  zoneName: String,
  gmtOffset: String,
  gmtOffsetName: String,
  abbreviation: String,
  tzName: String,
});

const CountriesList = new Schema({
  id: Number,
  name: String,
  iso3: String,
  iso2: String,
  numeric_code: String,
  phone_code: String,
  capital: String,
  currency: String,
  currency_name: String,
  currency_symbol: String,
  tld: String,
  native: String,
  region: String,
  subregion: String,
  timezones: [timeZoneList],
  latitude: String,
  longitude: String,
  emoji: String,
  emojiU: String,
  states: [StatesList],
});

module.exports=  mongoose.model("countriesList", CountriesList);
