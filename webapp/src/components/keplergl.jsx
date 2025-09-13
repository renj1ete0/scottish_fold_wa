import {Component} from 'react';
import {connect} from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import styled from 'styled-components';
import KeplerGl from '@kepler.gl/components';
import Container from 'react-bootstrap/Container';
import {addDataToMap, wrapTo, toggleSidePanel, toggleModal} from '@kepler.gl/actions';
import config from './KeplerConfig';
import {processGeojson} from '@kepler.gl/processors';
import {useSelector} from 'react-redux';
import { mapLoaded } from "../app-reducer";



const mapStylesReplaceDefault = true; // replace original map styles

// const mapStyles = [{
//   id: 'OneMapDark',
//   label: 'OneMapDark',
//   url: 'https://www.onemap.gov.sg/maps/json/raster/mbstyle/Night.json',
//   icon: 'https://www.onemap.gov.sg/web-assets/images/logo/om_logo_256.png'
// },
// {
//   id: 'OneMapGrey',
//   label: 'OneMap Grey',
//   url: 'https://www.onemap.gov.sg/maps/json/raster/mbstyle/Grey.json',
//   icon: 'https://www.onemap.gov.sg/web-assets/images/logo/om_logo_256.png'
// },
// {
//   id: 'OneMapDefault',
//   label: 'OneMap Default',
//   url: 'https://www.onemap.gov.sg/maps/json/raster/mbstyle/Default.json',
//   icon: 'https://www.onemap.gov.sg/web-assets/images/logo/om_logo_256.png'
// },
// ];



class KeplerMap extends Component  {
  // componentDidMount() {
  //   const { keplerGlState, dispatch } = this.props;
  //   // console.log(keplerGlState)
  //   if (keplerGlState && Object.keys(keplerGlState).length > 0) {
  //     dispatch(toggleSidePanel(null));
  //     dispatch(toggleModal(null));
  //   } 
    
  // }

  componentDidUpdate() {
    const { mapLoad, keplerGlState, dispatch } = this.props;
    // console.log(keplerGlState)
    // console.log(Object.keys(keplerGlState.map.mapStyle.isLoading).length)
    // console.log(Object.values(keplerGlState.map.mapStyle.isLoading)[0])
    // console.log(mapLoad)
    if ((Object.values(keplerGlState.map.mapStyle.isLoading)[0] == false) && mapLoad == false){
      dispatch(mapLoaded());
      console.log('Map Loaded')
      dispatch(toggleSidePanel(null));
      dispatch(toggleModal(null));

      console.log("test")

      dispatch(
        wrapTo(
          "map",
          addDataToMap({
            datasets: [], // must include datasets, even if empty
            config: config,
          })
        )
      );




    }

  }


  handleMapClick = (event) => {
    const clickedFeatures = event.picked;
    if (clickedFeatures && clickedFeatures.length > 0) {
      const polygon = clickedFeatures[0];
      const polygonName = polygon.properties.name; // Assuming your polygons have a 'name' property
      console.log('Selected Polygon Name:', polygonName);
    }
  };

  render() {

    
    return (  
      <div
        style={{
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <KeplerGl
              mapboxApiAccessToken="xxx" // Replace with your mapbox token
              id="map"
              width={width}
              height={height}
              // overrideMapStyles={mapStylesReplaceDefault}
              // mapStyles={mapStyles}
            />
          )}
        </AutoSizer>
      </div>
    );    
  }
  };

const mapStateToProps = (state) => ({
  keplerGlState: state.keplerGl, // Access the Kepler.gl state
  mapLoad: state.app.mapLoaded
});
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(KeplerMap);