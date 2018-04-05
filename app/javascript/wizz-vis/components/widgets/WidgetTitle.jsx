/* jshint esversion: 6 */

import React, { Component } from 'react';
import WidgetDrilldown from './WidgetDrilldown';
import WidgetRefresh from './WidgetRefresh';
import cs from 'classnames';

export default class WidgetTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  get haveLinks(){
    return this.props.links !== undefined;
  }

  get isLocked() {
    return this.props.locked;
  }

  render () {
    let cssClass = cs(
      'widget-title',
      {
        'locked': this.isLocked
      }
    );

    return (
      <div className={ cssClass }>
        {
          this.haveLinks ?
            <WidgetDrilldown widget_id={this.props.widget_id} links={this.props.links} /> :
            null
        }
        { this.props.title }
        <WidgetRefresh widget_id={this.props.widget_id} />
      </div>
    )
  }
}
