/* eslint-disable import/prefer-default-export */

const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
const USER_LOGIN = 'USER_LOGIN';
const selectQuery = 'SELECT * FROM UserTokens WHERE tokenID = ? ';
const updateQuery =
  'INSERT OR REPLACE INTO UserTokens (tokenID,state) VALUES (?, ?)';
const deleteQuery = 'DELETE FROM UserTokens WHERE tokenID = ?';
const createTokenTableQuery =
  'CREATE TABLE IF NOT EXISTS UserTokens (tokenID TEXT PRIMARY KEY,state TEXT)';
const ERRORS = {
  TITLE: 'Error',
};
const ClaimStats = {
  open: 'open',
  closed: 'closed',
  all: 'all',
};
const AccountStats = {
  active: 'active',
  deactive: 'deactive',
  approved: 'approved',
};
const COOKIE_EXPIRATION = 356;
const REQUEST_TIMEOUT = 4000;
const SERVER = 'http://localhost:3000';
const fetchURL = 'http://localhost:3000/getComments';
const ROLES = {
  admin: 'Admin',
  operator: 'Operator',
  customer: 'Customer',
  publisher: 'Publisher',
};
const UserTypesArray = [
  { value: 'Publisher', label: 'Publisher' },
  { value: 'Customer', label: 'Customer' },
  { value: 'Operator', label: 'Operator' },
];
const UserNumbersArray = [
  { value: 'Mobile Number', label: 'Mobile Number' },
  { value: 'Phone Number', label: 'Phone Number' },
  { value: 'Fax Number', label: 'Fax Number' },
];
export {
  SET_RUNTIME_VARIABLE,
  selectQuery,
  updateQuery,
  deleteQuery,
  createTokenTableQuery,
  REQUEST_TIMEOUT,
  ERRORS,
  COOKIE_EXPIRATION,
  SERVER,
  USER_LOGIN,
  fetchURL,
  ROLES,
  ClaimStats,
  AccountStats,
  UserTypesArray,
  UserNumbersArray,
};
