$(function() {
  $('.table').wrap('<div style="overflow-x: auto"></div>');
  $(document).on('scroll', function() {$('.icon-burger').stop(true, false).animate({'top': $(window).height()/2 + $(window).scrollTop()}, 100)})

  $(window).resize(function() {
    slideout.close();
  });


});

//Modal
var modal = new tingle.modal();
modal.setContent(document.querySelector('.call-back').innerHTML);
var city = new tingle.modal();
city.setContent(document.querySelector('.city').innerHTML);


//SlideOut
var slideout = new Slideout({
  'panel': document.getElementById('panel'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 70
});
document.querySelector('.toggle-menu').addEventListener('click', function() {
  slideout.toggle();
});

//Gallery
baguetteBox.run('.gallery');


//Map
ymaps.ready(init);
var myMap;

function init(){     
 var myMap = new ymaps.Map('map', {
      // При инициализации карты, обязательно нужно указать
      // ее центр и коэффициент масштабирования
      center: [55.7247, 37.6331],
      zoom: 17
  });
 
  // Создание метки 
  var myPlacemark = new ymaps.Placemark(
  // Координаты метки
  [55.7247,37.6331] , {
              // Свойства
              // Текст метки
              hintContent: 'Россия, Москва, ул. Щипок, д. 16, строение 1, офис 24'
          }, {
              iconImageHref: 'img/marker.svg', // картинка иконки
              iconImageSize: [50, 50], // размеры картинки
              iconImageOffset: [-10, -40] // смещение картинки
              });     


  // Добавление метки на карту
  myMap.geoObjects.add(myPlacemark);
}


//Ajax отправка формы
document.querySelectorAll('form').forEach(function(item) {
item.addEventListener('submit', function(event) {
  sendAjaxForm(this, event);
})});
function sendAjaxForm(form, event) {
  var fields = form.querySelectorAll('input, textarea')

  var formHasError =  Array.prototype.reduce.call(fields, function(invalidCount, currentItem) {
    if (currentItem.matches(':invalid')) invalidCount++;
  }, 0);

  if (formHasError) {
    return true;
  } else {
    event.preventDefault();

    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'send.php');
    xhr.onreadystatechange = function() {
      if ((xhr.readyState == 4) && (xhr.status == 200)) {
        data = xhr.responseText;
        form.outerHTML = '<h3 style="color: #fff; text-align: center;">Спасибо, ваша заявка отправлена</h3><p style="color: #fff; text-align: center">Наши менеджеры свяжутся с вами в течение дня</p>';
      }
    }
    xhr.send(formData);

    return false;
  }
}

//TextArea
var textarea = document.querySelector('textarea');
textarea.addEventListener('keydown', autosize);
 
function autosize () {
    var el = this;
    setTimeout(function () {
        el.style.cssText = 'height:auto;';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
    }, 0);
}
