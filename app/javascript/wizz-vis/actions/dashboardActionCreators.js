/* eslint-disable import/prefer-default-export */

import { DASHBOARD_RELOAD_TIMESTAMP_UPDATE } from '../constants/dashboardConstants';

export const updateReloadTimestamp = (text) => ({
  type: DASHBOARD_RELOAD_TIMESTAMP_UPDATE,
  text,
});
