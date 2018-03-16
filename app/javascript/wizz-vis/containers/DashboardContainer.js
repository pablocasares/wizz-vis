import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import * as actions from '../actions/dashboardActionCreators';

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state) => ({ name: state.name });

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
export default connect(mapStateToProps, actions)(Dashboard);
