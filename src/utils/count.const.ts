import moment from 'moment';
export const diffTime = (birthday?: string) => {
  return moment().diff(birthday, 'years');
};
