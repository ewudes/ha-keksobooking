'use strict';

(function () {
  var DEFAULT_POSITION = 'left: 570px; top: 375px;';
  var mapContainer = document.querySelector('.map');
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapFeature = document.querySelectorAll('.map__feature');
  var addressInput = document.querySelector('fieldset input[name = address]');
  var isActivated = false;
  var mainPin = document.querySelector('.map__pin--main');

  var blockInput = function (inputs) {
    var elements = Array.from(inputs);
    elements.forEach(function (element) {
      element.setAttribute('disabled', true);
    });
  };

  var enabledElements = function (inputs) {
    var elements = Array.from(inputs);
    elements.forEach(function (element) {
      element.removeAttribute('disabled');
    });
    addressInput.setAttribute('readonly', true);
  };

  var deleteUnactiveMode = function () {
    mapContainer.classList.remove('map--faded');
    addressInput.classList.add('ad-form--disabled');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.pin.render();
    window.pin.stopMainPinEventListener();
    enabledElements(window.form.formElements);
    setCursorPointer(mapFilter);
    setCursorPointer(mapFeature);
    isActivated = true;
    window.pin.getMainPinAddress();
  };

  var setUnactiveMode = function () {
    mapContainer.classList.add('map--faded');
    addressInput.classList.add('ad-form--disabled');
    window.form.adForm.classList.add('ad-form--disabled');
    blockInput(window.form.formElements);
    setCursorDefault(mapFilter);
    setCursorDefault(mapFeature);
    isActivated = false;
    window.form.adForm.reset();
    window.card.closeDeclaration();
    window.pin.mapFilters.reset();
    window.form.onPriceClick();
    window.pin.remove();
    window.pin.getMainPinAddress();
    window.preview.remove();
    window.pin.request();
    mainPin.style = DEFAULT_POSITION;
  };

  var setCursorDefault = function (inputs) {
    var elements = Array.from(inputs);
    elements.forEach(function (element) {
      element.style.cursor = 'default';
    });
  };

  var setCursorPointer = function (inputs) {
    var elements = Array.from(inputs);
    elements.forEach(function (element) {
      element.style.cursor = 'pointer';
    });
  };

  window.map = {
    mapContainer: mapContainer,
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
