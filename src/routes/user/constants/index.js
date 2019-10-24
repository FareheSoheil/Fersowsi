const SERVER = 'http://45.89.139.182:3004';
const OPCODES = {
  checkbox: 1,
  range: 2,
  simple: 3,
};
const ADDRESS_TABLE_LABELS = [
  'Address',
  'Province',
  'Zip Code',
  'City',
  'Country',
];
const ADDRESS_RECORD_ITEMS = [
  'id',
  'detailAddress',
  'province',
  'zipCode',
  'city',
  'country',
];
const ADDRESS_SORT_OPTION = [
  { value: 4, label: 'Country' },
  { value: 5, label: 'Zip Code' },
];
const ORDER_TABLE_LABELS = ['Name', 'Price', 'Date', 'Status', 'Order No.'];
const ORDER_RECORD_ITEMS = ['id', 'name', 'price', 'date', 'status', 'orderNo'];
const ORDER_SORT_OPTION = [
  { value: 2, label: 'Price' },
  { value: 3, label: 'Date' },
  { value: 5, label: 'Order No' },
];
const PUBLISHER_ORDER_TABLE_LABELS = ['Id', 'Price', 'Date', 'Status', 'Count'];
const PUBLISHER_ORDER_RECORD_ITEMS = ['id', 'price', 'date', 'status', 'count'];

const CLAIMS_TABLE_LABELS = [
  'Order Id',
  'Customer',
  'Publisher',
  'Date',
  'Status',
  'is Finished',
];
const CLAIMS_RECORD_ITEMS = [
  'id',
  'orderId',
  'customerName',
  'publisherName',
  'date',
  'status',
  'isFinished',
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
export {
  ADDRESS_TABLE_LABELS,
  ADDRESS_RECORD_ITEMS,
  SERVER,
  ADDRESS_SORT_OPTION,
  ORDER_RECORD_ITEMS,
  ORDER_TABLE_LABELS,
  ORDER_SORT_OPTION,
  PUBLISHER_ORDER_TABLE_LABELS,
  PUBLISHER_ORDER_RECORD_ITEMS,
  CLAIMS_RECORD_ITEMS,
  CLAIMS_TABLE_LABELS,
  MESSAGE_STATUS,
  MESSAGE_STATUS_ARRAY,
  OPCODES,
};
