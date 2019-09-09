/* eslint-disable import/prefer-default-export */

const USER_SUBCATEGORY_ARRAY = [
  { id: 1, value: 1, name: 'Library', label: 'Library' },
  { id: 2, value: 2, name: 'Government', label: 'Government' },
  { id: 3, value: 3, name: 'School', label: 'School' },
  { id: 4, value: 4, name: 'Corporation', label: 'Corporation' },
  { id: 5, value: 5, name: 'Single Customer', label: 'Single Customer' },
  { id: 6, value: 6, name: 'Private', label: 'Private' },
  { id: 7, value: 7, name: 'Public', label: 'Public' },
  { id: 8, value: 8, name: 'Super Admin', label: 'Super Admin' },
  { id: 9, value: 9, name: 'Operator', label: 'Operator' },
];

const ROLES_ARRAY = [
  { id: 1, value: 1, label: 'SuperAdmin', name: 'SuperAdmin' },
  { id: 2, value: 2, label: 'Operator', name: 'Operator' },
  { id: 3, value: 3, label: 'Publisher', name: 'Publisher' },
  { id: 4, value: 4, label: 'Customer', name: 'Customer' },
];
const USER_ACTIVITION_STATUS_ARRAY = [
  { id: 1, value: 4, label: 'waitForApproval', name: 'wait For Approval' },
  { id: 2, value: 1, label: 'active', name: 'active' },
  { id: 3, value: 2, label: 'deactive', name: 'deactive' },
  { id: 4, value: 3, label: 'approved', name: 'approved' },
];
const USER_ACTIVITION_STATUS = {
  WAITFORAPPROVAL: 1,
  ACTIVE: 2,
  DEACTIVE: 3,
};
const CLAIM_STATUS = {
  OPEN: false,
  ISFINISHED: true,
};
const CLAIM_STATUS_ARRAY = [
  { value: 0, label: 'Open' },
  { value: 1, label: 'Finished' },
];
const PRODUCT_PERIOD_ARRAY = [
  { id: 1, value: 1, name: 'Daily', label: 'Daily' },
  { id: 2, value: 2, name: 'Weekly', label: 'Weekly' },
  { id: 3, value: 3, name: 'TwoWeekly', label: 'TwoWeekly' },
  { id: 4, value: 4, name: 'ThreeWeekly', label: 'ThreeWeekly' },
  { id: 5, value: 5, name: 'Monthly', label: 'Monthly' },
  { id: 6, value: 6, name: 'SixMonthly', label: 'SixMonthly' },
  { id: 7, value: 7, name: 'Yearly', label: 'Yearly' },
];
const SINGLE_PRODUCT_TYPE_ARRAY = [
  { id: 1, value: 1, name: 'Journal', label: 'Journal' },
  { id: 2, value: 2, name: 'Magazine', label: 'Magazine' },
  { id: 3, value: 3, name: 'EMagazine', label: 'EMagazine' },
  { id: 4, value: 4, name: 'ImageCollection', label: 'ImageCollection' },
  { id: 5, value: 5, name: 'Archive', label: 'Archive' },
  { id: 6, value: 6, name: 'Catalouge', label: 'Catalouge' },
];
const PRODUCT_STATUS_ARRAY = [
  {
    id: 1,
    value: 1,
    label: 'WaitForAcceptByAdmin',
    name: 'Wait For AcceptBy Admin',
  },
  { id: 2, value: 2, label: 'Ready', name: 'Ready' },
  { id: 3, value: 3, label: 'NotAvailable', name: 'Not Available' },
];
const PRODUCT_TYPE_ARRAY = [
  { id: 1, value: 1, label: 'SingleProduct', name: 'SingleProduct' },
  { id: 2, value: 2, label: 'Package', name: 'Package' },
];
const PUBLISHER_ORDER_STATUS_ARRAY = [
  { value: 1, id: 1, name: 'Delayed', label: 'Delayed' },
  { value: 2, id: 2, name: 'Deflicted', label: 'Deflicted' },
  { value: 3, id: 3, name: 'Cancel', label: 'Cancel' },
  { value: 4, id: 4, name: 'Accept', label: 'Accept' },
  { value: 5, id: 5, name: 'Sent', label: 'Sent' },
  { value: 6, id: 6, name: 'Delivered', label: 'Delivered' },
];
const MESSAGE_STATUS_ARRAY = [
  { id: 1, value: 1, name: 'SeenByAdmin', label: 'Seen By Admin' },
  { id: 2, value: 2, name: 'Rejected', label: 'Rejected' },
  { id: 3, value: 3, name: 'Accepted', label: 'Accepted' },
  { id: 4, value: 4, name: 'Pending', label: 'Pending' },
];
const MESSAGE_STATUS = {
  SeenByAdmin: 1,
  Rejected: 2,
  Accepted: 3,
  Pending: 4,
};
const PAYMENT_STATUS_ARRAY = [
  { value: 1, id: 1, name: 'Full Payment', label: 'Full Payment' },
  { value: 2, id: 2, name: 'Partial Payment', label: 'Partial Payment' },
  { value: 3, id: 3, name: 'No Payment', label: 'No Payment' },
];

const USER_NUMBER_ARRAY = [
  { value: 'Mobile Number', label: 'Mobile Number' },
  { value: 'Phone Number', label: 'Phone Number' },
  { value: 'Fax Number', label: 'Fax Number' },
];
const CLAIMS_COLUMNS_LABELS_ARRAY = [
  'Id',
  'Order Id',
  'Sender',
  'Receiver',
  'Message Status',
  'Replied to',
];
const CLAIMS_RECORDE_ITEM_NAMES_ARRAY = [
  'id',
  'customerOrderId',
  'senderUserName',
  'receiverUserName',
  'msgStatus',
  'repliedMsgId',
];
const ACCOUNTS_COLUMNS_LABELS_ARRAY = [
  'Avatar',
  'Id',
  'First Name',
  'Last Name',
  'Username',
  'Email',
];
const ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY = [
  'profilePic',
  'id',
  'firstName',
  'lastName',
  'username',
  'email',
];
export {
  USER_SUBCATEGORY_ARRAY,
  USER_ACTIVITION_STATUS_ARRAY,
  ROLES_ARRAY,
  PRODUCT_PERIOD_ARRAY,
  SINGLE_PRODUCT_TYPE_ARRAY,
  PRODUCT_STATUS_ARRAY,
  PRODUCT_TYPE_ARRAY,
  PUBLISHER_ORDER_STATUS_ARRAY,
  USER_NUMBER_ARRAY,
  MESSAGE_STATUS_ARRAY,
  PAYMENT_STATUS_ARRAY,
  CLAIMS_COLUMNS_LABELS_ARRAY,
  CLAIMS_RECORDE_ITEM_NAMES_ARRAY,
  ACCOUNTS_COLUMNS_LABELS_ARRAY,
  ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY,
  USER_ACTIVITION_STATUS,
  CLAIM_STATUS,
  MESSAGE_STATUS,
  CLAIM_STATUS_ARRAY,
};
