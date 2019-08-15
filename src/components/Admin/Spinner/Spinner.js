import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Spinner.css';

class Spinner extends React.Component {
  render() {
    return (
      <div className={`col-5-xs ${s.spinnerContainer}`}>
        <div class="card-body">
          <span class="dashboard-spinner spinner-primary spinner-xxl" />
        </div>
      </div>
    );
  }
}
export default withStyles(s)(Spinner);
