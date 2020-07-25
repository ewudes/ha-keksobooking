'use strict';

(function () {
  var ESC = 'Escape';
  var MOUSE_BUTTON = 0;
  var cardTemplate = document.body.querySelector('#card')
    .content
    .querySelector('.map__card');

  var adElement = cardTemplate.cloneNode(true);

  var closeButton = adElement.querySelector('.popup__close');

  var typeValue = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец'
  };

  var setCardFeatures = function (cardElement, data) {
    var featuresContainer = cardElement.querySelector('.popup__features');
    if (data.length) {
      var cardFeatures = Array.from(cardElement.querySelectorAll('.popup__feature'));

      cardFeatures.forEach(function (element) {
        element.classList.add('hidden');
      });

      data.forEach(function (feature) {
        var featureElement = cardElement.querySelector('.popup__feature--' + feature);
        featureElement.classList.remove('hidden');
      });

      featuresContainer.classList.remove('hidden');
    } else {
      featuresContainer.classList.add('hidden');
    }
  };

  var setCardPhotos = function (cardElement, images) {
    var photosContainer = cardElement.querySelector('.popup__photos');

    if (images.length) {

      var photos = photosContainer.querySelector('.popup__photo');
      var lastPhotos = Array.from(cardElement.querySelectorAll('.popup__photo'));

      lastPhotos.forEach(function (element) {
        element.remove();
      });

      images.forEach(function (image) {
        photos.src = image;
        photosContainer.appendChild(photos.cloneNode(true));
      });

      photosContainer.classList.remove('hidden');
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

  var onLeftMouseClose = function (evt) {
    if (evt.button === MOUSE_BUTTON) {
      closeDeclaration();
    }
  };

  var onEscClose = function (evt) {
    if (evt.key === ESC) {
      evt.preventDefault();
      closeDeclaration();
    }
  };

  var removeActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    activePin.classList.remove('map__pin--active');
  };

  var closeDeclaration = function () {
    var mapCard = document.querySelector('.map__card');

    if (mapCard) {
      mapCard.remove();
      removeActivePin();
    }
    document.removeEventListener('keydown', onEscClose);
  };

  var render = function (data) {
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
    closeDeclaration: closeDeclaration,
    closeButton: closeButton,
    onLeftMouseClose: onLeftMouseClose,
    onEscClose: onEscClose,
    render: render
  };
})();
