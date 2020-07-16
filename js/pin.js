'use strict';

(function () {
  var HEIGHT_TAIL_MAIN_PIN = 22;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAX_PINS = 8;

  var mapPins = window.map.map.querySelector('.map__pins');
  var mapPinMain = window.map.map.querySelector('.map__pin--main');
  var pinImage = mapPinMain.querySelector('img');
  var pinTemplate = document.body.querySelector('#pin')
    .content
    .querySelector('button');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var mainSection = document.querySelector('main');

  var onLeftMouseDownProcess = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.map.deleteUnactiveMode();
    }
  };

  var onEnterProcess = function (evt) {
    if (evt.key === 'Enter') {
      window.map.deleteUnactiveMode();
    }
  };

  var stopMainPinEventListener = function () {
    mapPinMain.removeEventListener('keydown', onEnterProcess);
    mapPinMain.removeEventListener('mousedown', onLeftMouseDownProcess);
  };

  var getMainPinAddress = function () {
    var leftCoord = mapPinMain.offsetLeft;
    var topCoord = mapPinMain.offsetTop;
    var adress = window.map.addressInput.value = leftCoord + ', ' + topCoord;

    if (window.map.isActivated) {
      leftCoord = mapPinMain.offsetLeft + pinImage.width / 2;
      topCoord = mapPinMain.offsetTop + pinImage.height / 2 + HEIGHT_TAIL_MAIN_PIN;
      adress = window.map.addressInput.value = leftCoord + ', ' + topCoord;
    }

    return adress;
  };

  var pins = window.data.getMockData();

  var renderPin = function (data, count) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = data[count].location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = data[count].location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = data[count].author.avatar;
    pinElement.querySelector('img').alt = data[count].offer.title;
    return pinElement;
  };

  var getServerPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < data.length; k++) {
      fragment.appendChild(renderPin(data, k));
    }
    return mapPins.appendChild(fragment);
  };

  var renderPins = function () {
    var serverPins = pins.slice(0, MAX_PINS);
    getServerPins(serverPins);
  };

  var requestPins = function () {
    window.load.load(onSuccess, onError);
  };

  var onSuccess = function (data) {
    pins = data;
    mapPinMain.addEventListener('keydown', onEnterProcess);
    mapPinMain.addEventListener('mousedown', onLeftMouseDownProcess);
  };

  var onError = function (errorMessage) {
    var errorElement = errorTemplate.cloneNode(true);
    var messageText = errorElement.querySelector('p');
    messageText.textContent = errorMessage;
    document.addEventListener('click', closeLeftMouseError);
    document.addEventListener('keydown', closeEscError);
    mainSection.insertAdjacentElement('afterbegin', errorElement);
  };

  var closeSeverError = function () {
    var errorElements = document.body.querySelector('.error');
    errorElements.classList.add('hidden');
    window.map.blockInput(window.form.formElements);
    window.map.map.classList.add('map--faded');
    requestPins();
  };

  var closeLeftMouseError = function (evt) {
    if (evt.button === 0) {
      closeSeverError();
      document.removeEventListener('click', closeLeftMouseError);
    }
  };

  var closeEscError = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSeverError();
      document.removeEventListener('keydown', closeEscError);
    }
  };

  window.pin = {
    getMainPinAddress: getMainPinAddress,
    stopMainPinEventListener: stopMainPinEventListener,
    renderPins: renderPins,
    mapPins: mapPins,
    getServerPins: getServerPins,
    onError: onError,
    requestPins: requestPins,
  };
})();
