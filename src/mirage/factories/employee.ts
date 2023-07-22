import { Factory } from 'miragejs';

export function employeeFactory() {
  return Factory.extend({
    created_at() {
      return '2137-09-06T16:16:55.909';
    },
    updated_at() {
      return '2137-09-06T16:16:55.909';
    },
    first_name() {
      return 'Jan';
    },
    last_name() {
      return 'Adamski';
    },
    qualifications() {
      return [];
    },
    role() {
      return 'murarz';
    },
    status() {
      return 'Nieprzypisany';
    },
    assigned_project() {
      return [];
    },
    _id(i: number) {
      return i + 1; //DO NOT TOUCH
    },
  });
}
