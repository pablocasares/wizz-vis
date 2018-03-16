import { combineReducers } from 'redux';
import { DASHBOARD_NAME_UPDATE } from '../constants/dashboardConstants';

const name = (state = '', action) => {
  switch (action.type) {
    case DASHBOARD_NAME_UPDATE:
      return action.text;
    default:
      return state;
  }
};

const dashboardReducer = combineReducers({ name });

export default dashboardReducer;
