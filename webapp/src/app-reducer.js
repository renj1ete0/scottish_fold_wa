import {createAction, handleActions} from 'redux-actions';
import {ActionTypes} from '@kepler.gl/actions';

// CONSTANTS
export const INIT = 'INIT';
export const ADD_HDB = 'ADD_HDB';
export const ADD_LAND = 'ADD_LAND';
export const ADD_BASE_HDB = 'ADD_BASE_HDB';
export const ADD_BASE_MP19 = 'ADD_BASE_MP19';
export const CLEAR_OBJECTS = 'CLEAR_OBJECTS';
export const MAPLOADED = 'MAPLOADED';

// ACTIONS
export const appInit = createAction(INIT);
export const addHDB = createAction(ADD_HDB);
export const addLand = createAction(ADD_LAND);
export const addBaseHDB = createAction(ADD_BASE_HDB);
export const addBaseMP19 = createAction(ADD_BASE_MP19);
export const clearObjects = createAction(CLEAR_OBJECTS);
export const mapLoaded = createAction(MAPLOADED);

// INITIAL_STATE
const initialState = {
  appName: 'example',
  loaded: false,
  clickInfo: null,
  selectedLayer: null,
  objects: {},
  store_hdb: null,
  store_land: null,
  store_base_hdb: null,
  store_base_mp19: null,
  mapLoaded: false
};

// REDUCER
const appReducer = handleActions(
  {
    [INIT]: state => ({
      ...state,
      loaded: true
    }),
    [ActionTypes.LAYER_CLICK]: (state, { payload: info }) => { 
      const layerName = info?.info?.object?.properties?.Name || null;
      return {
        ...state,
        clickInfo: info,
        selectedLayer: layerName
      } 
    },
    [ADD_HDB]: (state, { payload: value }) => ({
      ...state,
      store_hdb: value
    }),
    [ADD_LAND]: (state, { payload: value }) => ({
      ...state,
      store_land: value
    }),
    [ADD_BASE_HDB]: (state, { payload: value }) => ({
      ...state,
      store_base_hdb: value
    }),
    [ADD_BASE_MP19]: (state, { payload: value }) => ({
      ...state,
      store_base_mp19: value
    }),
    [CLEAR_OBJECTS]: (state) => ({
      ...state,
      store_hdb: null,
      store_land: null,
      store_base_hdb: null,
      store_base_mp19: null
    }),
    [MAPLOADED]: (state) => ({
      ...state,
      mapLoaded: true
    })
  },
  initialState
);

export default appReducer;