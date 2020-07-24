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

  var housingType = window.pin.mapFilters.querySelector('#housing-type');
  var housingPrice = window.pin.mapFilters.querySelector('#housing-price');
  var housingRooms = window.pin.mapFilters.querySelector('#housing-rooms');
  var housinGuests = window.pin.mapFilters.querySelector('#housing-guests');
  var housingFeatures = window.pin.mapFilters.querySelector('#housing-features');

  var housingFilter = function (pin) {
    return housingType.value === DEFAULT
      || housingType.value === pin.offer.type;
  };

  var priceFilter = function (pin) {
    return housingPrice.value === DEFAULT
      || pin.offer.price >= priceValues[housingPrice.value].min
      && pin.offer.price <= priceValues[housingPrice.value].max;
  };

  var roomsFilter = function (pin) {
    return housingRooms.value === DEFAULT
      || pin.offer.rooms === Number(housingRooms.value);
  };

  var guestsFilter = function (pin) {
    return housinGuests.value === DEFAULT
      || pin.offer.guests === Number(housinGuests.value);
  };

  var featuresFilter = function (pin) {
    var selectFeatures = Array.from(housingFeatures.querySelectorAll('input:checked'));
    return selectFeatures.every(function (element) {
      return pin.offer.features.some(function (feature) {
        return feature === element.value;
      });
    });
  };

  var setFilters = function (pins) {
    var serverPins = [];
    var i = 0;
    while (serverPins.length < MAX_PINS && i < pins.length) {
      var pin = pins[i];
      if (housingFilter(pin)
        && priceFilter(pin)
        && roomsFilter(pin)
        && guestsFilter(pin)
        && featuresFilter(pin)) {
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
