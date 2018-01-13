/*
 * PsychrometricsJS
 * Author
 * Julien de Charentenay
 *
 * Released under the MIT License.
 *
 * v x.x.x
 */

var PsychrometricsJS = PsychrometricsJS || {};

PsychrometricsJS.major_version = 0;
PsychrometricsJS.minor_version = 0;
PsychrometricsJS.author = "Julien de Charentenay";
PsychrometricsJS.copyright = "Copyright 2017, Julien de Charentenay";
PsychrometricsJS.license = "Library license under TBA";
PsychrometricsJS.website = "http://www.tba.com";

// Gas constant for dry-air
PsychrometricsJS.RDA = 287.042; // J/kgda.K

// Gas constant for water
PsychrometricsJS.RW = 461.524; // J/kgw.K

// Gravity constant
PsychrometricsJS.G = 9.80665; // m/s2

PsychrometricsJS.Units = {};

/**
 * Length
 */
PsychrometricsJS.Units.METER = "Meter";

PsychrometricsJS.Length = function(value, unit) {
  if (window === this) { return new PsychrometricsJS.Length(value, unit); }
  this.value = null;
  switch(unit) {
    case PsychrometricsJS.Units.METER:
      this.from_meter(value);
      break;
    default:
      throw "Length unit " + unit + " not supported";
  }
  return this;
};

PsychrometricsJS.Length.prototype.from_meter = function(value) { this.value = value; };
PsychrometricsJS.Length.prototype.to_meter = function(value) { return this.value; };

/**
 * Pressure
 */
PsychrometricsJS.Units.PASCAL = "Pascal";
PsychrometricsJS.Units.KILOPASCAL = "kilo-Pascal";

PsychrometricsJS.Pressure = function(value, unit) {
  if (window === this) { return new PsychrometricsJS.Pressure(value, unit); }
  this.value = null;
  switch(unit) {
    case PsychrometricsJS.Units.PASCAL:
      this.from_pascal(value);
      break;
    case PsychrometricsJS.Units.KILOPASCAL:
      this.from_kilopascal(value);
      break;
    default:
      throw "Pressure unit " + unit + " not supported";
  }
  return this;
};

PsychrometricsJS.Pressure.prototype.from_pascal = function(value) { this.value = value; }
PsychrometricsJS.Pressure.prototype.to_pascal = function(value) { return this.value; }

PsychrometricsJS.Pressure.prototype.from_kilopascal = function(value) { this.value = value*1e3; }
PsychrometricsJS.Pressure.prototype.to_kilopascal = function(value) { return this.value/1e3; }

/**
 * Temperature 
 */
PsychrometricsJS.Units.CELSIUS = "Celsius";
PsychrometricsJS.Units.KELVIN = "Kelvin";
PsychrometricsJS.Units.FAHRENHEIT = "Fahrenheit";

PsychrometricsJS.Temperature = function(value, unit) {
  if (window === this) { return new PsychrometricsJS.Temperature(value, unit); }
  this.value = null;
  switch (unit) {
    case PsychrometricsJS.Units.CELSIUS:
      this.from_celsius(value);
      break;
    case PsychrometricsJS.Units.KELVIN:
      this.from_kelvin(value);
      break;
    case PsychrometricsJS.Units.FAHRENHEIT:
      this.from_fahrenheit(value);
      break;
    default:
      throw "Temperature unit " + unit + " not supported";
  }
  return this;
};

PsychrometricsJS.Temperature.prototype.from_celsius = function(value) { this.value = value; };
PsychrometricsJS.Temperature.prototype.to_celsius = function(value) { return this.value; };

PsychrometricsJS.Temperature.prototype.from_kelvin = function(value) { this.value = value - 273.15; };
PsychrometricsJS.Temperature.prototype.to_kelvin = function(value) { return this.value + 273.15; };

PsychrometricsJS.Temperature.prototype.from_fahrenheit = function(value) { this.value = (value - 32.0) * 5.0/9.0; };
PsychrometricsJS.Temperature.prototype.to_fahrenheit = function(value) { return 9.0/5.0 * this.value + 32.0; };

/**
 * Functions
 */

PsychrometricsJS.Functions = {};

/**
 * Calculate Water vapor saturation pressure over ice and liquid water
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (5) and (6)
 *
 * Input:
 *   t: temperature in Celsius
 * return 
 *   p: in pascal
 */
PsychrometricsJS.Functions.getWaterVaporSaturationPressure = function(t) {
  if ((t < -100.0) || (t > 200.0)) {
    throw "Water vaport saturation pressure only valid for temperature between -100.0 and +200.0 Celsius. Temperature provided is: " + t;
  }

  // Constants for -100 to 0 (over ice)
  var c1 = -5.6745359e+03;
  var c2 = 6.3925247;
  var c3 = -9.6778430e-3;
  var c4 = 6.2215701e-7;
  var c5 = 2.0747825e-09
  var c6 = -9.4840240e-13
  var c7 = 4.1635019e00
  // Constants for 0 to 200 (over liquid)
  var c8 = -5.8002206e3;
  var c9 = 1.3914993;
  var c10 = -4.8640239e-2;
  var c11 = 4.1764768e-5;
  var c12 = -1.4452093e-8;
  var c13 = 6.5459673e0;

  var tk = new PsychrometricsJS.Temperature(t, PsychrometricsJS.Units.CELSIUS).to_kelvin();
  var p = (t < 0.0) ? Math.pow(Math.E, c1/tk + c2 + c3*tk + c4*Math.pow(tk,2) + c5*Math.pow(tk,3) + c6*Math.pow(tk,4) + c7*Math.log(tk)) : Math.pow(Math.E, c8/tk + c9 + c10*tk + c11*Math.pow(tk,2) + c12*Math.pow(tk,3) + c13*Math.log(tk));
  return p;
};

/**
 * Calculate humidity rato
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (22/23)
 *
 * Input:
 *   p: air pressure in Pa
 *   pw: water vapor pressure in Pa
 * return 
 *   W: in kg water / kg dry-air
 */
PsychrometricsJS.Functions.getHumidityRatio = function(p, pw) {
  return 0.621945*pw/(p-pw);
};

PsychrometricsJS.getStandardAtmPressure = function(z) {
  return new PsychrometricsJS.Pressure(101.325*Math.pow(1.0-2.25577e-5*z.to_meter(),5.2559), PsychrometricsJS.Units.KILOPASCAL); // kPa
};

PsychrometricsJS.getStandardAtmTemperature = function(z) {
  return new PsychrometricsJS.Temperature(15 - 0.0065*z.to_meter(), PsychrometricsJS.Units.CELSIUS); // C
};

// Define a state
PsychrometricsJS.Variables = {
  DBT: "dry-bulb temperature",
  DPT: "dew-point temperature",
  WBT: "wet-bulb temperature",
  RH: "relative humidity",
  H: "Enthalpy",
  HR: "Humidity ratio",
  P: "Pressure"
};

PsychrometricsJS.State = function(hash) {
  if (window === this) {
    return new PsychrometricsJS.State(hash);
  }
  if (! hash.hasOwnProperty(PsychrometricsJS.Variables.P)) { throw "Specify pressure"; }

  this.dbt = null;
  // this.enthalpy = null;
  this.wbt = null;
  this.p = null;
  if (hash.hasOwnProperty(PsychrometricsJS.Variables.DBT)
      && hash.hasOwnProperty(PsychrometricsJS.Variables.WBT)) {
    this.from_dbtwbt(hash[PsychrometricsJS.Variables.DBT],
                     hash[PsychrometricsJS.Variables.WBT],
                     hash[PsychrometricsJS.Variables.P]);
  } else {
    throw "State specification is incomplete or not supported";
  }

  return this;
};

PsychrometricsJS.State.prototype.from_dbtwbt = function(dbt, wbt, p) {
  this.dbt = dbt;
  this.wbt = wbt;
  this.p = p;
};

PsychrometricsJS.State.prototype.from_dbtwbt2 = function(dbt, wbt, p) {
  var pws_star = PsychrometricsJS.getWaterVaporSaturationPressure(wbt);
  var ws_star = PsychrometricsJS.getHumidityRatio(p, pws_star);
  var w = (dbt.to_celsius() < 0) ? ((2830.0 - 0.24*wbt.to_celsius())*ws_star - 1.006*(dbt.to_celsius() - wbt.to_celsius()))/(2830.0+1.86*dbt.to_celsius()-2.1*wbt.to_celsius()) : ((2501 - 2.326*wbt.to_celsius())*ws_star - 1.006*(dbt.to_celsius()-wbt.to_celsius()))/(2501.0+1.86*dbt.to_celsius()-4.186*wbt.to_celsius());

  var pws = PsychrometricsJS.getWaterVaporSaturationPressure(dbt);
  var ws = PsychrometricsJS.getHumidityRatio(p, pws);
  var mu = ws/ws_star;
  var rh = mu / (1.0 - (1.0 - mu)*(pws.to_pascal()/p.to_pascal()));
  var specificVolume = 0.287042*dbt.to_kelvin()*(1.0 + 1.607858*w)/p.to_kilopascal(); // m3/kg_da
  var enthalpy = 1.006*dbt.to_celsius() + w*(2501.0 + 1.86*dbt.to_celsius());
  var pw = p.to_pascal()*w/(0.621945+w);
  var alpha = Math.log(pw);
  var dpt = 6.54+14.526*(alpha+0.7389*(alpha+0.7389*(alpha+0.09486*alpha)))+0.4569*Math(pw, 0.1984);
  dpt = (dpt >= 0.0) ? dpt : 6.09 + 12.608*(alpha + 0.4959*alpha);
  dpt = PsychrometricsJS.Temperature(dpt, PsychrometricsJS.Units.CELSIUS);

  this.dbt = dbt;
  this.enthalpy = enthalpy;
  this.p = p;
};

/**
 * Calculate dew-point temperature for state
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (39/40)
 *
 * return 
 *   dpt: temperature
 */
PsychrometricsJS.State.prototype.getDewPointTemperature = function() {
  var w = this.getHumidityRatio();
  var pw = this.p.to_kilopascal()*w/(0.621945+w);
  var alpha = Math.log(pw);
  var c14 = 6.54;
  var c15 = 14.526;
  var c16 = 0.7389;
  var c17 = 0.09486;
  var c18 = 0.4569;
  var dpt = c14+alpha*(c15+alpha*(c16+alpha*c17))+c18*Math.pow(pw, 0.1984);
  dpt = (dpt >= 0.0) ? dpt : 6.09 + alpha*(12.608 + 0.4959*alpha);
  return new PsychrometricsJS.Temperature(dpt, PsychrometricsJS.Units.CELSIUS);
};

PsychrometricsJS.State.prototype.getDryBulbTemperature = function() {
  return this.dbt;
};

/**
 * Calculate humidity rato for state
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (32)
 *
 * return 
 *   h: in kJ / kg dry-air
 */
PsychrometricsJS.State.prototype.getEnthalpy = function() {
  var w = this.getHumidityRatio();
  return 1.006*this.dbt.to_celsius() + w*(2501.0 + 1.86*this.dbt.to_celsius());
};

PsychrometricsJS.State.prototype.getWetBulbTemperature = function() {
  return this.wbt;
};

/**
 * Calculate humidity rato for state
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (35/36)
 *
 * return 
 *   W: in kg water / kg dry-air
 */
PsychrometricsJS.State.prototype.getHumidityRatio = function() {
  var pws_star = PsychrometricsJS.Functions.getWaterVaporSaturationPressure(this.wbt.to_celsius());
  var ws_star = PsychrometricsJS.Functions.getHumidityRatio(this.p.to_pascal(), pws_star);
  if (this.dbt.to_celsius() >= 0.0) {
    return ((2501.0 - 2.326*this.wbt.to_celsius())*ws_star - 1.006*(this.dbt.to_celsius()-this.wbt.to_celsius()))/(2501.0+1.86*this.dbt.to_celsius()-4.186*this.wbt.to_celsius());
  } else {
    return ((2830.0 - 0.24*this.wbt.to_celsius())*ws_star - 1.006*(this.dbt.to_celsius() - this.wbt.to_celsius()))/(2830.0+1.86*this.dbt.to_celsius()-2.1*this.wbt.to_celsius());
  }
};

/**
 * Calculate relative humidity from wet-bulb and dry-bulb temperature
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (5), (6), (22), (23), (12), (25)
 *
 * return 
 *   relative humidity: between 0 and 1
 */
PsychrometricsJS.State.prototype.getRelativeHumidity = function() {
  var w = this.getHumidityRatio();
  var pws = PsychrometricsJS.Functions.getWaterVaporSaturationPressure(this.dbt.to_celsius());      // eq (5) and (6)
  var ws = PsychrometricsJS.Functions.getHumidityRatio(this.p.to_pascal(), pws);                    // eq (22)
  var mu = w/ws;                                                                                    // eq (12)
  return mu / (1.0 - (1.0 - mu)*(pws/this.p.to_pascal()));                                          // eq (25)
};

/**
PsychrometricsJS.State.prototype.getDewPointTemperature = function() {
  var w = this.getHumidityRatio();
  var pw = this.p.to_pascal()*w/(0.621945+w);
  var alpha = Math.log(pw);
  var dpt = 6.54+14.526*(alpha+0.7389*(alpha+0.7389*(alpha+0.09486*alpha)))+0.4569*Math(pw, 0.1984);
  dpt = (dpt >= 0.0) ? dpt : 6.09 + 12.608*(alpha + 0.4959*alpha);
  return new PsychrometricsJS.Temperature(dpt, PsychrometricsJS.Units.CELSIUS);
};
*/
