import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import Select from 'react-select';
import s from './ContentHeader.css';

class ContentHeader extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    hasSort: PropTypes.bool.isRequired,
    sortOptions: PropTypes.array.isRequired,
    onSortFunc: PropTypes.func.isRequired,
    hasDesc: PropTypes.bool.isRequired,
    description: PropTypes.string,
  };

  render() {
    return (
      <div className={`container-fluid ${s.container}`}>
        <div className="row">
          <div className={`${s.title} col-xl-8 col-lg-8 col-md-4 col-sm-4`}>
            {this.props.title}
          </div>
          {this.props.hasSort ? (
            <div
              className={`col-xl-4 col-lg-4 col-md-8 col-sm-8 ${s.sortLabel}`}
            >
              <div className="row">
                {' '}
                <div className={`col-xl-4 ${s.label}`}>
                  <span>Sort By :</span>
                </div>
                <div className="col-xl-7">
                  <Select
                    options={this.props.sortOptions}
                    onChange={so => {
                      this.props.onSortFunc(so, 'sortBy');
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        {this.props.hasDesc ? (
          <div className="row">
            <div className={`col-11 ${s.desc}`}>{this.props.desc}</div>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default withStyles(s)(ContentHeader);
