// Inicializar el mapa
var map = L.map('map').setView([4.62800694445335, -74.06591689106871], 13); // Coordenadas de Madrid

// Añadir capa de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([4.62800694445335, -74.06591689106871]).addTo(map);
var circle = L.circle([4.62800694445335, -74.06591689106871], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 200
}).addTo(map);