import dateTrimmer from '../../../dateTrimmer';
import { PRICE_SIGNS } from '../../../constants/constantData';
const pdfMaker = function(publisherOrder, titles) {
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
                Publisher Order  No
                </th>
                <th width="60%">Publisher Order  Date</th>
              </thead>
              <tbody>
                <tr>
                  <td  style="text-align:center; border: 1px solid black;">${
                    publisherOrder.id
                  }</td>
                 
                  <td style="text-align:center; border: 1px solid black;">${dateTrimmer(
                    publisherOrder.createdAt,
                  )} </td>
                </tr>
             
              </tbody>
            </table>
          </div>
        </div>
        <div style=" margin:5px;width: 100%;">
          <table style= "width:100%; border: 1px solid black;">
            <thead style="background-color: lightgray; border: 1px solid black;">
              <th id="title" width="40%">
                Publisher
              </th>
              
            </thead>
            <tbody>
              <tr>
                <td style="text-align:center; border: 1px solid black;">
                ${titles}
                                <br />
                                <b>Attn: </b>
                                ${publisherOrder.User.companyName}
                                <br />
                                ${publisherOrder.User.hompage}
                                <br />
                                ${publisherOrder.User.Country.name}
                                ${publisherOrder.User.address.province}
                                ${publisherOrder.User.address.city}
                                ${publisherOrder.User.address.detailAddress}
                                ${publisherOrder.User.address.zipCode}
                
                </td>
               
              </tr>
      
            </tbody>
          </table>
        </div>
        
      </div>`;
  let invoices = publisherOrder.orders.orders
    .map(
      order =>
        `<div
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
                  
                  Publication Title : ${order.Product.label}
                </h5>
    
                <div
                  style="padding: 5px;border-right: 1px solid #366e73;    
                         flex: 0 0 25%;
                         max-width: 25%;"
                >
                  <b>Reciever : </b> <br />
                  ${order.Address.province}
                  ${order.Address.city}
                  ${order.Address.detailAddress}
                  ${order.Address.zipCode}
                  ${order.Address.Country.label}
                </div>
                <div
                  style="       flex: 0 0 33.333333%;
          max-width: 33.333333%;padding:5px;"
                >
                  <div>
                    <label>Our Order No: &nbsp;</label>
                    ${order.id}
                  </div>
              
                  <div>
                    <label>Number Of Copies: &nbsp;</label>
                    ${order.count}
                  </div>
                  <div>
                    <label>Terms Of Delivery:&nbsp;</label>
                    ${order.DeliveryType.label}
                  </div>
                  <div>
                    <label>Start Date : &nbsp;</label>
                    ${dateTrimmer(order.startDate)}
                  </div>
                  <div>
                    <label>End Date :&nbsp; </label>
                    ${dateTrimmer(order.endDate)}
                  </div>
                </div>
    
                <div className="col-xl-4 col-lg-5 col-md-6 ">
                  <div>
                    <label>Price: &nbsp;</label>
                    ${order.totalToBePaid[publisherOrder.User.Currency.id - 1]}
                    ${PRICE_SIGNS[publisherOrder.User.Currency.id]}
                  </div>
                
                </div>
              </div>
              
              
              `,

      // `<div>
      //   <div>Name: ${user.name}</div>
      //   <div>Age: ${user.age}</div>
      //   <div>Place: ${user.place}</div>
      //   <div>Country: ${user.country}</div>
      //   <div>Avatar: ${user.avatar}</div>
      // </div>`
    )
    .join('');
  let footer = `<div style=" margin:5px;width: 100%;margin-top:20px">
          <table style= "width:100%; border: 1px solid black;">
            <thead style="background-color: lightgray; border: 1px solid black;">
              
              <th style="padding:3px;text-align:center;">Amount</th>
              <th style="padding:3px;text-align:center;">Date</th>
    
              <th style="padding:3px;text-align:center;">Payment Method</th>
              <th style="padding:3px;text-align:center;">Information</th>
  
    
            </thead>
            <tbody>
              <tr>
                <td style="text-align:center; border: 1px solid black;">${
                  publisherOrder.totalCost
                }</td>
                <td style="text-align:center; border: 1px solid black;">${dateTrimmer(
                  publisherOrder.createdAt,
                )}</td>
                <td style="text-align:center; border: 1px solid black;">${
                  publisherOrder.paymentMethod
                }</td>
                
                
                <td style="text-align:center; border: 1px solid black;">
                ${publisherOrder.description} %
                </td>
               
              </tr>
      
            </tbody>
          </table>
          <div style="float:right;margin-top:20px;margin-right:10px;font-size:16px;padding:8px;border:1px solid black;">Total : 
          ${
            publisherOrder.orders.totalInPrice[
              publisherOrder.User.Currency.id - 1
            ]
          }  ${PRICE_SIGNS[publisherOrder.User.Currency.id]}
          </div>
        </div>`;

  return header + invoices + footer;
};

export { pdfMaker };
