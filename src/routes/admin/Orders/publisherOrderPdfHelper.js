import dateTrimmer from '../../../dateTrimmer';
import { PRICE_SIGNS } from '../../../constants/constantData';
const pdfMaker = function(publisherOrder, title, code) {
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
                  ${code == 2 ? 'Publisher No' : 'Customer No'}
                </th>
                <th width="40%">Order No</th>
                <th width="60%"> Date</th>
              </thead>
              <tbody>
                <tr>
                  <td  style="text-align:center; border: 1px solid black;">${
                    code == 2
                      ? publisherOrder.OrderForPublisher.User.id
                      : publisherOrder.CustomerInvoice.User.id
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
        <h1>${title}</h1>
          
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
                  
                 Order Inforamtion : Publication Title : ${
                   publisherOrder.Product.label
                 }
                </h5>
    
                <div
                  style="padding: 5px;border-right: 1px solid #366e73;    
                         flex: 0 0 25%;
                         max-width: 25%;"
                >
                  <b>Reciever : </b> <br />
                  ${publisherOrder.recieptName}
                  ${publisherOrder.contactPerson}
                  ${publisherOrder.address.city}
                  ${publisherOrder.address.detailAddress}
                  ${publisherOrder.address.zipCode}
                  ${publisherOrder.address.countryId}
                </div>
                <div
                  style="       flex: 0 0 33.333333%;
          max-width: 33.333333%;padding:5px;"
                >
                  <div>
                    <label>Order No: &nbsp;</label>
                    ${publisherOrder.id}
                  </div>
                  <div>
                    <label>User Order No: &nbsp;</label>
                    ${publisherOrder.CustomerInvoice.id}
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
    
                <div className="col-xl-4 col-lg-5 col-md-6 ">
                  <div>
                    <label>Price: &nbsp;</label>
                    ${publisherOrder.price[publisherOrder.currencyId - 1]} 
                    
                  </div>  
                  <div>
                    <label>Tac: &nbsp;</label>
                    ${publisherOrder.tax[publisherOrder.currencyId - 1]} 
                    
                  </div> 
                  <div>
                    <label>Postal Cost: &nbsp;</label>
                     ${
                       publisherOrder.totalDeliveryCost[
                         publisherOrder.currencyId - 1
                       ]
                     }
                    ${PRICE_SIGNS[publisherOrder.currencyId]}
                  </div>
                  <div>
                    <label>Discount: &nbsp;</label>
                    ${publisherOrder.discount[publisherOrder.currencyId - 1]} ${
    PRICE_SIGNS[publisherOrder.currencyId]
  }
                  </div>
                </div>
              </div>
              
              
              `;

  let footer = `<div style=" margin:5px;width: 100%;margin-top:20px">
          <table style= "width:100%; border: 1px solid black;">
            <thead style="background-color: lightgray; border: 1px solid black;">
              <th style="padding:3px;text-align:center; " >
                Amount
              </th>
              <th style="padding:3px;text-align:center;">Date</th>
              <th style="padding:3px;text-align:center;">Method</th>
    
            
    
            </thead>
            <tbody>
              <tr>
                <td style="text-align:center; border: 1px solid black;">${
                  publisherOrder.OrderForPublisher.totalPrice
                } </td>
                <td style="text-align:center; border: 1px solid black;">${dateTrimmer(
                  publisherOrder.OrderForPublisher.createdAt,
                )}</td>
                <td style="text-align:center; border: 1px solid black;">${
                  publisherOrder.OrderForPublisher.paymentMethod
                }</td>
                
                
              </tr>
      
            </tbody>
          </table>
        
        </div>`;

  return header + order + footer;
};

export { pdfMaker };
