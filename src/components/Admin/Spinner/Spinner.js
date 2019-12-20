import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Spinner.css';

class Spinner extends React.Component {
  render() {
    return (
      <div
        className={`col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12 ${
          s.spinnerContainer
        }`}
      >
        {/* <div className="card-body"> */}
        <span className="dashboard-spinner spinner-primary spinner-xxl" />
        {/* </div> */}
      </div>
    );
  }
}
export default withStyles(s)(Spinner);
