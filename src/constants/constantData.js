/* eslint-disable import/prefer-default-export */

const PRODUCT_SORT_OPTIONS = [
  { value: 1, label: 'Weight' },
  { value: 2, label: 'Date' },
  { value: 3, label: 'Privce' },
];
const USER_SUBCATEGORY_ARRAY = [
  { value: 1, name: 'Library', label: 'Library' },
  { value: 2, name: 'Government', label: 'Government' },
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
const ROLES = {
  customer: { label: 'Customer', value: 4 },
  operator: { label: 'Operator', value: 2 },
  publisher: { label: 'Publisher', value: 3 },
};
const USER_ACTIVITION_STATUS_ARRAY = [
  { id: 1, value: 4, label: 'Wait For Approval', name: 'Wait For Approval' },
  { id: 2, value: 1, label: 'Active', name: 'Active' },
  { id: 3, value: 2, label: 'Deactive', name: 'Deactive' },
  { id: 4, value: 3, label: 'Approved', name: 'Approved' },
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
    label: 'Wait For Accept By Admin',
    name: 'Wait For AcceptBy Admin',
  },
  { id: 2, value: 2, label: 'Ready', name: 'Ready' },
  { id: 3, value: 3, label: 'Not Available', name: 'Not Available' },
];
const PRODUCT_STATUS = {
  Pending: {
    value: 1,
    label: 'Wait For Accept By Admin',
  },
  Ready: { value: 2, label: 'Ready' },
  NotAvailable: { value: 3, label: 'Not Available' },
};
const PRODUCT_TYPE_ARRAY = [
  { id: 1, value: 1, label: 'Single Product', name: 'SingleProduct' },
  { id: 2, value: 2, label: 'Package', name: 'Package' },
];
const PRODUCT_TYPES = { Single: 1, Package: 2 };

const PUBLISHER_ORDER_STATUS_ARRAY = [
  { value: 2, id: 3, name: 'Cancelled', label: 'Cancelled' },
  { value: 1, label: 'Accepted' },
];

const PUBLISHER_ORDER_STATUS = {
  Cancelled: { value: 2, label: 'Cancelled' },
  Accepted: { value: 1, label: 'Accepted' },
};
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
const CUSTOMER_ORDER_STATUS_ARRAY = [
  {
    value: 1,

    label: 'New',
  },
  {
    value: 2,
    label: 'Ignored',
  },
  {
    value: 3,
    label: 'Cancelled',
  },
  {
    value: 4,
    label: 'Delayed',
  },
  {
    value: 5,
    label: 'In Progress',
  },
  {
    value: 6,
    label: 'Done',
  },
];

const CUSTOMER_ORDER_STATUS = {
  New: {
    value: 1,

    label: 'New',
  },
  Ignored: {
    value: 2,
    label: 'Ignored',
  },
  Cancelled: {
    value: 3,
    label: 'Cancelled',
  },
  Delayed: {
    value: 4,
    label: 'Delayed',
  },
  InProgress: {
    value: 5,
    label: 'In Progress',
  },
  Done: {
    value: 6,
    label: 'Done',
  },
};

const USER_NUMBER_ARRAY = [
  { value: 'Mobile Number', label: 'Mobile Number' },
  { value: 'Phone Number', label: 'Phone Number' },
  { value: 'Fax Number', label: 'Fax Number' },
];
const CLAIMS_COLUMNS_LABELS_ARRAY = [
  'Id',
  'Order Id',
  'Customer',
  'Publisher',
  'Is Finished',
];
const CLAIMS_RECORDE_ITEM_NAMES_ARRAY = [
  'id',
  'customerOrderId',
  'customerName',
  'publisherName',
  'isFinished',
];

const ACCOUNTS_COLUMNS_LABELS_ARRAY = [
  'Avatar',
  'Id',
  'First Name',
  'Last Name',
  'Contract Name',
  'Email',
];
const ACCOUNTS_RECORDE_ITEM_NAMES_ARRAY = [
  'profilePic',
  'id',
  'firstName',
  'lastName',
  'contractName',
  'email',
];

const PRODUCT_COLUMNS_LABELS_ARRAY = [
  'Id',
  'Cover',
  'ISSN',
  'Title',
  'Publisher',
  'Country',
];
const PRODUCT_RECORD_ITEM_NAMES_ARRAY = [
  'id',
  'coverImage',
  'issn',
  'originalTitle',
  'publisher',
  'country',
];

const CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAY = [
  'Id',
  'Delivery Cost',
  'Total Price',
  'Status',
  'Discount',
];
const CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY = [
  'id',
  'totalDeliveryCost',
  'totalPrice',
  'status',
  'discount',
];
const PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY = [
  'Id',
  'Count',
  'Customer Order Id',
  'Product Id',
  'Start Date',
  'End Date',
];
const PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY = [
  'id',
  'count',
  'customerOrderId',
  'productId',
  'startDate',
  'endDate',
];
const COUNTRIES_COLUMNS_LABELS_ARRAY = [
  'Id',
  'Name',
  'Nice Name',
  'ISO',
  'ISO3',
  'Num Code',
  'Phone Code',
];
const COUNTRIES_RECORDE_ITEM_NAMES_ARRAY = [
  'id',
  'name',
  'niceName',
  'iso',
  'iso3',
  'numcode',
  'phonecode',
];
const CURRENCIES_COLUMNS_LABELS_ARRAY = [
  'Id',
  'Name',
  'USD Ratio',
  'Abbriviation',
  'Is Automatic',
];
const CURRENCIES_RECORDE_ITEM_NAMES_ARRAY = [
  'id',
  'name',
  'usdRatio',
  'abbr',
  'isAutomatic',
];
const SETTING_ITEM_RECORD_ITEM_NAMES = ['value', 'label'];
const SETTING_COLUMNS_LABELS_ARRAY = ['Id', 'Name'];
const OPCODES = {
  checkbox: 1,
  range: 2,
  simple: 3,
};
const SERVER = 'http://45.89.139.182:3000';

export {
  USER_SUBCATEGORY_ARRAY,
  USER_ACTIVITION_STATUS_ARRAY,
  ROLES_ARRAY,
  ROLES,
  PRODUCT_PERIOD_ARRAY,
  SINGLE_PRODUCT_TYPE_ARRAY,
  PRODUCT_STATUS_ARRAY,
  PRODUCT_STATUS,
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
  CUSTOMER_ORDERS_COLUMNS_LABELS_ARRAY,
  CUSTOMER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
  CUSTOMER_ORDER_STATUS_ARRAY,
  CUSTOMER_ORDER_STATUS,
  OPCODES,
  PUBLISHER_ORDERS_RECORDE_ITEM_NAMES_ARRAY,
  PUBLISHER_ORDERS_COLUMNS_LABELS_ARRAY,
  PUBLISHER_ORDER_STATUS,
  COUNTRIES_COLUMNS_LABELS_ARRAY,
  COUNTRIES_RECORDE_ITEM_NAMES_ARRAY,
  SETTING_COLUMNS_LABELS_ARRAY,
  SETTING_ITEM_RECORD_ITEM_NAMES,
  CURRENCIES_COLUMNS_LABELS_ARRAY,
  CURRENCIES_RECORDE_ITEM_NAMES_ARRAY,
  SERVER,
  PRODUCT_SORT_OPTIONS,
  PRODUCT_TYPES,
  PRODUCT_COLUMNS_LABELS_ARRAY,
  PRODUCT_RECORD_ITEM_NAMES_ARRAY,
};
