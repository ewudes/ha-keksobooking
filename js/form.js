'use strict';

(function () {
  var ESC = 'Escape';
  var ad = document.querySelector('.ad-form');
  var submit = document.querySelector('.ad-form__submit');
  var typeHousing = ad.querySelector('#type');
  var priceInput = ad.querySelector('#price');
  var timeIn = ad.querySelector('#timein');
  var timeOut = ad.querySelector('#timeout');
  var rooms = ad.querySelector('#room_number');
  var capacity = ad.querySelector('#capacity');
  var elements = document.querySelectorAll('fieldset, select');
  var inputs = document.querySelectorAll('input, select');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var reset = document.querySelector('.ad-form__reset');

  var successElement = successTemplate.cloneNode(true);

  var minPricesForNight = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var GuestsLimit = {
    MAX: 100,
    MIN: 0
  };

  var onPriceChange = function () {
    priceInput.placeholder = minPricesForNight[typeHousing.value];
    priceInput.min = minPricesForNight[typeHousing.value];
  };

  var onCheckOutChange = function () {
    timeOut.value = timeIn.value;
  };

  var onCheckInChange = function () {
    timeIn.value = timeOut.value;
  };

  var onCapacityChange = function () {
    var roomsValue = Number(rooms.value);
    var capacityValue = Number(capacity.value);

    if (roomsValue < capacityValue) {
      capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
    } else if (capacityValue === GuestsLimit.MIN && roomsValue !== GuestsLimit.MAX) {
      capacity.setCustomValidity('«Не для гостей» можно выбрать только 100 комнат');
    } else if (roomsValue === GuestsLimit.MAX && capacityValue !== GuestsLimit.MIN) {
      capacity.setCustomValidity('100 комнат — «не для гостей»');
    } else {
      capacity.setCustomValidity('');
    }
  };

  var showSuccessMessage = function () {
    document.addEventListener('click', onCloseSuccessMessage);
    document.addEventListener('keydown', onCloseSuccessEsc);
    window.pin.mainSection.insertAdjacentElement('afterbegin', successElement);
    window.map.setUnactiveMode();
  };

  var onCloseSuccessMessage = function () {
    successElement.remove();
    document.removeEventListener('click', onCloseSuccessMessage);
  };

  var onCloseSuccessEsc = function (evt) {
    if (evt.key === ESC) {
      evt.preventDefault();
      onCloseSuccessMessage(successElement);
      document.removeEventListener('keydown', onCloseSuccessEsc);
    }
  };

  var resetValidation = function () {
    var fie = Array.from(inputs);
    fie.forEach(function (el) {
      el.style.borderColor = '';
    });
  };

  var onValidationClick = function () {
    var fields = Array.from(inputs);
    fields.forEach(function (el) {
      if (!el.validity.valid) {
        el.style.borderColor = '#eb4034';
      } else {
        el.style.borderColor = '#d9d9d3';
      }
    });
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.load.uploadData(new FormData(ad), showSuccessMessage, window.pin.onError);
  };

  var onFormResetClick = function (evt) {
    evt.preventDefault();
    window.map.setUnactiveMode();
    resetValidation();
  };

  typeHousing.addEventListener('change', onPriceChange);
  timeIn.addEventListener('change', onCheckOutChange);
  timeOut.addEventListener('change', onCheckInChange);
  rooms.addEventListener('change', onCapacityChange);
  capacity.addEventListener('change', onCapacityChange);
  submit.addEventListener('click', onCapacityChange);
  submit.addEventListener('click', onValidationClick);
  ad.addEventListener('submit', onFormSubmit);
  reset.addEventListener('click', onFormResetClick);

  window.form = {
    ad: ad,
    elements: elements,
    onPriceChange: onPriceChange
  };
})();
