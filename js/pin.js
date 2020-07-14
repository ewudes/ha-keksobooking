'use strict';

(function () {
  var HEIGHT_TAIL_MAIN_PIN = 22;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var mapPins = window.map.map.querySelector('.map__pins');
  var mapPinMain = window.map.map.querySelector('.map__pin--main');
  var pinImage = mapPinMain.querySelector('img');
  var pinTemplate = document.body.querySelector('#pin')
    .content
    .querySelector('button');

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

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < pins.length; k++) {
      fragment.appendChild(renderPin(pins, k));
    }
    return mapPins.appendChild(fragment);
  };

  mapPinMain.addEventListener('mousedown', onLeftMouseDownProcess);
  mapPinMain.addEventListener('keydown', onEnterProcess);

  window.pin = {
    getMainPinAddress: getMainPinAddress,
    stopMainPinEventListener: stopMainPinEventListener,
    renderPins: renderPins
  };
})();
