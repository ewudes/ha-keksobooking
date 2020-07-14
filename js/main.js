'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PIN_MIN_TOP = 200;
var MAP_FILTER_HEIGHT = 50;
var PINS_QUANTITY = 8;
var HEIGHT_TAIL_MAIN_PIN = 22;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var maxX = document.body.querySelector('.map')
  .clientWidth;
var maxY = document.body.querySelector('.map')
  .clientHeight;
var cardTemplate = document.body.querySelector('#card')
  .content
  .querySelector('.map__card');
var pinTemplate = document.body.querySelector('#pin')
  .content
  .querySelector('button');
var disabled = document.querySelectorAll('fieldset, select');
var addressInput = document.querySelector('fieldset input[name = address]');
var form = document.querySelector('.ad-form');
var map = document.querySelector('.map');
var formSubmit = document.querySelector('.ad-form__submit');
var mapFilter = document.querySelectorAll('.map__filter');
var mapFilterContainer = document.body.querySelector('.map__filters-container');
var mapFeature = document.querySelectorAll('.map__feature');
var mapPins = map.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');
var pinImage = mapPinMain.querySelector('img');
var typeHousing = form.querySelector('#type');
var priceInput = form.querySelector('#price');
var timeIn = form.querySelector('#timein');
var timeOut = form.querySelector('#timeout');
var rooms = form.querySelector('#room_number');
var capacity = form.querySelector('#capacity');

var adElement = cardTemplate.cloneNode(true);

var activeMode = false;

var typeValue = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var minPricesForNight = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

var guestsLimit = {
  MAX: 100,
  MIN: 0
};

var randomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var blockInput = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', true);
  }
};

var onLeftMouseDownProcess = function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    deleteUnactiveMode();
  }
};

var onEnterProcess = function (evt) {
  if (evt.key === 'Enter') {
    deleteUnactiveMode();
  }
};

var stopMainPinEventListener = function () {
  mapPinMain.removeEventListener('keydown', onEnterProcess);
  mapPinMain.removeEventListener('mousedown', onLeftMouseDownProcess);
};

var enabledElements = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
  addressInput.setAttribute('readonly', true);
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

var getMainPinAddress = function () {
  var leftCoord = mapPinMain.offsetLeft;
  var topCoord = mapPinMain.offsetTop;
  var adress = addressInput.value = leftCoord + ', ' + topCoord;

  if (activeMode) {
    leftCoord = mapPinMain.offsetLeft + pinImage.width / 2;
    topCoord = mapPinMain.offsetTop + pinImage.height / 2 + HEIGHT_TAIL_MAIN_PIN;
    adress = addressInput.value = leftCoord + ', ' + topCoord;
  }

  return adress;
};

var setHousingPrice = function () {
  priceInput.placeholder = minPricesForNight[typeHousing.value];
  priceInput.min = minPricesForNight[typeHousing.value];
};

var setTimeInToOut = function () {
  timeOut.value = timeIn.value;
};

var setTimeOutToIn = function () {
  timeIn.value = timeOut.value;
};

var setRoomCapacity = function () {
  if (Number(rooms.value) < Number(capacity.value)) {
    capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
  } else if (Number(capacity.value) === guestsLimit.MIN && Number(rooms.value) !== guestsLimit.MAX) {
    capacity.setCustomValidity('«Не для гостей» можно выбрать только 100 комнат');
  } else if (Number(rooms.value) === guestsLimit.MAX && Number(capacity.value) !== guestsLimit.MIN) {
    capacity.setCustomValidity('100 комнат — «не для гостей»');
  } else {
    capacity.setCustomValidity('');
  }
};

var getPhotos = function () {
  var photos = [];
  var photosCount = randomInt(1, 4);
  for (var j = 1; j < photosCount; j++) {
    photos.push('http://o0.github.io/assets/images/tokyo/hotel' + j + '.jpg');
  }
  return photos;
};

var getListFeatures = function () {
  var minF = randomInt(0, FEATURES.length - 1);
  var maxF = randomInt(minF, FEATURES.length);
  return FEATURES.slice(minF, maxF);
};

var getMockData = function () {
  var pins = [];

  for (var i = 1; i <= PINS_QUANTITY; i++) {
    var positionX = randomInt(1, maxX);
    var positionY = randomInt(PIN_MIN_TOP, maxY - MAP_FILTER_HEIGHT);

    pins.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': 'Заголовок предложения ' + i,
        'address': positionX + ',' + positionY,
        'price': randomInt(1, 10000),
        'type': TYPES[randomInt(0, TYPES.length - 1)],
        'rooms': randomInt(1, 10),
        'guests': randomInt(1, 5),
        'checkin': TIMES[randomInt(0, TIMES.length - 1)],
        'checkout': TIMES[randomInt(0, TIMES.length - 1)],
        'features': getListFeatures(),
        'description': 'Описание предложения',
        'photos': getPhotos(),
      },
      'location': {
        'x': positionX,
        'y': positionY
      }
    });
  }
  return pins;
};

var pins = getMockData();

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

var deleteUnactiveMode = function () {
  map.classList.remove('map--faded');
  addressInput.classList.add('ad-form--disabled');
  form.classList.remove('ad-form--disabled');
  renderPins(pins);
  stopMainPinEventListener();
  enabledElements(disabled);
  setCursorPointer(mapFilter);
  setCursorPointer(mapFeature);
  activeMode = true;
  getMainPinAddress();
  renderCard(pins);
};

var setCardFeatures = function (cardElement, data) {
  var featuresContainer = cardElement.querySelector('.popup__features');
  if (data.length >= 1) {
    var cardFeatures = cardElement.querySelectorAll('.popup__feature');
    for (var i = 0; i < cardFeatures.length; i++) {
      cardFeatures[i].classList.add('hidden');
      for (var j = 0; j < data.length; j++) {
        cardFeatures[j].classList.remove('hidden');
      }
    }
  } else {
    featuresContainer.classList.add('hidden');
  }
};

var setCardPhotos = function (cardElement, images) {
  var photosContainer = cardElement.querySelector('.popup__photos');
  if (images.length >= 1) {
    var photos = photosContainer.querySelector('.popup__photo');
    var lastPhotos = cardElement.querySelectorAll('.popup__photo');
    for (var j = 0; j < lastPhotos.length; j++) {
      lastPhotos[j].remove();
    }
    for (var k = 0; k < images.length; k++) {
      photos.src = images[k];
      var cloneImage = photos.cloneNode(true);
      photosContainer.appendChild(cloneImage);
    }
  } else {
    photosContainer.classList.add('hidden');
  }
};

var setCardTextContent = function (cardElement, className, data) {
  if (data !== '') {
    cardElement.querySelector(className).textContent = data;
  } else {
    cardElement.querySelector(className).classList.add('hidden');
  }
};

var setCardAvatar = function (cardElement, userPic) {
  if (userPic !== '') {
    cardElement.querySelector('.popup__avatar').src = userPic;
  } else {
    cardElement.querySelector('.popup__avatar').src = 'img/avatars/default.png';
  }
};

var renderCard = function (data) {
  var pinsData = data[0];

  setCardTextContent(adElement, '.popup__title', pinsData.offer.title);
  setCardTextContent(adElement, '.popup__text--address', pinsData.offer.adderss);
  setCardTextContent(adElement, '.popup__text--price', pinsData.offer.price + ' ₽/ночь');
  setCardTextContent(adElement, '.popup__type', typeValue[pinsData.offer.type]);
  setCardTextContent(adElement, '.popup__text--capacity', pinsData.offer.rooms + ' комнаты для ' + pinsData.offer.guests + ' гостей');
  setCardTextContent(adElement, '.popup__text--time', 'Заезд после ' + pinsData.offer.checkin + ', выезд до ' + pinsData.offer.checkout);
  setCardTextContent(adElement, '.popup__description', pinsData.offer.description);
  setCardAvatar(adElement, pinsData.author.avatar);
  setCardFeatures(adElement, pinsData.offer.features);
  setCardPhotos(adElement, pinsData.offer.photos);
  return mapFilterContainer.before(adElement);
};

var init = function () {
  blockInput(disabled);
  setCursorDefault(mapFilter);
  setCursorDefault(mapFeature);
  getMainPinAddress();
};

mapPinMain.addEventListener('mousedown', onLeftMouseDownProcess);
mapPinMain.addEventListener('keydown', onEnterProcess);
typeHousing.addEventListener('change', setHousingPrice);
timeIn.addEventListener('change', setTimeInToOut);
timeOut.addEventListener('change', setTimeOutToIn);
rooms.addEventListener('change', setRoomCapacity);
capacity.addEventListener('change', setRoomCapacity);
formSubmit.addEventListener('click', setRoomCapacity);

init();
