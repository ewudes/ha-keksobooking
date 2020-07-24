'use strict';

(function () {
  var TIMEOUT_IN_MS = 500;
  var Url = {
    GET: 'https://javascript.pages.academy/keksobooking/data',
    POST: 'https://javascript.pages.academy/keksobooking'
  };
  var TYPE = 'json';
  var StatusCode = {
    OK: 200
  };

  var createRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError) {
    var xhr = createRequest(onSuccess, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.load = {
    load: load,
    upload: upload
  };
})();
