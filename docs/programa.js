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

// Abrir el archivo GeoJSON
// Javascript se ejecuta de tal manera que si una linea
// de código se demora, se pasa a la siguiente sin esperar.
//Esto puede generar problemas cuando se requiere secuencialidad

async function cargarPuntos(){

    var miArchivo = await fetch("microondas.geojson")
    
    //Convertir el contenido a json: objeto js    
    var datos = await miArchivo.json();
    //Obtener el arreglo de la llave features que es un conjunto
    //de objetos tipo feature
    let listaFeatures = datos["features"]
    
    //Obtener la geometria del primer elmento

    

    for(let i = 0; i<10;i++){
    
        let misCoordenadas = listaFeatures[i]["geometry"]["coordinates"];
        var miMarcador = L.marker(misCoordenadas);
        miMarcador.addTo(map);
    }  
}
cargarPuntos();