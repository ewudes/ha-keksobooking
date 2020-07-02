'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var PIN_MIN_TOP = 200;
var MAP_FILTER_HEIGHT = 50;
var QUANTITY_PINS = 8;

var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FUTURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var maxX = document.body.querySelector('.map').clientWidth;
var maxY = document.body.querySelector('.map').clientHeight;

var pinTempl = document.body.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();

document.body.querySelector('.map').classList.remove('map--faded');

var randomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getMocData = function () {
  var pins = [];

  for (var i = 1; i <= QUANTITY_PINS; i++) {
    var minF = randomInt(0, FUTURES.length - 1);
    var maxF = randomInt(minF, FUTURES.length);
    var photos = [];
    var photosCount = randomInt(1, 10);
    for (var j = 0; j < photosCount; j++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + i + 'jpg');
    }
    pins.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png'
      },
      'offer': {
        'title': 'Заголовок предложения' + i,
        'address': randomInt(1, maxX) + ',' + randomInt(1, maxY),
        'price': randomInt(1, 10000),
        'type': TYPES[randomInt(0, TYPES.length - 1)],
        'rooms': randomInt(1, 10),
        'guests': randomInt(1, 5),
        'checkin': TIMES[randomInt(0, TIMES.length - 1)],
        'checkout': TIMES[randomInt(0, TIMES.length - 1)],
        'features': FUTURES.slice(minF, maxF),
        'description': 'Описание предложения',
        'photos': photos
      },
      'location': {
        'x': randomInt(1, maxX),
        'y': randomInt(PIN_MIN_TOP, maxY - MAP_FILTER_HEIGHT)
      }
    });
  }
  return pins;
};

var renderPin = function (pins, count) {
  var pinElement = pinTempl.cloneNode(true);
  pinElement.style.left = pins[count].location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pins[count].location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = pins[count].author.avatar;
  pinElement.querySelector('img').alt = pins[count].offer.title;
  return pinElement;
};

var renderPins = function () {
  var pins = getMocData();

  for (var k = 0; k < pins.length; k++) {
    fragment.appendChild(renderPin(pins, k));
  }
  return fragment;
};

document.body.querySelector('.map__pins').appendChild(renderPins());
