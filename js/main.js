'use strict';

(function () {
  window.map.blockInput(window.form.formElements);
  window.map.setCursorDefault(window.map.mapFilter);
  window.map.setCursorDefault(window.map.mapFeature);
  window.pin.getMainPinAddress();
  window.pin.requestPins();
})();
