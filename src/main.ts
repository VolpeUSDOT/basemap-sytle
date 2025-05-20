import './style.css'

// Core
import esriConfig from '@arcgis/core/config.js'
import Basemap from '@arcgis/core/Basemap.js'
// import VectorTileLayer from '@arcgis/core/layers/VectorTileLayer.js'
import PortalBasemapsSource from '@arcgis/core/widgets/BasemapGallery/support/PortalBasemapsSource.js'
import Map from '@arcgis/core/Map.js'
import Portal from '@arcgis/core/portal/Portal.js'

// Components
import '@arcgis/map-components/components/arcgis-map'
import { ArcgisMap } from '@arcgis/map-components/dist/components/arcgis-map'
import '@arcgis/map-components/components/arcgis-basemap-gallery'
import '@arcgis/map-components/components/arcgis-expand'
import { ArcgisBasemapGallery } from '@arcgis/map-components/dist/components/arcgis-basemap-gallery'

esriConfig.apiKey = import.meta.env.VITE_API_KEY

// Although the default basemap style is set for my organizaiton, doing this doesn't result in
// the basemap galley showing the US worldview.
// esriConfig.portalUrl = 'https://MY-ORGANIZATION.maps.arcgis.com'

const mapElement = document.querySelector('arcgis-map') as ArcgisMap

const basemapGalleryElement = document.querySelector('arcgis-basemap-gallery') as ArcgisBasemapGallery

const portal = new Portal()

let omitBaseMaps = [
    'Charted Territory Map',
    'Newspaper Map',
    'Modern Antique Map',
    'Mid-Century Map',
    'Nova Map',
    'Colored Pencil Map',
    'OpenStreetMap (Blueprint)'
]

const source = new PortalBasemapsSource({
    portal,
    filterFunction: async (item, index, basemaps) => {
        let bool = true
        await item.load().then((loadedBasemap) => {
            if (omitBaseMaps.includes(loadedBasemap.title)) {
                bool = false
            }
            // else {  // THIS DOESN'T WORK!
            //     loadedBasemap.style.worldview = 'unitedStatesOfAmerica'
            // }
        })
        return bool
    }
})

basemapGalleryElement.source = source

// THE INITIAL BASEMAP WORKS AS I WOULD LIKE
const initialBasemap = new Basemap({
    style: {
        id: 'arcgis/outdoor',
        worldview: 'unitedStatesOfAmerica'
    }
})

const theMap = new Map({
    basemap: initialBasemap
})

mapElement.map = theMap
