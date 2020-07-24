'use strict';

(function () {
  var ESC = 'Escape';
  var MOUSE_BUTTON = 0;
  var cardTemplate = document.body.querySelector('#card')
    .content
    .querySelector('.map__card');

  var adElement = cardTemplate.cloneNode(true);

  var cardCloseButton = adElement.querySelector('.popup__close');

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

  var onLeftMouseCloseCard = function (evt) {
    if (evt.button === MOUSE_BUTTON) {
      closeAnnouncements();
    }
  };

  var onEscCloseCard = function (evt) {
    if (evt.key === ESC) {
      evt.preventDefault();
      closeAnnouncements();
    }
  };

  var removeActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active');
  };

  var closeAnnouncements = function () {
    var mapCard = document.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
      removeActivePin();
    }
    document.removeEventListener('keydown', onEscCloseCard);
  };

  var renderCard = function (data) {
    setCardTextContent(adElement, '.popup__title', data.offer.title);
    setCardTextContent(adElement, '.popup__text--address', data.offer.adderss);
    setCardTextContent(adElement, '.popup__text--price', data.offer.price + ' ₽/ночь');
    setCardTextContent(adElement, '.popup__type', typeValue[data.offer.type]);
    setCardTextContent(adElement, '.popup__text--capacity', data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей');
    setCardTextContent(adElement, '.popup__text--time', 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout);
    setCardTextContent(adElement, '.popup__description', data.offer.description);
    setCardAvatar(adElement, data.author.avatar);
    setCardFeatures(adElement, data.offer.features);
    setCardPhotos(adElement, data.offer.photos);
    return adElement;
  };

  window.card = {
    closeAnnouncements: closeAnnouncements,
    cardCloseButton: cardCloseButton,
    onLeftMouseCloseCard: onLeftMouseCloseCard,
    onEscCloseCard: onEscCloseCard,
    renderCard: renderCard
  };
})();
