'use strict';

(function () {

  var MAX_PINS = 5;

  var housingType = document.querySelector('#housing-type');

  var housingFilter = function (pin) {
    return housingType.value === pin.offer.type || housingType.value === 'any';
  };

  var setFilters = function (pins) {
    var serverPins = [];
    var i = 0;
    while (serverPins.length < MAX_PINS && i < pins.length) {
      var pin = pins[i];
      if (housingFilter(pin)) {
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
