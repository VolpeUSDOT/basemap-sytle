import './style.css'

// Core
import esriConfig from '@arcgis/core/config.js'
import Basemap from '@arcgis/core/Basemap.js'
// import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer.js'
import Map from '@arcgis/core/Map.js'

// Components
import '@arcgis/map-components/components/arcgis-map'
import { ArcgisMap } from '@arcgis/map-components/dist/components/arcgis-map'
import '@arcgis/map-components/components/arcgis-basemap-gallery'
import '@arcgis/map-components/components/arcgis-zoom'

esriConfig.apiKey = import.meta.env.VITE_API_KEY

const mapElement = document.querySelector('arcgis-map') as ArcgisMap

mapElement.addEventListener('arcgisViewReadyChange', (event) => {
    console.log('Map component is ready to rock ...')
})

const basemap = new Basemap({
    style: {
        id: 'arcgis/outdoor',
        worldview: 'unitedStatesOfAmerica'
    }
})

const theMap = new Map({
    basemap
})

mapElement.map = theMap
