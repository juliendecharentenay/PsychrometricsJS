/*
 * PsychrometricsJS
 * Copyright 2018, Julien de Charentenay
 *
 * Licensed under MIT license
 *
 * v x.x
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
PsychrometricsJS.WMIN = 1e-8;

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
    case PsychrometricsJS.Units.METER:
        this.from_length(new PsychrometricsJS.Length(value, PsychrometricsJS.Units.METER));
        break;
    default:
      throw "Pressure unit " + unit + " not supported";
  }
  return this;
};

PsychrometricsJS.Pressure.prototype.from_pascal = function(value) { this.value = value; }
PsychrometricsJS.Pressure.prototype.to_pascal = function() { return this.value; }

PsychrometricsJS.Pressure.prototype.from_kilopascal = function(value) { this.value = value*1e3; }
PsychrometricsJS.Pressure.prototype.to_kilopascal = function() { return this.value/1e3; }

PsychrometricsJS.Pressure.prototype.from_length = function(value) { this.value = 101325.0*Math.pow(1.0-2.25577e-5*value.to_meter(),5.2559); }
PsychrometricsJS.Pressure.prototype.to_length = function() { 
	return new PsychrometricsJS.Length((1.0-Math.pow(this.value/101325.0,1.0/5.2559))/2.25577e-5, PsychrometricsJS.Units.METER);
}

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
 * Humidity ratio
 */
PsychrometricsJS.Units.KGKGDA = "kg/kg dry-air";
PsychrometricsJS.HumidityRatio = function(value, unit) {
  if (window === this) { return new PsychrometricsJS.HumidityRatio(value, unit); }
  this.value = null;
  switch (unit) {
    case PsychrometricsJS.Units.KGKGDA:
      this.from_kgkgda(value);
      break;
    default:
      throw "Humidity ratio unit " + unit + " is not supported";
  }
  return this;
};

PsychrometricsJS.HumidityRatio.prototype.from_kgkgda = function(value) { this.value = value; }
PsychrometricsJS.HumidityRatio.prototype.to_kgkgda = function(value) { return this.value; }

/**
 * Relative humidity
 */
PsychrometricsJS.Units.ZEROTOONE = "Zero-to-one";
PsychrometricsJS.Units.PERCENTAGE = "Percentage";
PsychrometricsJS.RelativeHumidity = function(value, unit) {
  if (window === this) { return new PsychrometricsJS.RelativeHumidity(value, unit); }
  this.value = null;
  switch (unit) {
    case PsychrometricsJS.Units.ZEROTOONE:
      this.from_zerotoone(value);
      break;
    case PsychrometricsJS.Units.PERCENTAGE:
      this.from_percentage(value);
      break;
    default:
      throw "Relative humidity unit " + unit + " is not supported";
  }
  return this;
};

PsychrometricsJS.RelativeHumidity.prototype.from_zerotoone = function(value) { this.value = value; }
PsychrometricsJS.RelativeHumidity.prototype.to_zerotoone = function(value) { return this.value; }

PsychrometricsJS.RelativeHumidity.prototype.from_percentage = function(value) { this.value = value/100.0; }
PsychrometricsJS.RelativeHumidity.prototype.to_percentage = function(value) { return this.value * 100.0; }

/**
 * Enthalpy
 */
PsychrometricsJS.Units.KJKGDA = "kJ/kg dry-air";
PsychrometricsJS.Enthalpy = function(value, unit) {
  if (window === this) { return new PsychrometricsJS.Enthalpy(value, unit); }
  this.value = null;
  switch(unit) {
    case PsychrometricsJS.Units.KJKGDA:
      this.from_kjkgda(value);
      break;
    default:
      throw "Enthalpy unit " + unit + " is not supported";
  }
  return this;
};

PsychrometricsJS.Enthalpy.prototype.from_kjkgda = function(value) { this.value = value; }
PsychrometricsJS.Enthalpy.prototype.to_kjkgda = function(value) { return this.value; }

/**
 * Density
 */
PsychrometricsJS.Units.KGM3 = "kg/m3";
PsychrometricsJS.Density = function(value, unit) {
  if (window === this) { return new PsychrometricsJS.Density(value, unit); }
  this.value = null;
  switch (unit) {
    case PsychrometricsJS.Units.KGM3:
      this.from_kgm3(value);
      break;
    default:
      throw "Density unit " + unit + " is not supported";
  }
  return this;
};

PsychrometricsJS.Density.prototype.from_kgm3 = function(value) { this.value = value; }
PsychrometricsJS.Density.prototype.to_kgm3 = function(value) { return this.value; }

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
    throw "Water vapor saturation pressure only valid for temperature between -100.0 and +200.0 Celsius. Temperature provided is: " + t;
  }

  // Constants for -100 to 0 (over ice)
  var c1 = -5.6745359e+03;
  var c2 = 6.3925247;
  var c3 = -9.6778430e-3;
  var c4 = 6.2215701e-7;
  var c5 = 2.0747825e-09;
  var c6 = -9.4840240e-13;
  var c7 = 4.1635019e00;
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
  return (w >= PsychrometricsJS.WMIN) ? w : PsychrometricsJS.WMIN;
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
  var w = PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(dbt, wbt, p); 
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
  return dpt;
};

/**
 * Calculate humidity ratio from dew-point temperature ratio and pressure
 * Uses the characteristic that at dew-point, the dew-point temperature is the 
 * same as the wet-bulb and dry-bulb temperature.
 *
 * Input:
 *  dpt: temperature (C)
 *  p: pressure (Pa)
 * return 
 *  w: humidity ratio (kg/kgda)
 */
PsychrometricsJS.SI.getHumidityRatioFromDpt = function(dpt, p) {
  return PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(dpt, dpt, p);
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
 *  h: enthalpy (kJ/kgda)
 */
PsychrometricsJS.SI.getEnthalpy = function(dbt, w) {
  return 1.006*dbt + w*(2501.0 + 1.86*dbt);
};

/**
 * Calculate dry-bulb temperature from humidity ratio and enthalpy
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (32)
 *
 * Input:
 *  h: enthalpy (kJ/kgda)
 *  w: humidity ratio (kg/kgda)
 * return 
 *  dbt: dry-bulb temperature (C)
 */
PsychrometricsJS.SI.getDryBulbTemperatureFromHW = function(h, w) {
  return (h - w*2501.0)/(1.006 + w*1.86);
};

/**
 * Calculate humidity ratio from dry-bulb temperature and enthalpy
 * Uses ASHRAE Handbook Fundamentals 2013 
 * Chapter 1 Psycrhometrics: Equations (32)
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  h: enthalpy (kJ/kgda)
 * return 
 *  w: humidity ratio (kg/kgda)
 */
PsychrometricsJS.SI.getHumidityRatioFromDbtH = function(dbt, h) {
  return (h - 1.006*dbt)/(2501.0 + 1.86*dbt);
};

/**
 * Calculate wet-bulb temperature from dry-bulb temperature, humidity ratio and pressure
 * Uses numerical solver
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  w: humidity ratio (kg/kgda)
 *  p: pressure (Pa)
 * return 
 *  wbt: wet-bulb temperature (C)
 */
PsychrometricsJS.SI.getWetBulbTemperatureFromDbtWP = function(dbt, w, p) {
  return PsychrometricsJS.solveBisection(PsychrometricsJS.TMIN, dbt, w, 1e-8,
                        function(wbt) {
                          return PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(this.dbt, wbt, this.p);
                        }.bind({'dbt': dbt, 'p': p}));
};

/**
 * Calculate dry-bulb temperature from wet-bulb temperature, relative humidity and pressure
 * Uses numerical solver
 *
 * Input:
 *  wbt: wet-bulb temperature (C)
 *  rh: relative humidity (0-1)
 *  p: pressure (Pa)
 * return 
 *  dbt: dry-bulb temperature (C)
 */
PsychrometricsJS.SI.getDryBulbTemperatureFromWbtRhP = function(wbt, rh, p) {
  return PsychrometricsJS.solveGradient(PsychrometricsJS.TMIN, PsychrometricsJS.TMAX, wbt, rh, 0.1, 1e-8,
                        function(dbt) {
                          return PsychrometricsJS.SI.getRelativeHumidityFromDbtWbt(dbt, this.wbt, this.p);
                        }.bind({'wbt': wbt, 'p': p}));
};

/**
 * Calculate wet-bulb temperature from dry-bulb temperature, relative humidity and pressure
 * Uses numerical solver
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  rh: relative humidity (0-1)
 *  p: pressure (Pa)
 * return 
 *  wbt: wet-bulb temperature (C)
 */
PsychrometricsJS.SI.getWetBulbTemperatureFromDbtRhP = function(dbt, rh, p) {
  return PsychrometricsJS.solveBisection(PsychrometricsJS.TMIN, dbt, rh, 1e-8,
                        function(wbt) {
                          return PsychrometricsJS.SI.getRelativeHumidityFromDbtWbt(this.dbt, wbt, this.p);
                        }.bind({'dbt': dbt, 'p': p}));
};

/**
 * Numerical Solver: Using bisection method
 */
PsychrometricsJS.solveBisection = function(vmin, vmax, target, err, func) {
  var fmin = func(vmin); var fmax = func(vmax);
  if ((target - fmin)*(target-fmax) > 0) { throw "Bisection solver error: target value " + target + " is not within interval vmin|vmax [" + fmin + ";" + fmax + "]. Function may not be monotonous"; }
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
 * Numerical Solver: Using gradient method
 */
PsychrometricsJS.solveGradient = function(vmin, vmax, vInit, target, delta, err, func) {
  var v = vInit; var f = func(v); var it=0; var f1 = null; var alpha=0.3;
  while ((Math.abs(f-target)>err) && (it < 100)) {
    f1 = func(v+delta);
    if (Math.abs(f1-f)<1e-8) {throw "Gradient solver: Increase delta to get more meaningfull answer";}
    v = v + alpha*(target-f)/(f1-f)*delta;
    v = (v < vmin) ? vmin : ((v > vmax) ? vmax : v);
    f = func(v);
    ++it;
  }
  if (Math.abs(f-target)>err) {throw "Failed to converge gradient solver";}
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

/**
 * Factory methods to generate Psychrometrics state
 */
PsychrometricsJS.Factory = {};
PsychrometricsJS.Factory.SI = {};

/**
 * Make psychrometrics state from dry-bulb, wet-bulb temperature and pressure
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  wbt: wet-bulb temperature (C)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeDbtWbtP = function(dbt, wbt, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.DBT] = new Psychrometrics.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.WBT] = new Psychrometrics.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from dry-bulb, dew-point temperature and pressure
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  dpt: dew-point temperature (C)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeDbtDptP = function(dbt, dpt, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.DBT] = new Psychrometrics.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.DPT] = new Psychrometrics.Temperature(dpt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from dry-bulb temperature, relative humidity and pressure
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  rh: relative humidity (0 to 1)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeDbtRHP = function(dbt, rh, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.DBT] = new Psychrometrics.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.RH] = new Psychrometrics.RelativeHumidity(rh, PsychrometricsJS.Units.ZEROTOONE);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from dry-bulb temperature, enthalpy and pressure
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  h: enthalpy (kj/kgda)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeDbtHP = function(dbt, h, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.DBT] = new Psychrometrics.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.H] = new Psychrometrics.Enthalpy(h, PsychrometricsJS.Units.KJKGDA);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from dry-bulb temperature, humidity ratio and pressure
 *
 * Input:
 *  dbt: dry-bulb temperature (C)
 *  w: humidity ratio (kg/kgda)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeDbtWP = function(dbt, w, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.DBT] = new Psychrometrics.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.W] = new Psychrometrics.HumidityRatio(w, PsychrometricsJS.Units.KGKGDA);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from wet-bulb temperature, dew-point temperature and pressure
 *
 * Input:
 *  wbt: wet-bulb temperature (C)
 *  dpt: dew-point temperature (C)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeWbtDptP = function(wbt, dpt, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.WBT] = new Psychrometrics.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.DPT] = new Psychrometrics.Temperature(dpt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from wet-bulb temperature, relative humidity and pressure
 *
 * Input:
 *  wbt: wet-bulb temperature (C)
 *  rh: relative humidity (0 to 1)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeWbtRHP = function(wbt, rh, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.WBT] = new Psychrometrics.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.RH] = new Psychrometrics.RelativeHumidity(rh, PsychrometricsJS.Units.ZEROTOONE);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from wet-bulb temperature, humidity ratio and pressure
 *
 * Input:
 *  wbt: wet-bulb temperature (C)
 *  w: humidity ratio (kg/kgda)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeWbtWP = function(wbt, w, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.WBT] = new Psychrometrics.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.W] = new Psychrometrics.HumidityRatio(w, PsychrometricsJS.Units.KGKGDA);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from dew-point temperature, relative humidity and pressure
 *
 * Input:
 *  dpt: dew-point temperature (C)
 *  rh: relative humidity (0 to 1)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeDptRHP = function(dpt, rh, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.DPT] = new Psychrometrics.Temperature(dpt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.RH] = new Psychrometrics.RelativeHumidity(rh, PsychrometricsJS.Units.ZEROTOONE);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from dew-point temperature, enthalpy and pressure
 *
 * Input:
 *  dpt: dew-point temperature (C)
 *  h: enthalpy (kJ/kgda)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeDptHP = function(dpt, h, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.DPT] = new Psychrometrics.Temperature(dpt, PsychrometricsJS.Units.CELSIUS);
  hash[PsychrometricsJS.Variables.H] = new Psychrometrics.Enthalpy(h, PsychrometricsJS.Units.KJKGDA);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from relative humidity, enthalpy and pressure
 *
 * Input:
 *  rh: relative humidity (0 to 1)
 *  h: enthalpy (kJ/kgda)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeDptHP = function(dpt, h, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.RH] = new Psychrometrics.RelativeHumidity(rh, PsychrometricsJS.Units.ZEROTOONE);
  hash[PsychrometricsJS.Variables.H] = new Psychrometrics.Enthalpy(h, PsychrometricsJS.Units.KJKGDA);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from relative humidity, humidity ratio and pressure
 *
 * Input:
 *  rh: relative humidity (0 to 1)
 *  w: humidity ratio (kg/kgda)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeDptWP = function(dpt, w, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.RH] = new Psychrometrics.RelativeHumidity(rh, PsychrometricsJS.Units.ZEROTOONE);
  hash[PsychrometricsJS.Variables.W] = new Psychrometrics.HumidityRatio(w, PsychrometricsJS.Units.KGKGDA);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};

/**
 * Make psychrometrics state from enthalpy, humidity ratio and pressure
 *
 * Input:
 *  h: enthalpy (kJ/kgda)
 *  w: humidity ratio (kg/kgda)
 *  p: pressure (Pa)
 * Output:
 *  psychrometrics State object
 */
PsychrometricsJS.Factory.SI.makeHWP = function(h, w, p) {
  hash = {};
  hash[PsychrometricsJS.Variables.H] = new Psychrometrics.Enthalpy(h, PsychrometricsJS.Units.KJKGDA);
  hash[PsychrometricsJS.Variables.W] = new Psychrometrics.HumidityRatio(w, PsychrometricsJS.Units.KGKGDA);
  hash[PsychrometricsJS.Variables.P] = new Psychrometrics.Pressure(p, PsychrometricsJS.Units.PASCAL);
  return new PsychrometricsJS.State(hash);
};


// Define a state
PsychrometricsJS.Variables = {
  DBT: "dry-bulb temperature",
  WBT: "wet-bulb temperature",
  DPT: "dew-point temperature",
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

    } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.RH)) {
      this.from_dbtrh(hash[PsychrometricsJS.Variables.DBT], hash[PsychrometricsJS.Variables.RH], hash[PsychrometricsJS.Variables.P]);

    } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.H)) {
      this.from_dbth(hash[PsychrometricsJS.Variables.DBT], hash[PsychrometricsJS.Variables.H], hash[PsychrometricsJS.Variables.P]);

    } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.W)) {
      this.from_dbtw(hash[PsychrometricsJS.Variables.DBT], hash[PsychrometricsJS.Variables.W], hash[PsychrometricsJS.Variables.P]);
    }

  } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.WBT)) {
    if (hash.hasOwnProperty(PsychrometricsJS.Variables.DPT)) {
      this.from_wbtdpt(hash[PsychrometricsJS.Variables.WBT], hash[PsychrometricsJS.Variables.DPT], hash[PsychrometricsJS.Variables.P]);

    } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.RH)) {
      this.from_wbtrh(hash[PsychrometricsJS.Variables.WBT], hash[PsychrometricsJS.Variables.RH], hash[PsychrometricsJS.Variables.P]);

    } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.W)) {
      this.from_wbtw(hash[PsychrometricsJS.Variables.WBT], hash[PsychrometricsJS.Variables.W], hash[PsychrometricsJS.Variables.P]);
    }

  } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.DPT)) { 
    if (hash.hasOwnProperty(PsychrometricsJS.Variables.H)) {
      this.from_dpth(hash[PsychrometricsJS.Variables.DPT], hash[PsychrometricsJS.Variables.H], hash[PsychrometricsJS.Variables.P]);

    } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.RH)) {
      this.from_dptrh(hash[PsychrometricsJS.Variables.DPT], hash[PsychrometricsJS.Variables.RH], hash[PsychrometricsJS.Variables.P]);
    }

  } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.H)) { 
    if (hash.hasOwnProperty(PsychrometricsJS.Variables.W)) {
      this.from_hw(hash[PsychrometricsJS.Variables.H], hash[PsychrometricsJS.Variables.W], hash[PsychrometricsJS.Variables.P]);

    } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.RH)) {
      this.from_hrh(hash[PsychrometricsJS.Variables.H], hash[PsychrometricsJS.Variables.RH], hash[PsychrometricsJS.Variables.P]);
    }

  } else if (hash.hasOwnProperty(PsychrometricsJS.Variables.W)) { 
    if (hash.hasOwnProperty(PsychrometricsJS.Variables.RH)) {
      this.from_wrh(hash[PsychrometricsJS.Variables.W], hash[PsychrometricsJS.Variables.RH], hash[PsychrometricsJS.Variables.P]);
    }
  }

  // Check that core variables are specified
  if ((this.dbt == null) || (this.wbt == null)) {
    throw "State specification is incomplete or not supported";
  }

  return this;
};

PsychrometricsJS.State.prototype.from_dbtwbt = function(dbt, wbt, p) {
  this.dbt = dbt; this.wbt = wbt; this.p = p;
};

PsychrometricsJS.State.prototype.from_dbtdpt = function(dbt, dpt, p) {
  this.dbt = dbt; this.dpt = dpt; this.p = p;
  var wbt = PsychrometricsJS.solveBisection(PsychrometricsJS.TMIN, this.dbt.to_celsius(), this.dpt.to_celsius(), 1e-4,
                        function(wbt) {
                          var w = PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(this.dbt, wbt, this.p);
                          return PsychrometricsJS.SI.getDewPointTemperature(w, this.p);
                        }.bind({'dbt': this.dbt.to_celsius(), 'p': this.p.to_pascal()}));
  this.wbt = new PsychrometricsJS.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
};

PsychrometricsJS.State.prototype.from_dbtrh = function(dbt, rh, p) {
  this.dbt = dbt; this.rh = rh; this.p = p;
  var wbt = PsychrometricsJS.SI.getWetBulbTemperatureFromDbtRhP(this.dbt.to_celsius(), this.rh.to_zerotoone(), this.p.to_pascal());
  this.wbt = new PsychrometricsJS.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
};

PsychrometricsJS.State.prototype.from_dbth = function(dbt, h, p) {
  this.dbt = dbt; this.h = h; this.p = p; 
  var w = PsychrometricsJS.SI.getHumidityRatioFromDbtH(this.dbt.to_celsius(), this.h.to_kjkgda());
  this.w = new PsychrometricsJS.HumidityRatio(w, PsychrometricsJS.Units.KGKGDA);
  this.from_dbtw(this.dbt, this.w, this.p);
};

PsychrometricsJS.State.prototype.from_dbtw = function(dbt, w, p) {
  this.dbt = dbt; this.w = w; this.p = p;
  var wbt = PsychrometricsJS.SI.getWetBulbTemperatureFromDbtWP(this.dbt.to_celsius(), this.w.to_kgkgda(), this.p.to_pascal());
  this.wbt = new PsychrometricsJS.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
};

PsychrometricsJS.State.prototype.from_wbtdpt = function(wbt, dpt, p) {
  this.wbt = wbt; this.dpt = dpt; this.p = p;
  var dbt = PsychrometricsJS.solveGradient(PsychrometricsJS.TMIN, PsychrometricsJS.TMAX, this.wbt.to_celsius(), this.dpt.to_celsius(), 0.1, 1e-4,
                        function(dbt) {
                          var w = PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(dbt, this.wbt, this.p);
                          return PsychrometricsJS.SI.getDewPointTemperature(w, this.p);
                        }.bind({'wbt': this.wbt.to_celsius(), 'p': this.p.to_pascal()}));
  this.dbt = new PsychrometricsJS.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
};

PsychrometricsJS.State.prototype.from_wbtrh = function(wbt, rh, p) {
  this.wbt = wbt; this.rh = rh; this.p = p;
  var dbt = PsychrometricsJS.SI.getDryBulbTemperatureFromWbtRhP(this.wbt.to_celsius(), this.rh.to_zerotoone(), this.p.to_pascal());
  this.dbt = new PsychrometricsJS.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
};

/**
 * This could work, but enthalpy and wet-bulb line are too similar to be practical (or useful)
 *
PsychrometricsJS.State.prototype.from_wbth = function(wbt, h, p) {
  this.wbt = wbt; this.h = h; this.p = p; 
  var dbt = PsychrometricsJS.solveGradient(PsychrometricsJS.TMIN, PsychrometricsJS.TMAX, this.wbt.to_celsius(), this.h, 0.1, 1e-4,
                        function(dbt) {
                          var w = PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(dbt, this.wbt, this.p);
                          return PsychrometricsJS.SI.getEnthalpy(dbt, w);
                        }.bind({'wbt': this.wbt.to_celsius(), 'p': this.p.to_pascal()}));
  this.dbt = new PsychrometricsJS.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
};
*/

PsychrometricsJS.State.prototype.from_wbtw = function(wbt, w, p) {
  this.wbt = wbt; this.w = w; this.p = p;
  var dbt = PsychrometricsJS.solveGradient(PsychrometricsJS.TMIN, PsychrometricsJS.TMAX, this.wbt.to_celsius(), this.w.to_kgkgda(), 1.0, 1e-6,
                        function(dbt) {
                          return PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(dbt, this.wbt, this.p);
                        }.bind({'wbt': this.wbt.to_celsius(), 'p': this.p.to_pascal()}));
  this.dbt = new PsychrometricsJS.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
};

PsychrometricsJS.State.prototype.from_dpth = function(dpt, h, p) {
  this.dpt = dpt; this.h = h; this.p = p;
  var w = PsychrometricsJS.SI.getHumidityRatioFromDpt(this.dpt.to_celsius(), this.p.to_pascal());
  this.w = new PsychrometricsJS.HumidityRatio(w, PsychrometricsJS.Units.KGKGDA);

  var dbt = PsychrometricsJS.SI.getDryBulbTemperatureFromHW(this.h.to_kjkgda(), this.w.to_kgkgda()); // initial guess
  var wbt = PsychrometricsJS.SI.getWetBulbTemperatureFromDbtWP(dbt, this.w.to_kgkgda(), this.p.to_pascal());

  this.dbt = new PsychrometricsJS.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
  this.wbt = new PsychrometricsJS.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
};

PsychrometricsJS.State.prototype.from_dptrh = function(dpt, rh, p) {
  this.dpt = dpt;
  var w = PsychrometricsJS.SI.getHumidityRatioFromDpt(dpt.to_celsius(), p.to_pascal());
  this.w = new PsychrometricsJS.HumidityRatio(w, PsychrometricsJS.Units.KGKGDA);
  this.from_wrh(this.w, rh, p);
};

PsychrometricsJS.State.prototype.from_hw = function(h, w, p) {
  this.h = h; this.w = w; this.p = p;

  var dbt = PsychrometricsJS.SI.getDryBulbTemperatureFromHW(this.h.to_kjkgda(), this.w.to_kgkgda()); // initial guess
  var wbt = PsychrometricsJS.SI.getWetBulbTemperatureFromDbtWP(dbt, this.w.to_kgkgda(), this.p.to_pascal());

  this.dbt = new PsychrometricsJS.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
  this.wbt = new PsychrometricsJS.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
};

PsychrometricsJS.State.prototype.from_hrh = function(h, rh, p) {
  this.h = h; this.rh = rh; this.p = p;
  
  var dbt = null; var dbtp = null; var wbt = null; var wbtp = null; var w;
  var it = 0; var err = 1e-4;

  dbt = PsychrometricsJS.SI.getDryBulbTemperatureFromHW(this.h.to_kjkgda(), 2.0*PsychrometricsJS.WMIN); // initial guess with little moisture
  while ((dbtp == null) || (wbtp == null) || ((it < 100) && ((Math.abs(dbt-dbtp)>err) || (Math.abs(wbt-wbtp)>err)))) {
    dbtp = dbt; wbtp = wbt;
    w = PsychrometricsJS.SI.getHumidityRatioFromDbtH(dbt, this.h.to_kjkgda());
    wbt = PsychrometricsJS.SI.getWetBulbTemperatureFromDbtWP(dbt, w, this.p.to_pascal());
    dbt = PsychrometricsJS.SI.getDryBulbTemperatureFromWbtRhP(wbt, this.rh.to_zerotoone(), this.p.to_pascal());
    it ++;
  }
  if ((Math.abs(dbt-dbtp)>err) || (Math.abs(wbt-wbtp)>err)) { throw "Failed to converge marching algorithm..."; }

  this.dbt = new PsychrometricsJS.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
  this.wbt = new PsychrometricsJS.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
};

PsychrometricsJS.State.prototype.from_wrh = function(w, rh, p) {
  this.w = w; this.rh = rh; this.p = p;
  
  var dbt = null; var dbtp = null; var wbt = null; var wbtp = null;
  var it = 0; var err = 1e-4;

  wbt = PsychrometricsJS.SI.getDewPointTemperature(this.w.to_kgkgda(), this.p.to_pascal());  
  while ((dbtp == null) || (wbtp == null) || ((it < 100) && ((Math.abs(dbt-dbtp)>err) || (Math.abs(wbt-wbtp)>err)))) {
    dbtp = dbt; wbtp = wbt;
    dbt = PsychrometricsJS.SI.getDryBulbTemperatureFromWbtRhP(wbt, this.rh.to_zerotoone(), this.p.to_pascal());
    wbt = PsychrometricsJS.SI.getWetBulbTemperatureFromDbtWP(dbt, this.w.to_kgkgda(), this.p.to_pascal());
    it ++;
  }
  if ((Math.abs(dbt-dbtp)>err) || (Math.abs(wbt-wbtp)>err)) { throw "Failed to converge marching algorithm..."; }

  this.dbt = new PsychrometricsJS.Temperature(dbt, PsychrometricsJS.Units.CELSIUS);
  this.wbt = new PsychrometricsJS.Temperature(wbt, PsychrometricsJS.Units.CELSIUS);
};

/**
 * Accessor functions
 */
PsychrometricsJS.State.prototype.getDewPointTemperature = function() {
  if (this.dpt == null) {
    var dpt = PsychrometricsJS.SI.getDewPointTemperature(this.getHumidityRatio().to_kgkgda(), this.p.to_pascal());
    this.dpt = new PsychrometricsJS.Temperature(dpt, PsychrometricsJS.Units.CELSIUS);
  }
  return this.dpt;
};

PsychrometricsJS.State.prototype.getDryBulbTemperature = function() {
  return this.dbt;
};

PsychrometricsJS.State.prototype.getEnthalpy = function() {
  if (this.h == null) {
    var h = PsychrometricsJS.SI.getEnthalpy(this.dbt.to_celsius(), this.getHumidityRatio().to_kgkgda());
    this.h = new PsychrometricsJS.Enthalpy(h, PsychrometricsJS.Units.KJKGDA);
  }
  return this.h;
};

PsychrometricsJS.State.prototype.getWetBulbTemperature = function() {
  return this.wbt;
};

PsychrometricsJS.State.prototype.getHumidityRatio = function() {
  if (this.w == null) {
    var w = PsychrometricsJS.SI.getHumidityRatioFromDbtWbt(this.dbt.to_celsius(), this.wbt.to_celsius(), this.p.to_pascal());
    this.w = new PsychrometricsJS.HumidityRatio(w, PsychrometricsJS.Units.KGKGDA);
  }
  return this.w;
};

PsychrometricsJS.State.prototype.getRelativeHumidity = function() {
  if (this.rh == null) {
    var rh = PsychrometricsJS.SI.getRelativeHumidityFromDbtW(this.dbt.to_celsius(), this.getHumidityRatio().to_kgkgda(), this.p.to_pascal());
    this.rh = new PsychrometricsJS.RelativeHumidity(rh, PsychrometricsJS.Units.ZEROTOONE);
  }
  return this.rh;
};

PsychrometricsJS.State.prototype.getDensity = function() {
  var d = this.getDryAirDensity();
  return new PsychrometricsJS.Density(d.to_kgm3()*(1.0+this.getHumidityRatio().to_kgkgda()), PsychrometricsJS.Units.KGM3);
  
};

PsychrometricsJS.State.prototype.getDryAirDensity = function() {
  return new PsychrometricsJS.Density(1.0/(0.287042*this.dbt.to_kelvin()*(1.0+1.607858*this.getHumidityRatio().to_kgkgda())/this.p.to_kilopascal()), PsychrometricsJS.Units.KGM3);
};


