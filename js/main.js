'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PIN_MIN_TOP = 200;
var MAP_FILTER_HEIGHT = 50;
var PINS_QUANTITY = 8;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var typeHousing = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var maxX = document.body.querySelector('.map').clientWidth;
var maxY = document.body.querySelector('.map').clientHeight;

var pinTemplate = document.body.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();

var cardTemplate = document.body.querySelector('#card').content;
var cardElement = cardTemplate.cloneNode(true);

document.body.querySelector('.map').classList.remove('map--faded');

var randomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
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
  for (var k = 0; k < pins.length; k++) {
    fragment.appendChild(renderPin(pins, k));
  }
  return fragment;
};

document.body.querySelector('.map__pins').appendChild(renderPins());

var getCardElement = function (popup, data) {
  cardElement.querySelector(popup).textContent = data;
};

var getCardFeatures = function (features) {
  var cardFeatures = cardElement.querySelectorAll('.popup__feature');

  for (var i = 0; i < cardFeatures.length; i++) {
    cardFeatures[i].classList.add('hidden');
    for (var j = 0; j < features.length; j++) {
      cardFeatures[j].classList.remove('hidden');
    }
  }
};

var getCardPhotos = function (images) {
  var photosContainer = cardElement.querySelector('.popup__photos');
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
};

var getCardText = function (offer, author) {
  getCardElement('.popup__title', offer.title);
  getCardElement('.popup__text--address', offer.address);
  getCardElement('.popup__text--price', offer.price + ' ₽/ночь');
  getCardElement('.popup__type', typeHousing[offer.type]);
  getCardElement('.popup__text--capacity', offer.rooms + ' комнаты для ' + offer.guests + ' гостей');
  getCardElement('.popup__text--time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);
  getCardElement('.popup__description', offer.description);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
};

var renderCard = function (data) {
  getCardText(data[0].offer, data[0].author);
  getCardFeatures(data[0].offer.features);
  getCardPhotos(data[0].offer.photos);
  return cardElement;
};

document.body.querySelector('.map__filters-container').before(renderCard(pins));

