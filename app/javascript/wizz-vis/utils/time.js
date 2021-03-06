/* jshint esversion: 6 */

import * as moment from 'moment';

const ONE_DAY = 24 * 3600 * 1000;
const TWO_DAYS = 2 * 24 * 3600 * 1000;

export default {
  moment(time) {
    return moment(time);
  },

  difference(time_1, time_2) {
    const difference = moment(time_1).diff(moment(time_2));
    return Math.abs(difference);
  },

  simple_format(time){
    return moment(time).format('YYYY-MM-DD HH:mm');
  },

  format(time, interval) {
    const range =
      moment(interval[1]).diff(moment(interval[0]));
    const past_year =
      moment().year() - moment(interval[1]).year() > 0;
    const past_day =
      moment().day() - moment(interval[1]).day() > 0;

    if (range > TWO_DAYS) {
      return moment(time).format(`${past_year ? 'YYYY/MM/DD' : 'MM/DD'}`);
    } else if (range > ONE_DAY) {
      return moment(time).format(`${past_year ? 'YYYY/MM/DD HH:mm' : 'MM/DD HH:mm'}`);
    } else {
      return moment(time).format(
        `${past_year ? 'YYYY/MM/DD HH:mm' : past_day ? 'MM/DD HH:mm' : 'HH:mm'}`
      );
    }
  },

  gap(time_1, time_2, interval) {
    const step = moment(time_2).diff(moment(time_1));
    const range =
      moment(interval[1]).diff(moment(interval[0]));

    if (range > TWO_DAYS) {
      return (ONE_DAY / step) - 1;
    } else {
      return (60 * 1000 / step) - 1;
    }

  },

  step(time_1, time_2) {
    return moment(time_2).diff(moment(time_1));
  },

  /**
   * Return the difference in the format %d hr %d min between
   * two datetime passed as arguments.
   *
   * @param {string} time_1
   * @param {string} time_2
   * @returns {string}
   */
  duration(time_1, time_2) {
    return moment.utc(
      moment(time_2).diff(moment(time_1))
    ).format("H [hr] m [min]");
  }
};
