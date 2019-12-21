import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import ReactDOM from 'react-dom/server';
// import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ReactPaginate from 'react-paginate';
import ContentHeader from '../../../components/User/ContentHeader';
import OrderTable from '../../../components/User/Tables/OrderTable';
import Spinner from '../../../components/User/Spinner';
import s from './Order.css';
import { SERVER, ORDER_SORT_OPTION } from '../constants';
import { fetchWithTimeOut } from '../../../fetchWithTimeout';
import history from '../../../history';
class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      pageIndex: 0,
      pageSize: 10,
      totalPageNum: '',
      sortBy: '',
      searchBy: {
        customerFirstName: '',
        customerLastName: '',
        customerEmail: '',
        publishers: [],
        productPeriods: '',
        paymentByCustomerStatus: '',
        newStatusNotSeenByAdmin: '',
        singlProductTypes: '',
        productType: '',
        productStatus: '',
        ageGroups: '',
        countRange: { min: '', max: '' },
        priceRange: { min: '', max: 999 },
        startDate: '',
        endDate: '',
        sortDate: false,
        sortPrice: false,
      },
      orders: [
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
        { id: 1, address1: 2 },
      ],
      // allCountries: [],
    };
    this.fetchOrders = this.fetchOrders.bind(this);
    this.test = this.test.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount() {
    this.fetchOrders();
  }
  handlePageChange(pageIndex) {
    this.setState({ pageIndex: pageIndex.selected }, () => {
      this.fetchOrders();
    });
  }
  onOrderClick(id) {
    history.push(`/user/order/${id}`);
  }
  goToClaimsofThisOrder(id) {
    history.push(`/user/claim/1`);
  }
  handleSelectChange = (selectedOption, op) => {
    let searchBy = { ...searchBy };
    (searchBy[op] = selectedOption.value),
      this.setState(
        {
          searchBy: searchBy,
        },
        () => {
          this.fetchOrders();
        },
      );
  };
  fetchOrders() {
    const url = `${SERVER}/getAllCustomerInvoicesOfSpecificUser`;
    this.setState({ isLoading: true });
    const credentials = {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize,
      // sortBy: this.state.sortBy.value,
      // searchBy: this.state.searchBy,
    };
    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const that = this;

    fetchWithTimeOut(
      url,
      options,
      response => {
        console.log('response : ', response.currentRecords);
        if (response.error === undefined) {
          that.setState({
            orders: response.currentRecords,
            totalPageNum: response.totalPageNum,
            isLoading: false,
          });
        } else {
          toastr.error(response.error.title, response.error.description);
        }
      },
      () => {
        // toastr.error('sala', ERRORS.REPEATED_USER);
        // console.log('login e rror : ', error);
      },
    );
  }
  test() {
    // window.alert('this is test pdf');
    // const records = this.state.orders.map((record, i) => (
    //   <tr>
    //     <td span="3" style={{ backgroundColor: 'red' }}>
    //       {record.id}
    //     </td>
    //     <td span="6"> {record.status.label}</td>
    //   </tr>
    // ));
    let rn = (
      <div id="hsan" className={`user-table-responsive ${s.userTable}`}>
        <table className={`user-table ${s.userHoverableTr}`}>
          <thead style={{ backgroundColor: 'green' }}>
            {' '}
            <tr>
              <th>Id</th>
              <th>Total Cost</th>
              <th>Total Price</th>
              <th>Discount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          {/* <tbody>{records} </tbody> */}
        </table>
      </div>
    );
    // console.log('hsan : ', document.getElementById('hsan'));
    // const string = ReactDOM.renderToString(rn);
    // console.log('test el: ', document.getElementById('hi'));
    // const pdf = new jsPDF('p', 'mm', 'a4');
    // pdf.addHTML(document.getElementById('hi'), function() {
    //   pdf.save('Test.pdf');
    // });
    // pdf.html(string);
    // pdf.save('pdf');
    const input = document.getElementById('hsan');
    const inputHeightMm = 300;
    // pxToMm(input.offsetHeight);
    const a4WidthMm = 210;
    const a4HeightMm = 297;
    const a4HeightPx = 300;
    // mmToPx(a4HeightMm);
    const numPages =
      inputHeightMm <= a4HeightMm
        ? 1
        : Math.floor(inputHeightMm / a4HeightMm) + 1;
    console.log({
      input,
      inputHeightMm,
      a4HeightMm,
      a4HeightPx,
      numPages,
      // range: range(0, numPages),
      // comp: inputHeightMm <= a4HeightMm,
      // inputHeightPx: input.offsetHeight,
    });
    const pdf = new jsPDF();
    html2canvas(input).then(canvas => {
      canvas.appendChild(input);
      // problem : canvas is empty
      console.log('canvas : ', canvas);

      const imgData = canvas.toDataURL('image/png');
      console.log('pdf : ', input);
      console.log('imgData : ', imgData);
      // Document of a4WidthMm wide and inputHeightMm high
      if (inputHeightMm > a4HeightMm) {
        // elongated a4 (system print dialog will handle page breaks)
        const pdf = new jsPDF('p', 'mm', [inputHeightMm + 16, a4WidthMm]);
      } else {
        // standard a4

        const pdf = new jsPDF();
      }

      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save(`502.pdf`);
    });
  }
  render() {
    return (
      <div>
        {' '}
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div id="hi" className="container-fluid">
            <ContentHeader
              title="Order List"
              hasSort={true}
              onSortFunc={this.handleSelectChange}
              sortOptions={ORDER_SORT_OPTION}
            />
            <div id="hsan" className={`user-table-responsive ${s.userTable}`}>
              <table className={`user-table ${s.userHoverableTr}`}>
                <thead style={{ backgroundColor: 'green' }}>
                  {' '}
                  <tr>
                    <th>Id</th>
                    <th>Total Cost</th>
                    <th>Total Price</th>
                    <th>Discount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {/* <tbody>{records} </tbody> */}
              </table>
            </div>
            <OrderTable
              onRecordClick={this.onOrderClick}
              records={this.state.orders}
            />
            <button onClick={this.test}>test me</button>
            <div className="row">
              <div className="offset-xl-7 col-5 ">
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  pageCount={this.state.totalPageNum}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageChange}
                  containerClassName="user-paginate"
                  subContainerClassName="user-pages user-paginate"
                  activeClassName="user-active-page"
                  breakClassName="break-me"
                  initialPage={this.state.pageIndex}
                  disableInitialCallback
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withStyles(s)(Order);
