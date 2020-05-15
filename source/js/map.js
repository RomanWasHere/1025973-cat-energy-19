ymaps.ready(init);
function init() {
    // Создание карты.
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/map-docpage/
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчнию: «широта, долгота».
        center: [55.76, 37.64],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 12,
        // Элементы управления
        controls: [
            'zoomControl', // Ползунок масштаба
            'rulerControl', // Линейка
            'routeButtonControl', // Панель маршрутизации
            'fullscreenControl', // Полноэкранный режи
        ]
    });

    // Добавление метки
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
    var myPlacemark = new ymaps.Placemark([55.76, 37.64], {
        // Хинт показывается при наведении мышкой на иконку метки.
        hintContent: 'Содержимое всплывающей подсказки',
        // Балун откроется при клике по метке.
        balloonContent: 'Содержимое балуна'
    }, {
        iconImageHref: '/img/map-pin.png',
        // Размеры метки.
        iconImageSize: [32, 32],
    });

    // После того как метка была создана, добавляем её на карту.
    myMap.geoObjects.add(myPlacemark);

}
