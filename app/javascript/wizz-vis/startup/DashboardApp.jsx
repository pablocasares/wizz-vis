import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../store/dashboardStore';
import DashboardContainer from '../containers/DashboardContainer';

// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
const DashboardApp = (props) => (
  <Provider store={configureStore(props)}>
    <DashboardContainer {...props} />
  </Provider>
);

export default DashboardApp;
