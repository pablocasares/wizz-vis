/* eslint-disable import/prefer-default-export */

import { DASHBOARD_NAME_UPDATE } from '../constants/dashboardConstants';

export const updateName = (text) => ({
  type: DASHBOARD_NAME_UPDATE,
  text,
});
