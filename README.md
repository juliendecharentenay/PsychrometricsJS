# psychrometricJS

A Javascript library of psychrometric function and psychromtric state based on ASHRAE Handbook Fundamentals 2013.


## Usage

The library is divided into 3 groups:
- Definition of thermodynamic variables classes. This allows for transfer across units;
- Definition of a thermodynamic state class. The thermodynamic state class is based on a doublet of thermodynamic variables with the pressure;
- SI functions that allow for convertion between thermodynamic variables. The intent of the library is to use the thermodynamic state class, which call the appropriate conversion functions rather than having the user calling them.

The example below shows the definition and usage of a thermodynamic variable.

```
var temperature = new PsychrometricsJS.Temperature(20.0, PsychrometricsJS.Units.CELSIUS);
temperature.to_celsius();    // return 20
temperature.to_fahrenheit(); // return 68
temperature.to_kelvin();     // return 293.15

var relativeHumidity = new PsychrometricsJS.RelativeHumidity(0.35, PsychrometricsJS.Units.ZEROTOONE);
relativeHumidity.to_percentage(); // return 35
```

The example below shows the definition and some usage of a thermodynamic state. The thermodynamic state
is defined by pressure with any combination of thermodynamic variabes to the expection of (a) dew-point temperature
and moisture ratio and (b) wet-bulb temperature and enthalpy.

```
var hash = {};
hash[PsychrometricsJS.Variables.DBT] = new PsychrometricsJS.Temperature(20.0, PsychrometricsJS.Units.CELSIUS);
hash[PsychrometricsJS.Variables.DPT] = new PsychrometricsJS.Temperature(10.0, PsychrometricsJS.Units.CELSIUS);
hash[PsychrometricsJS.Variables.P] = new PsychrometricsJS.Pressure(101325.0, PsychrometricsJS.Units.PASCAL);
var state = new PsychrometricsJS.State(hash);

state.getDryBulbTemperature().to_celsius();  // return 20
state.getWetBulbTemperature().to_celsius();  // return 14.11
state.getDewPointTemperature().to_celsius(); // return 10
state.getRelativeHumidity().to_zerotoone();  // return 0.5239
state.getHumidityRatio().to_kgkgda();        // return 0.00761
state.getEnthalpy().to_kjkgda();             // return 39.44
```

A couple of useful functions are shown below:

```
var altitude = new PsychrometricsJS.Length(100.0, PsychrometricsJS.Units.METER);

var pressure = PsychrometricsJS.getStandardAtmPressure(z);
pressure.to_pascal();     // return 100129.4

var temperature = PsychrometricsJS.getStandardAtmTemperature(z);
temperature.to_celsius(); // return 14.35
```

Lastly, SI functions are available under PsychrometricsJS.SI.

## Example

http://juliendecharentenay.eu5.net/index.html

## License
Copyright (C) 2018 Julien de Charentenay
Licensed under MIT license


