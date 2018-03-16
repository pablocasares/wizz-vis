import { createStore } from 'redux';
import dashboardReducer from '../reducers/dashboardReducer';

const configureStore = (railsProps) => (
  createStore(dashboardReducer, railsProps)
);

export default configureStore;
