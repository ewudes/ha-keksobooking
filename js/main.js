'use strict';

(function () {
  window.map.blockInput(window.form.elements);
  window.map.setCursorDefault(window.map.filter);
  window.map.setCursorDefault(window.map.feature);
  window.pin.getMainPinAddress();
})();
