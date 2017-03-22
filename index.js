'use strict';

const {
  anyPass,
  empty,
  join,
  pipe,
  prop,
  reverse,
  slice,
  split,
  test,
  when,
} = require('ramda');
const { parse } = require('url');
const tlds = require('./tlds');
const isIpV4 = test(/^(\d{1,3}\.){3,3}\d{1,3}$/);
const isIpV6 = test(/^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i);
const isIp = anyPass([isIpV4, isIpV6]);
const emptyWhenIp = when(isIp, empty);
const filterTlds = entries =>
  tlds[entries[0]] && tlds[entries[0]][entries[1]] ?
    slice(0, 3, entries) :
    slice(0, 2, entries);

module.exports = pipe(
  parse,
  prop('hostname'),
  emptyWhenIp,
  split('.'),
  reverse,
  filterTlds,
  reverse,
  join('.')
);
