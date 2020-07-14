'use strict';

(function () {
  var disabled = document.querySelectorAll('fieldset, select');
  window.mapMode.blockInput(disabled);
  window.mapMode.setCursorDefault(window.mapMode.mapFilter);
  window.mapMode.setCursorDefault(window.mapMode.mapFeature);
  window.pin.getMainPinAddress();

  window.main = {
    disabled: disabled
  };
})();
