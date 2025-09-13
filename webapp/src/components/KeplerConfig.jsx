export default {
  version: 'v1',
  config: {
    visState: {
      filters: [],
      layers: [],
      interactionConfig: {},
      layerBlending: 'normal',
      splitMaps: []
    },
    mapState: {
      bearing: 0,
      dragRotate: false,
      latitude: 1.3521,
      longitude: 103.8198,
      pitch: 0,
      zoom: 12,
      isSplit: false
    },
    mapStyle: {
      styleType: 'onemap-night',   // set this as the active style
      mapStyles: {
        'onemap-night': {
          id: 'onemap-night',
          label: 'OneMap Night',
          url: null,
          icon: 'https://www.onemap.gov.sg/web-assets/images/logo/om_logo_256.png',
          layerGroups: [],
          style: {
            version: 8,
            sources: {
              onemap: {
                type: 'raster',
                tiles: [
                  'https://www.onemap.gov.sg/maps/tiles/Night_HD/{z}/{x}/{y}.png'
                ],
                tileSize: 128,
                minzoom: 11,
                maxzoom: 20
              }
            },
            layers: [
              {
                id: 'onemap-raster',
                type: 'raster',
                source: 'onemap'
              }
            ]
          }
        }
      }
    }
  }
};
