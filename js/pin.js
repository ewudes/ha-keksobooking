'use strict';

(function () {
  var HEIGHT_TAIL_MAIN_PIN = 22;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ESC = 'Escape';
  var ENTER = 'Enter';
  var MOUSE_BUTTON = 0;
  var MIN_COORDINATE_Y = 130;
  var MAX_COORDINATE_Y = 630;
  var MIN_COORDINATE_X = 0;

  var mapOverlay = document.querySelector('.map__overlay');
  var mapPins = window.map.map.querySelector('.map__pins');
  var mapSection = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = window.map.map.querySelector('.map__pin--main');
  var maxWidth = mapOverlay.offsetWidth;
  var pinImage = mapPinMain.querySelector('img');
  var mapFilters = document.querySelector('.map__filters');
  var halfPinWidth = mapPinMain.offsetWidth / 2;
  var pinHeightWithoutTail = mapPinMain.offsetHeight;
  var pinHeight = pinHeightWithoutTail + HEIGHT_TAIL_MAIN_PIN;
  var pinTemplate = document.body.querySelector('#pin')
    .content
    .querySelector('button');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  var mainSection = document.querySelector('main');

  var onLeftMouseDownProcess = function (evt) {
    if (evt.button === MOUSE_BUTTON) {
      evt.preventDefault();
      window.map.deleteUnactiveMode();
    }
  };

  var onEnterProcess = function (evt) {
    if (evt.key === ENTER) {
      window.map.deleteUnactiveMode();
    }
  };

  var onEscProcess = function (evt) {
    if (evt.key === ESC) {
      window.map.deleteUnactiveMode();
    }
  };

  var stopMainPinEventListener = function () {
    mapPinMain.removeEventListener('keydown', onEnterProcess);
    mapPinMain.removeEventListener('mousedown', onLeftMouseDownProcess);
    mapPinMain.removeEventListener('keydown', onEscProcess);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var mapCoordinate = mapOverlay.getBoundingClientRect();

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var coordinateX = moveEvt.clientX - mapCoordinate.left;
      var coordinateY = moveEvt.clientY - mapCoordinate.top;

      coordinateX = Math.max(MIN_COORDINATE_X, Math.min(maxWidth, coordinateX)) - halfPinWidth;
      coordinateY = Math.max(MIN_COORDINATE_Y, Math.min(MAX_COORDINATE_Y, coordinateY)) - pinHeight;

      mapPinMain.style.left = coordinateX + 'px';
      mapPinMain.style.top = coordinateY + 'px';

      getMainPinAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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

  var renderPin = function (data) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = data.location.y - PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = data.author.avatar;
    pinElement.querySelector('img').alt = data.offer.title;
    pinElement.addEventListener('click', function () {
      var activePin = document.querySelector('.map__pin--active');

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      mapSection.insertBefore(window.card.renderCard(data), mapFiltersContainer);
      pinElement.classList.add('map__pin--active');

      window.card.cardCloseButton.addEventListener('click', window.card.onLeftMouseCloseCard);
      document.addEventListener('keydown', window.card.onEscCloseCard);
    });
    return pinElement;
  };

  var getPinsFromServer = function (data) {
    var fragment = document.createDocumentFragment();
    for (var k = 0; k < data.length; k++) {
      fragment.appendChild(renderPin(data[k]));
    }
    return window.pin.mapPins.appendChild(fragment);
  };

  var renderPins = window.debounce(function () {
    deletePins();
    var serverPins = window.filter.setFilters(pins);
    getPinsFromServer(serverPins);
  });

  var requestPins = function () {
    window.load.load(onSuccess, onError);
  };

  var deleteServerPins = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].remove();
    }
  };
  var deletePins = function () {
    var pinButtons = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    deleteServerPins(pinButtons);
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
    errorElements.remove();
    window.map.blockInput(window.form.formElements);
    window.map.map.classList.add('map--faded');
    requestPins();
  };

  var closeLeftMouseError = function (evt) {
    if (evt.button === MOUSE_BUTTON) {
      closeSeverError();
      document.removeEventListener('click', closeLeftMouseError);
    }
  };

  var closeEscError = function (evt) {
    if (evt.key === ESC) {
      evt.preventDefault();
      closeSeverError();
      document.removeEventListener('keydown', closeEscError);
    }
  };
  mapFilters.addEventListener('change', renderPins);
  mapFilters.addEventListener('change', window.card.closeAnnouncements);

  window.pin = {
    getMainPinAddress: getMainPinAddress,
    stopMainPinEventListener: stopMainPinEventListener,
    renderPins: renderPins,
    mapPins: mapPins,
    getPinsFromServer: getPinsFromServer,
    onError: onError,
    requestPins: requestPins,
    deletePins: deletePins,
    mainSection: mainSection
  };
})();
