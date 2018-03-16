import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import request from 'axios';
import {Responsive, WidthProvider} from 'react-grid-layout';
import WidgetBase from './WidgetBase';
import Clock from './Clock';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const COLS = { lg: 12, md: 12, sm: 12, xs: 1, xxs: 1 };
const ROWHEIGHT = 100;

export default class Dashboard extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired, // this is passed from the Rails view
  };

  constructor(props) {
    super(props);

    this.state = {
      $$widgets: [],
      layout: null,
      fetchWidgetsError: null,
      updateLayoutError: null,
      reloadTimestamp: null,
      name: this.props.name
    };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  componentDidMount() {
    this.fetchWidgets();
    this.setState({
      isDraggable: this.isDraggable()
    })
  }

  fetchWidgets() {
    return (
      request
        .get('/dashboards/' + this.props.id + '/widgets.json', { responseType: 'json' })
        .then(res => this.setState({
          $$widgets: res.data,
          layout: res.data.map((w) => {
            return { i: w.id.toString(), x: w.col, y: w.row, w: w.size_x, h: w.size_y }
          })
        }))
        .catch(error => this.setState({ fetchWidgetsError: error }))
    );
  }

  onLayoutChange(layout) {
    if (!this.isDraggable()) return true;

    fetch(
      '/dashboards/' + this.props.id + '/layout.json',
      {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layout: layout })
      }
    )
    .then(response => this.setState({ layout: layout }))
    .catch(error => this.setState({ updateLayoutError: error }));
  }

  isDraggable() {
    const node = ReactDOM.findDOMNode(this);
    return node.offsetWidth >= BREAKPOINTS.sm && !Modernizr.touchevents
  }

  fireReload () {
    this.setState({ reloadTimestamp: Date.now() })
  }

  render () {
    // layout is an array of objects, see the demo for more complete usage
    const layout = { lg: (this.state.layout || []) };

    const widgets = this.state.$$widgets.map((w, index) => {
                      return <div key={ w.id }>
                              <WidgetBase {...w}
                                theme={this.props.theme}
                                height={ layout.lg[index].h * ROWHEIGHT }
                                reloadTimestamp={this.state.reloadTimestamp} />
                             </div>;
                    });

    return (
    <div>
      <Clock clockReload={ this.fireReload.bind(this) } interval={ this.props.interval }/>

      <ResponsiveReactGridLayout
        className={'layout ' + this.props.theme}
        isDraggable={ this.state.isDraggable }
        isResizable={ this.state.isDraggable }
        layouts={layout}
        rowHeight={ROWHEIGHT}
        breakpoints={BREAKPOINTS}
        cols={COLS}
        draggableHandle=".widget-title"
        onLayoutChange={ (layout) => this.onLayoutChange(layout) }>

        { widgets }

      </ResponsiveReactGridLayout>
      <h3>
        Hello, {this.state.name}!
      </h3>
      <hr />
      <form >
        <label htmlFor="name">
          Say hello to:
        </label>
        <input
          id="name"
          type="text"
          value={this.state.name}
          onChange={(e) => this.updateName(e.target.value)}
        />
      </form>
    </div>
    )
  }
}
