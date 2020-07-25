'use strict';

(function () {
  var ESC = 'Escape';
  var adForm = document.querySelector('.ad-form');
  var formSubmit = document.querySelector('.ad-form__submit');
  var typeHousing = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var formElements = document.querySelectorAll('fieldset, select');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var adFormReset = document.querySelector('.ad-form__reset');

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

  var onPriceClick = function () {
    priceInput.placeholder = minPricesForNight[typeHousing.value];
    priceInput.min = minPricesForNight[typeHousing.value];
  };

  var onCheckOutClick = function () {
    timeOut.value = timeIn.value;
  };

  var onCheckInClick = function () {
    timeIn.value = timeOut.value;
  };

  var onCapacityClick = function () {
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
    document.addEventListener('click', function () {
      onCloseSuccessMessage(successElement);
    });
    document.addEventListener('keydown', onCloseSuccessEsc);
    window.pin.mainSection.insertAdjacentElement('afterbegin', successElement);
    window.map.setUnactiveMode();
  };

  var onCloseSuccessMessage = function () {
    successElement.remove(successElement);
    document.removeEventListener('click', function () {
      onCloseSuccessMessage(successElement);
    });
  };

  var onCloseSuccessEsc = function (evt) {
    if (evt.key === ESC) {
      evt.preventDefault();
      onCloseSuccessMessage(successElement);
      document.removeEventListener('keydown', onCloseSuccessEsc);
    }
  };

  var onFormSubmitClick = function (evt) {
    evt.preventDefault();
    window.load.uploadData(new FormData(adForm), showSuccessMessage, window.pin.onError);
  };

  var onFormResetClick = function (evt) {
    evt.preventDefault();
    window.map.setUnactiveMode();
  };

  typeHousing.addEventListener('change', onPriceClick);
  timeIn.addEventListener('change', onCheckOutClick);
  timeOut.addEventListener('change', onCheckInClick);
  rooms.addEventListener('change', onCapacityClick);
  capacity.addEventListener('change', onCapacityClick);
  formSubmit.addEventListener('click', onCapacityClick);
  adForm.addEventListener('submit', onFormSubmitClick);
  adFormReset.addEventListener('click', onFormResetClick);

  window.form = {
    adForm: adForm,
    formElements: formElements
  };
})();
