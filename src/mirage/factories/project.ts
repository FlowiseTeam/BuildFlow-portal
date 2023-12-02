import { Factory } from 'miragejs';

export function projectFactory() {
  return Factory.extend({
    created_at() {
      return '2137-09-06T16:16:55.909';
    },
    updated_at() {
      return '2137-09-06T16:16:55.909';
    },
    city() {
      return 'Poznań';
    },
    client() {
      return 'Miasto Poznań';
    },
    employees() {
      return [];
    },
    name() {
      return 'Projekt Centrum';
    },
    status() {
      return 'Zawieszony';
    },
    street() {
      return 'Święty Marcin DUPA';
    },
    zipcode() {
      return '60-700';
    },
    _id(i: number) {
      return i + 1; //DO NOT TOUCH
    },
  });
}
