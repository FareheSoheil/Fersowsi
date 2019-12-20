import adminPriceTrimmer from '../../../../adminPriceTrimmer';
import dateTrimmer from '../../../../dateTrimmer';
import React from 'react';
import { PRICE_SIGNS } from '../../../../constants/constantData';
const printHelper = function(record) {
  let res = (
    <div id="printClaim">
      <div className="row">
        <div className="col-3">
          <img src="/assets/images/printLogo.png" />
        </div>
        <div className="offset-5 col-4">
          <h4>Claim</h4>
          <table>
            <thead style={{ backgroundColor: 'lightGray' }}>
              <th id="title" width="60">
                Publisher No
              </th>
              <th width="60">Order No</th>
              <th width="160">Date</th>
            </thead>
            <tbody>
              <td>1</td>
              <td>2</td>
              <td>3</td>
            </tbody>
          </table>
        </div>
      </div>
      {/* ${s.mainContainer}  ${s.title} ${s.reciever} */}
      <h2 style={{ fontSize: '20px', textAlign: 'center' }}>Claim</h2>
      <div className={`row mt-3 `}>
        <h5 className={`col-12`}> Order Information : </h5>
        <div className={`col-xl-7 col-lg-5 col-md-6 `}>
          <b>Subscriber Address: </b> <br />
          {record.reciever}
        </div>
        <div className="col-xl-4 col-lg-5 col-md-6 ">
          <div>
            <label>Publication Title: &nbsp;</label>
            {record.title}
          </div>
          <div>
            <label>Our Order No: &nbsp;</label>
            {record.orderNo}
          </div>

          <div>
            <label>Number Of Copies: &nbsp;</label>
            {record.count}
          </div>
          <div>
            <label>Terms Of Delivery No:&nbsp;</label>
            {/* {record.deliveryType.label} */}
          </div>
          <div>
            <label>Start Date : &nbsp;</label>
            {dateTrimmer(record.startDate)}
          </div>
          <div>
            <label>Enda Date :&nbsp; </label>
            {dateTrimmer(record.endDate)}
          </div>
        </div>
      </div>
      {/* ${s.mainContainer} ${s.title} */}
      <div className={`row mt-3 `}>
        <h5 className={`col-12 `}> Payment Information : </h5>

        <div className="col-xl-4 col-lg-5 col-md-6 ">
          <div>
            <label>Amount: &nbsp;</label>
            {record.title}
            {PRICE_SIGNS[record.currencyId - 1]}
          </div>
          <div>
            <label>Date: &nbsp;</label>
            {record.orderNo}
          </div>

          <div>
            <label>Method: &nbsp;</label>
            {record.count}
          </div>
        </div>
      </div>
    </div>
  );
  return res;
};
export default printHelper;
