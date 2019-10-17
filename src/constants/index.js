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
const REQUEST_TIMEOUT = 6000;
const SERVER = 'http://localhost:3004';
const SSRSERVER = 'http://localhost:3000';
const fetchURL = 'http://localhost:3004/getComments';
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
const AVATAR = '/assets/images/bitbucket.png';
const en = {
  application: {
    title: 'Awesome app with i18n!',
    hello: 'Hello, %{name}!',
  },
  date: {
    long: 'MMMM Do, YYYY',
  },

  export: 'Export %{count} items',
  export_0: 'Nothing to export',
  export_1: 'Export %{count} item',
  two_lines: 'Line 1<br />Line 2',
  literal_two_lines: 'Line 1\
Line 2',
};
const nl = {
  application: {
    title: 'Toffe app met i18n!',
    hello: 'Hallo, %{name}!',
  },
  date: {
    long: 'D MMMM YYYY',
  },
  export: 'Exporteer %{count} dingen',
  export_0: 'Niks te exporteren',
  export_1: 'Exporteer %{count} ding',
  two_lines: 'Regel 1<br />Regel 2',
  literal_two_lines: 'Regel 1 Regel 2',
};
const translationsObject = {
  en: en,
  fa: nl,
  arabic: en,
  nl: nl,
};
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
  SSRSERVER,
  USER_LOGIN,
  fetchURL,
  ROLES,
  ClaimStats,
  AccountStats,
  UserTypesArray,
  UserNumbersArray,
  AVATAR,
  translationsObject,
};
