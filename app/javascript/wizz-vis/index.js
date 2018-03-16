import ReactOnRails from 'react-on-rails';

import DashboardApp from './startup/DashboardApp';
import WidgetBase from './components/WidgetBase';
import Clock from './components/Clock';

ReactOnRails.register({
  DashboardApp,
  WidgetBase,
  Clock
});
