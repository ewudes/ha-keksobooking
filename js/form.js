'use strict';

(function () {
  var ESC = 'Escape';
  var form = document.querySelector('.ad-form');
  var formSubmit = document.querySelector('.ad-form__submit');
  var typeHousing = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var rooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var formElements = document.querySelectorAll('fieldset, select');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var successElement = successTemplate.cloneNode(true);

  var adFormReset = document.querySelector('.ad-form__reset');

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
      closeSuccessMessage(successElement);
    });
    document.addEventListener('keydown', closeEscSuccess);
    window.pin.mainSection.insertAdjacentElement('afterbegin', successElement);
  };

  var closeSuccessMessage = function () {
    successElement.remove(successElement);
  };

  var closeEscSuccess = function (evt) {
    if (evt.key === ESC) {
      evt.preventDefault();
      closeSuccessMessage(successElement);
      document.removeEventListener('keydown', closeEscSuccess);
    }
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.load.upload(new FormData(form), showSuccessMessage, window.pin.onError);
    form.reset();
    window.map.setUnactiveMode();
    window.pin.deletePins();
  };

  var resetForm = function (evt) {
    evt.preventDefault();
    form.reset();
    window.pin.getMainPinAddress();
    setHousingPrice();
  };

  typeHousing.addEventListener('change', setHousingPrice);
  timeIn.addEventListener('change', setTimeInToOut);
  timeOut.addEventListener('change', setTimeOutToIn);
  rooms.addEventListener('change', setRoomCapacity);
  capacity.addEventListener('change', setRoomCapacity);
  formSubmit.addEventListener('click', setRoomCapacity);
  form.addEventListener('submit', onFormSubmit);
  adFormReset.addEventListener('click', resetForm);

  window.form = {
    form: form,
    formElements: formElements
  };
})();
