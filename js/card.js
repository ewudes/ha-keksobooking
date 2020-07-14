'use strict';

(function () {
  var cardTemplate = document.body.querySelector('#card')
    .content
    .querySelector('.map__card');

  var mapFilterContainer = document.body.querySelector('.map__filters-container');

  var adElement = cardTemplate.cloneNode(true);

  var typeValue = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
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

  window.card = {
    renderCard: renderCard
  };
})();
