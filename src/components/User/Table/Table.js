import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import s from './Table.css';

class Table extends React.Component {
  static propTypes = {
    pageCount: PropTypes.number.isRequired,
    currentPageNumber: PropTypes.number.isRequired,
    records: PropTypes.array.isRequired,
    columnLabels: PropTypes.array.isRequired,
    recordItemNames: PropTypes.array.isRequired,
    onRecordClick: PropTypes.func.isRequired,
    handlePageChange: PropTypes.func.isRequired,
  };

  render() {
    const tableHeaders = this.props.columnLabels.map((label, i) => (
      <th>{label}</th>
    ));
    let records = '';
    let toDisplay = <div className={s.noRecords}> No Match Found</div>;
    if (this.props.records !== undefined && this.props.records.length !== 0) {
      records = this.props.records.map((record, i) => (
        <tr
        // onClick={() =>
        //   this.commentDetails(comment.productName, comment.text)
        // }
        // class="btn btn-primary"

        onClick={() => {
          this.props.onRecordClick(record.id, record.customerOrderId);
        }}
        >
          {this.props.recordItemNames.map(
            label =>
              label === 'profilePic' ? (
                <td>
                  <img
                    class={s.profilePicContiner}
                    src={record[label]}
                    width="50"
                    height="50"
                  />
                </td>
              ) : (
                <td>{record[label]}</td>
              ),
          )}
        </tr>
      ));
      // table-hover
      toDisplay = (
        <div className={`user-table-responsive ${s.userTable}`}>
          <table className={`user-table ${s.userHoverableTr}`}>
            <thead className={s.tableHeader}>{tableHeaders}</thead>
            <tbody>{records} </tbody>
          </table>
        </div>
      );
    }

    return (
      <div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-6 col-sm-12 col-12" />
          {toDisplay}
        </div>
        {/* Pagination */}
        <div className="row">
          <div className="col-5">
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              pageCount={this.props.pageCount}
              pageRangeDisplayed={3}
              onPageChange={this.props.handlePageChange}
              containerClassName="user-paginate"
              subContainerClassName="user-pages user-paginate"
              activeClassName="user-active-page"
              breakClassName="break-me"
              initialPage={this.props.currentPageNumber}
              disableInitialCallback
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Table);
