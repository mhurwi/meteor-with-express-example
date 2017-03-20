import { Meteor } from 'meteor/meteor';
import { setupApi } from './imports/api';

Meteor.startup(() => {
  setupApi();
});
