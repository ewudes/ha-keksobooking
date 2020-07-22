'use strict';

(function () {
  var PIN_MIN_TOP = 200;
  var MAP_FILTER_HEIGHT = 50;
  var PINS_QUANTITY = 5;

  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var maxX = document.body.querySelector('.map')
    .clientWidth;
  var maxY = document.body.querySelector('.map')
    .clientHeight;

  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getPhotos = function () {
    var photos = [];
    var photosCount = getRandomNumber(1, 4);
    for (var j = 1; j < photosCount; j++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + j + '.jpg');
    }
    return photos;
  };

  var getListFeatures = function () {
    var minF = getRandomNumber(0, FEATURES.length - 1);
    var maxF = getRandomNumber(minF, FEATURES.length);
    return FEATURES.slice(minF, maxF);
  };

  var getMockData = function () {
    var pins = [];

    for (var i = 1; i <= PINS_QUANTITY; i++) {
      var positionX = getRandomNumber(1, maxX);
      var positionY = getRandomNumber(PIN_MIN_TOP, maxY - MAP_FILTER_HEIGHT);

      pins.push({
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        'offer': {
          'title': 'Заголовок предложения ' + i,
          'address': positionX + ',' + positionY,
          'price': getRandomNumber(1, 10000),
          'type': TYPES[getRandomNumber(0, TYPES.length - 1)],
          'rooms': getRandomNumber(1, 10),
          'guests': getRandomNumber(1, 5),
          'checkin': TIMES[getRandomNumber(0, TIMES.length - 1)],
          'checkout': TIMES[getRandomNumber(0, TIMES.length - 1)],
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

  window.data = {
    getMockData: getMockData
  };

})();
