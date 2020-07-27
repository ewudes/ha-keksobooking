'use strict';

(function () {
  var DEFAULT_POSITION = 'left: 570px; top: 375px;';
  var container = document.querySelector('.map');
  var filter = document.querySelectorAll('.map__filter');
  var feature = document.querySelectorAll('.map__feature');
  var addressInput = document.querySelector('fieldset input[name = address]');
  var isActivated = false;
  var mainPin = document.querySelector('.map__pin--main');

  var blockInput = function (inputs) {
    var elements = Array.from(inputs);
    elements.forEach(function (element) {
      element.setAttribute('disabled', true);
    });
  };

  var enabl = function (el) {
    var elements = Array.from(el);
    elements.forEach(function (element) {
      // element.removeAttribute('disabled');
      element.setAttribute('enabled');

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
    if (!isActivated) {
      window.pin.request();
    }
    container.classList.remove('map--faded');
    addressInput.classList.add('ad-form--disabled');
    window.form.ad.classList.remove('ad-form--disabled');
    window.pin.stopMainPinEventListener();
    setCursorPointer(filter);
    setCursorPointer(feature);
    isActivated = true;
    window.pin.getMainPinAddress();
    enabledElements(window.form.elements);
    blockInput(window.pin.mapFilters);
    // if (window.load.loadData) {
    //   enabledElements(window.pin.mapFilters);
    // }
  };

  var setUnactiveMode = function () {
    container.classList.add('map--faded');
    addressInput.classList.add('ad-form--disabled');
    window.form.ad.classList.add('ad-form--disabled');
    blockInput(window.form.elements);
    setCursorDefault(filter);
    setCursorDefault(feature);
    isActivated = false;
    window.form.ad.reset();
    window.card.onCloseDeclaration();
    window.pin.mapFilters.reset();
    window.form.onPriceChange();
    window.pin.renderPins.reset();
    window.pin.remove();
    window.pin.getMainPinAddress();
    window.pin.request();
    window.preview.remove();
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
    container: container,
    filter: filter,
    feature: feature,
    addressInput: addressInput,
    blockInput: blockInput,
    setCursorDefault: setCursorDefault,
    deleteUnactiveMode: deleteUnactiveMode,
    isActivated: isActivated,
    setUnactiveMode: setUnactiveMode,
    enabledElements: enabledElements,
    enabl: enabl
  };
})();
