import moment from 'moment';
import { GenderType } from '../actions/profile';

export const formatPhone = phone =>
  `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;

export const formatBirthday = (birthday = undefined) =>
  moment(birthday).format('MMMM D, YYYY');

export const formatDateInput = (date = undefined) =>
  moment(date).format('YYYY-MM-DD');

export const formatCreatedAt = createdAt =>
  moment(createdAt).format('MMM YYYY');

export const formatSsn = ssn =>
  `${ssn.slice(0, 3)}-${ssn.slice(3, 6)}-${ssn.slice(6)}`;

export const formatGender = gender => GenderType[gender];
