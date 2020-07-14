'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapFeature = document.querySelectorAll('.map__feature');
  var addressInput = document.querySelector('fieldset input[name = address]');
  var isActivated = false;

  var blockInput = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', true);
    }
  };

  var enabledElements = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
    addressInput.setAttribute('readonly', true);
  };

  var deleteUnactiveMode = function () {
    map.classList.remove('map--faded');
    addressInput.classList.add('ad-form--disabled');
    window.form.form.classList.remove('ad-form--disabled');
    window.pin.renderPins(window.data.pins);
    window.pin.stopMainPinEventListener();
    enabledElements(window.form.formElements);
    setCursorPointer(mapFilter);
    setCursorPointer(mapFeature);
    window.map.isActivated = true;
    window.pin.getMainPinAddress();
  };

  var setCursorDefault = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.cursor = 'default';
    }
  };

  var setCursorPointer = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.cursor = 'pointer';
    }
  };

  window.map = {
    map: map,
    mapFilter: mapFilter,
    mapFeature: mapFeature,
    addressInput: addressInput,
    blockInput: blockInput,
    setCursorDefault: setCursorDefault,
    deleteUnactiveMode: deleteUnactiveMode,
    isActivated: isActivated
  };
})();
