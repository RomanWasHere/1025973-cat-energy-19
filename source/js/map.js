ymaps.ready(init);
function init() {
    // Создание карты.
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/map-docpage/
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчнию: «широта, долгота».
        center: [59.938635, 30.323118],
        // от 0 (весь мир) до 19.
        zoom: 17,
        // Элементы управления
        controls: [
            'zoomControl', // Ползунок масштаба
        ]
    });

    // Добавление метки
    // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
    var myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: 'img/map-pin.png',
        // Размеры метки.
        iconImageSize: [113, 106],
        iconImageOffset: [-57, -106],
    });

    // После того как метка была создана, добавляем её на карту.
    myMap.geoObjects.add(myPlacemark);

}
