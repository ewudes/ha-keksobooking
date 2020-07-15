'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var formSubmit = document.querySelector('.ad-form__submit');
  var typeHousing = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');
  var rooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');
  var formElements = document.querySelectorAll('fieldset, select');

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

  typeHousing.addEventListener('change', setHousingPrice);
  timeIn.addEventListener('change', setTimeInToOut);
  timeOut.addEventListener('change', setTimeOutToIn);
  rooms.addEventListener('change', setRoomCapacity);
  capacity.addEventListener('change', setRoomCapacity);
  formSubmit.addEventListener('click', setRoomCapacity);

  window.form = {
    form: form,
    formElements: formElements
  };
})();
