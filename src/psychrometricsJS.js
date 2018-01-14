/*
 * PsychrometricsJS
 * Author
 * Julien de Charentenay
 *
 * Licensed under MIT license
 *
 * v x.x.x
 */

var PsychrometricsJS = PsychrometricsJS || {};

PsychrometricsJS.major_version = 0;
PsychrometricsJS.minor_version = 0;
PsychrometricsJS.author = "Julien de Charentenay";
PsychrometricsJS.copyright = "Copyright 2018, Julien de Charentenay";
PsychrometricsJS.license = "Licensed under MIT License";
PsychrometricsJS.website = "http://juliendecharentenay.wordpress.com";

PsychrometricsJS.TMIN = -100.0;
PsychrometricsJS.TMAX = 200.0;

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
 * SI Functions
 */

PsychrometricsJS.SI = {};

PsychrometricsJS.SI.RDA = 287.042; // Gas constant for dry-air, J/kgda.K
PsychrometricsJS.SI.RW = 461.524;  // Gas constant for water, J/kgw.K
PsychrometricsJS.SI.G = 9.80665;   // Gravity constant, m/s2

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
PsychrometricsJS.SI.getWaterVaporSaturationPressure = function(t) {
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
PsychrometricsJS.SI.getHumidityRatio = function(p, pw) {
  return 0.621945*pw/(p-pw);
};

/**
 * Calculate humidity rato from dry-bulb, wet-bulb temperature and pressure
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (35/36)
 *
 * input:
 *  dbt: dry-bulb temperature (C)
 *  wbt: wet-bulb temperature (C)
 *  p: pressure (Pa)
 * return 
 *   W: in kg water / kg dry-air
 */
PsychrometricsJS.SI.getHumidityRatioFromDbtWbt = function(dbt, wbt, p) {
  var pws_star = PsychrometricsJS.SI.getWaterVaporSaturationPressure(wbt);
  var ws_star = PsychrometricsJS.SI.getHumidityRatio(p, pws_star);
  var w = null;
  if (dbt >= 0.0) {
    w = ((2501.0 - 2.326*wbt)*ws_star - 1.006*(dbt-wbt))/(2501.0+1.86*dbt-4.186*wbt);
  } else {
    w = ((2830.0 - 0.24*wbt)*ws_star - 1.006*(dbt-wbt))/(2830.0+1.86*dbt-2.1*wbt);
  }
  return (w >= 1e-5) ? w : 1e-5;
};

/**
 * Calculate relative humidity from wet-bulb and dry-bulb temperature
 * Uses ASHRAE Handbook Fundamentals 2013 
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  wbt: wet-bulb temperature (C)
 *  p: pressure (Pa)
 * return:
 *   relative humidity: between 0 and 1
 */
PsychrometricsJS.SI.getRelativeHumidityFromDbtWbt = function(dbt, wbt, p) {
  var w = PyschrometricsJS.SI.getHumidityRatioFromDbtWbt(dbt, wbt, p); 
  return PsychrometricsJS.SI.getRelativeHumidityFromDbtW(dbt, w, p);
};

/**
 * Calculate relative humidity from dry-bulb temperature and humidity ratio
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (5), (6), (22), (23), (12), (25)
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  w: humidity ratio (kg/kgda)
 *  p: pressure (Pa)
 * return:
 *   relative humidity: between 0 and 1
 */
PsychrometricsJS.SI.getRelativeHumidityFromDbtW = function(dbt, w, p) {
  var pws = PsychrometricsJS.SI.getWaterVaporSaturationPressure(dbt);  // eq (5) and (6)
  var ws = PsychrometricsJS.SI.getHumidityRatio(p, pws);               // eq (22)
  var mu = w/ws;                                                       // eq (12)
  return mu / (1.0 - (1.0 - mu)*(pws/p));                              // eq (25)
};

/**
 * Calculate dew-point temperature from humidity ratio and pressure
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psychrometrics: Equations (39/40)
 *
 * Input:
 *  w: humidity ratio (kg/kgda)
 *  p: pressure (Pa)
 * return 
 *  dpt: temperature (C)
 */
PsychrometricsJS.SI.getDewPointTemperature = function(w, p) {
  var pw = p/1000.0*w/(0.621945+w);
  var alpha = Math.log(pw);
  var c14 = 6.54;
  var c15 = 14.526;
  var c16 = 0.7389;
  var c17 = 0.09486;
  var c18 = 0.4569;
  var dpt = c14+alpha*(c15+alpha*(c16+alpha*c17))+c18*Math.pow(pw, 0.1984);
  dpt = (dpt >= 0.0) ? dpt : 6.09 + alpha*(12.608 + 0.4959*alpha);
  return dpt
};

/**
 * Calculate enthalpy from dry-bulb temperature and humidity ratio
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (32)
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  w: humidity ratio (kg/kgda)
 * return 
 *   h: enthalpy (kJ/kgda)
 */
PsychrometricsJS.SI.getEnthalpy = function(dbt, w) {
  return 1.006*dbt + w*(2501.0 + 1.86*dbt);
};

/**
 * Numerical Solver: Using bisection method
 */
PsychrometricsJS.solveBisection = function(vmin, vmax, target, err, func) {
  var fmin = func(vmin); var fmax = func(vmax);
  if ((target - fmin)*(target-fmax) > 0) { throw "Bisection solver error: target value " + target + " is not within interval vmin|vmax. Function may not be monotonous"; }
  if (Math.abs(fmin - target) <= err) { return vmin; }
  if (Math.abs(fmax - target) <= err) { return vmax; }

  var v = 0.5*(vmin+vmax); var f = func(v);
  while (Math.abs(f-target)>err) {
    if ((target-f)*(target-fmin) < 0) { // Target is between vmin and v. Update vmax/fmax
      vmax = v; fmax = f;
    } else if ((target-f)*(target-fmax) < 0) { // Target is between v and vmax. Update vmin/fmin
      vmin = v; fmin = f;
    } else {
      throw "Bisection solver error: Can find updated interval";
    }
    v = 0.5*(vmin+vmax); f = func(v);
  };
  return v;
};


/**
 * Standard conditions
 */
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
  W: "Humidity ratio",
  P: "Pressure"
};

PsychrometricsJS.State = function(hash) {
  if (window === this) {
    return new PsychrometricsJS.State(hash);
  }
  if (! hash.hasOwnProperty(PsychrometricsJS.Variables.P)) { throw "Specify pressure"; }

  // Core variables
  this.dbt = null;
  this.wbt = null;
  this.p = null;

  // Derived variables
  this.dpt = null;
  this.h = null;
  this.w = null;
  this.rh = null;

  if (hash.hasOwnProperty(PsychrometricsJS.Variables.DBT)) {
    if (hash.hasOwnProperty(PsychrometricsJS.Variables.WBT)) {
      this.from_dbtwbt(hash[PsychrometricsJS.Variables.DBT], hash[PsychrometricsJS.Variables.WBT], hash[PsychrometricsJS.Variables.P]);

    } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.DPT)) {
      this.from_dbtdpt(hash[PsychrometricsJS.Variables.DBT], hash[PsychrometricsJS.Variables.DPT], hash[PsychrometricsJS.Variables.P]);
    }
  }

  // Check that core variables are specified
  if ((this.dbt == null) || (this.wbt == null)) {
    throw "State specification is incomplete or not supported";
  }

  return this;
};

PsychrometricsJS.State.prototype.from_dbtwbt = function(dbt, wbt, p) {
  this.dbt = dbt;
  this.wbt = wbt;
  this.p = p;
};

PsychrometricsJS.State.prototype.from_dbtdpt = function(dbt, dpt, p) {
  this.dbt = dbt;
  this.dpt = dpt;
  this.p = p;
  var wbt = PsychrometricsJS.solveBisection(PsychrometricsJS.TMIN, this.dbt.to_celsius(), this.dpt.to_celsius(), 1e-4,
                        function(wbt) {
                          var w = PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(this.dbt, wbt, this.p);
                          return PsychrometricsJS.SI.getDewPointTemperature(w, this.p);
                        }.bind({'dbt': this.dbt.to_celsius(), 'p': this.p.to_pascal()}));
  this.wbt = new PsychrometricsJS.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
};


PsychrometricsJS.State.prototype.getDewPointTemperature = function() {
  if (this.dpt == null) {
    var dpt = PsychrometricsJS.SI.getDewPointTemperature(this.getHumidityRatio(), this.p.to_pascal());
    this.dpt = new PsychrometricsJS.Temperature(dpt, PsychrometricsJS.Units.CELSIUS);
  }
  return this.dpt;
};

PsychrometricsJS.State.prototype.getDryBulbTemperature = function() {
  return this.dbt;
};

PsychrometricsJS.State.prototype.getEnthalpy = function() {
  if (this.h == null) {
    var h = PsychrometricsJS.SI.getEnthalpy(this.dbt.to_celsius(), this.getHumidityRatio());
    this.h = h;
  }
  return this.h;
};

PsychrometricsJS.State.prototype.getWetBulbTemperature = function() {
  return this.wbt;
};

PsychrometricsJS.State.prototype.getHumidityRatio = function() {
  if (this.w == null) {
    var w = PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(this.dbt.to_celsius(), this.wbt.to_celsius(), this.p.to_pascal());
    this.w = w;
  }
  return this.w;
};

PsychrometricsJS.State.prototype.getRelativeHumidity = function() {
  if (this.rh == null) {
    var rh = PsychrometricsJS.SI.getRelativeHumidityFromDbtW(this.dbt.to_celsius(), this.getHumidityRatio(), this.p.to_pascal());
    this.rh = rh;
  }
  return this.rh;
};

