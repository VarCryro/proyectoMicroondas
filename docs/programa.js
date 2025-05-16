// Inicialización del mapa
var map = L.map('map', {
    preferCanvas: true // Mejor rendimiento para muchos marcadores
}).setView([4.62800694445335, -74.06591689106871], 13);

// Capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Función para formatear precios en COP
const formatoMonetario = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
});

// Cargar y procesar datos GeoJSON
async function cargarPuntos() {
    try {
        const response = await fetch('microondas.geojson');
        if (!response.ok) throw new Error('Error HTTP: ' + response.status);
        
        const geojson = await response.json();
        
        geojson.features.forEach(feature => {
            const [lng, lat] = feature.geometry.coordinates;
            const propiedades = feature.properties;

            // Crear contenido del popup
            const popupContent = `
                <div class="tienda-header">
                    <h4>${propiedades.Tienda}</h4>
                    <span class="modelo">${propiedades.Modelo}</span>
                </div>
                <div class="precios">
                    <span class="precio-actual">${formatoMonetario.format(propiedades.PrecioDescuento)}</span>
                    <span class="precio-anterior">${formatoMonetario.format(propiedades.PrecioSinAhorro)}</span>
                </div>
                <div class="especificaciones">
                    <p>📏 ${propiedades.Alto}x${propiedades.Ancho}x${propiedades.Profundidad} cm</p>
                    <p>⚡ ${propiedades.Potencia}W • ${propiedades.Voltaje}V</p>
                    <p>${propiedades.Características}</p>
                </div>
            `;

            // Crear marcador interactivo
            L.marker([lat, lng], {
                riseOnHover: true
            })
            .addTo(map)
            .bindPopup(popupContent);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los datos. Verifica la consola para más detalles.');
    }
}

// Iniciar carga de datos
document.addEventListener('DOMContentLoaded', cargarPuntos);