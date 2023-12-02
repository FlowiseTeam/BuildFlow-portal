import { Factory } from 'miragejs';

export function commentFactory() {
  return Factory.extend({
    created_at() {
      return '2137-09-06T16:16:55.909';
    },
    updated_at() {
      return '2137-09-06T16:16:55.909';
    },
    images() {
      return [];
    },
    message() {
      return 'text message';
    },
    status() {
      'seen';
    },
    _id(i: number) {
      return i;
    },
    project_id(i: number) {
      return i;
    },
  });
}
