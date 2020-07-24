'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapFeature = document.querySelectorAll('.map__feature');
  var addressInput = document.querySelector('fieldset input[name = address]');
  var isActivated = false;
  var mainPin = document.querySelector('.map__pin--main');

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
    isActivated = true;
    window.pin.getMainPinAddress();
  };

  var setUnactiveMode = function () {
    map.classList.add('map--faded');
    addressInput.classList.add('ad-form--disabled');
    window.form.form.classList.add('ad-form--disabled');
    blockInput(window.form.formElements);
    setCursorDefault(mapFilter);
    setCursorDefault(mapFeature);
    isActivated = false;
    window.form.form.reset();
    window.card.closeAnnouncements();
    window.pin.mapFilters.reset();
    window.pin.deletePins();
    window.pin.getMainPinAddress();
    window.pin.requestPins();
    mainPin.style = 'left: 570px; top: 375px;';
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
    isActivated: isActivated,
    setUnactiveMode: setUnactiveMode
  };
})();
