
const USER = 'USER';
const PASSWORDCHANGE = 'PASSWORDCHANGE';
const ADMIN = 'ADMIN';
const COUNTRY_HEAD = 'COUNTRY_HEAD';
const ZONAL_HEAD = 'ZONAL_HEAD';
const CLUB = 'CLUB';
const HR = 'HR';

const staffRoles = [
  COUNTRY_HEAD,
  ZONAL_HEAD,
  HR,
  CLUB,
  ADMIN,
];

const roles = [
  HR,
  USER,
  ADMIN,
];

module.exports = {
  USER,
  ADMIN,
  COUNTRY_HEAD,
  ZONAL_HEAD,
  HR,
  CLUB,
  ADMIN,
  roles,
  staffRoles,
  PASSWORDCHANGE
};
