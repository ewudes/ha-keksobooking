'use strict';

(function () {

  var MAX_PINS = 5;
  var DEFAULT = 'any';
  var priceValues = {
    low: {
      min: 0,
      max: 9999
    },
    middle: {
      min: 10000,
      max: 49999
    },
    high: {
      min: 50000,
      max: 10000000
    }
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');

  var housingFilter = function (pin) {
    return housingType.value === pin.offer.type
      || housingType.value === DEFAULT;
  };

  var priceFilter = function (pin) {
    return housingPrice.value === DEFAULT
      || pin.offer.price >= priceValues[housingPrice.value].min
      && pin.offer.price <= priceValues[housingPrice.value].max;
  };

  var setFilters = function (pins) {
    var serverPins = [];
    var i = 0;
    while (serverPins.length < MAX_PINS && i < pins.length) {
      var pin = pins[i];
      if (housingFilter(pin) && priceFilter(pin)) {
        serverPins.push(pins[i]);
      }
      i++;
    }
    return serverPins;
  };

  window.filter = {
    setFilters: setFilters
  };
})();
