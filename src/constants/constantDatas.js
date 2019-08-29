/* eslint-disable import/prefer-default-export */

const USER_SUBCATEGORY_ARRAY = [
  { id: 1, name: 'Library', label: 'Library' },
  { id: 2, name: 'Government', label: 'Government' },
  { id: 3, name: 'School', label: 'School' },
  { id: 4, name: 'Corporation', label: 'Corporation' },
  { id: 5, name: 'Single Customer', label: 'Single Customer' },
  { id: 6, name: 'Private', label: 'Private' },
  { id: 7, name: 'Public', label: 'Public' },
  { id: 8, name: 'Super Admin', label: 'Super Admin' },
  { id: 9, name: 'Operator', label: 'Operator' },
];

const USER_CATEGORY_ARRAY = [
  { id: 1, name: 'Customer', label: 'Customer' },
  { id: 2, name: 'Publisher', label: 'Publisher' },
  { id: 3, name: 'Admin', label: 'Admin' },
];
const ROLES_ARRAY = [
  { id: 1, label: 'active', name: 'SuperAdmin' },
  { id: 2, label: 'dactive', name: 'Operator' },
  { id: 3, label: 'aprroved', name: 'Publisher' },
  { id: 4, label: 'waitForApproval', name: 'Customer' },
];
const USER_ACTIVITION_STATUS_ARRAY = [
  { id: 2, label: 'active', name: 'active' },
  { id: 3, label: 'dactive', name: 'active' },
  { id: 4, label: 'aprroved', name: 'active' },
  { id: 1, label: 'waitForApproval', name: 'active' },
];

export {
  USER_SUBCATEGORY_ARRAY,
  USER_CATEGORY_ARRAY,
  USER_ACTIVITION_STATUS_ARRAY,
  ROLES_ARRAY,
};
