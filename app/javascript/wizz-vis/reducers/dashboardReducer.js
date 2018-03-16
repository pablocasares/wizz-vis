import { combineReducers } from 'redux';
import { DASHBOARD_RELOAD_TIMESTAMP_UPDATE } from '../constants/dashboardConstants';

const reloadTimestamp = (state = '', action) => {
  switch (action.type) {
    case DASHBOARD_RELOAD_TIMESTAMP_UPDATE:
      return action.text;
    default:
      return state;
  }
};

const dashboardReducer = combineReducers({ reloadTimestamp });

export default dashboardReducer;
