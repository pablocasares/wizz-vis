import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import * as actions from '../actions/dashboardActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({ reloadTimestamp: state.reloadTimestamp });

// Don't forget to actually use connect!
// Note that we don't export Dashboard, but the redux "connected" version of it.
export default connect(mapStateToProps, actions)(Dashboard);
