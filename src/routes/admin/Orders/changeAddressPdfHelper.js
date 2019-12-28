import dateTrimmer from '../../../dateTrimmer';
import { PRICE_SIGNS } from '../../../constants/constantData';
const addressPdfMaker = function(publisherOrder, newAddress, newCO, newRN) {
  let header = `<div id="userInvoices" style="margin-bottom:30px; background-color: white" >
        
        <div style="display: flex;-ms-flex-wrap: wrap;
        flex-wrap: wrap;margin-right: -15px;
        margin-left: -15px;
        border-radius: 3px;
        margin: 6px;padding:3px;"">
          <div className="col-3">
            <img style="border-style: none;vertical-align: middle;" src="/assets/images/printLogo.png" />
          </div>
          <div style="    margin-left: 15%;flex: 0 0 33.333333%;
          max-width: 33.333333%;">
            <h2>Invoice</h2>
            <table style="border: 1px solid black;">
              <thead style="background-color: lightgray;border: 1px solid black;">
                <th id="title" width="40%">
                  'Customer No'
                </th>
                <th width="40%">Order No</th>
                <th width="60%"> Date</th>
              </thead>
              <tbody>
                <tr>
                  <td  style="text-align:center; border: 1px solid black;">${
                    publisherOrder.CustomerInvoice.User.id
                  }</td>
                  <td style="text-align:center; border: 1px solid black;">${
                    publisherOrder.id
                  }</td>
                  <td style="text-align:center; border: 1px solid black;">${dateTrimmer(
                    new Date(),
                  )} </td>
                </tr>
             
              </tbody>
            </table>
          </div>
        </div>
        <div style=" margin:5px;width: 100%;text-align:center;">
        <h1>Chagne Address</h1>
          
        </div>
        
      </div>`;
  let order = `<div
                style="display: flex;-ms-flex-wrap: wrap;
                      flex-wrap: wrap;border:1px solid #366e73;
                      border-radius: 3px;
                      margin: 6px;padding:3px;"
              >
                <h5
                  style="1px solid #3d405c;background-color: #4fb9ae;
                          margin-bottom: 0px;margin-top: 0px;flex: 0 0 100%;
                          font-size:15px;
                          max-width: 100%;
                          border-bottom:1px solid gray;"
                >
                  
                 Old Subscriber Address : 
                </h5>
    
                <div
                  style="padding: 5px;border-right: 1px solid #366e73;    
                         flex: 0 0 25%;
                         max-width: 65%;"
                >
                ${publisherOrder.recieptName}
                ${publisherOrder.contactPerson}
               
                ${publisherOrder.address.city}
                ${publisherOrder.address.detailAddress}
                ${publisherOrder.address.zipCode}
                ${publisherOrder.address.Country.label}
                </div>
                <div
                  style="       flex: 0 0 33.333333%;
          max-width: 33.333333%;padding:5px;"
                >
                <div>
                <label>Publication Title: &nbsp;</label>
                ${publisherOrder.Product.label}
              </div>
                  <div>
                    <label>Our Order No: &nbsp;</label>
                    ${publisherOrder.id}
                  </div>
                 
                  <div>
                    <label>Number Of Copies: &nbsp;</label>
                    ${publisherOrder.count}
                  </div>
                  <div>
                    <label>Terms Of Delivery:&nbsp;</label>
                    ${publisherOrder.deliveryType.label}
                  </div>
                  <div>
                    <label>Start Date : &nbsp;</label>
                    ${dateTrimmer(publisherOrder.startDate)}
                  </div>
                  <div>
                    <label>End Date :&nbsp; </label>
                    ${dateTrimmer(publisherOrder.endDate)}
                  </div>
                </div>
              </div>

              <div
                style="display: flex;-ms-flex-wrap: wrap;
                      flex-wrap: wrap;border:1px solid #366e73;
                      border-radius: 3px;
                      margin: 6px;padding:3px;"
              >
                <h5
                  style="1px solid #3d405c;background-color: #4fb9ae;
                          margin-bottom: 0px;margin-top: 0px;flex: 0 0 100%;
                          font-size:15px;
                          max-width: 100%;
                          border-bottom:1px solid gray;"
                >
                  
                 New Subscriber Address : 
                </h5>
    
                <div
                  style="padding: 5px;border-right: 1px solid #366e73;    
                         flex: 0 0 25%;
                         max-width: 25%;"
                >
                  
                ${newRN}
                  ${newCO}
                  ${newAddress.city}
                  ${newAddress.detailAddress}
                  ${newAddress.zipCode}
                  ${newAddress.Country.label}
                 
                </div>
          
                </div>
              </div>
              <div><h3>Note :</h3>   ${publisherOrder.publicationNote}</div>
              
              `;

  return header + order;
};

export { addressPdfMaker };
