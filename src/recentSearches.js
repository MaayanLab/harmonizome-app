import React from 'react'
import StyleVars from './StyleVars'

var RECENT_SEARCHES = [];

function exists(searchStr) {
  return RECENT_SEARCHES.indexOf(searchStr) !== -1;
}

function isString(input) {
  return typeof input === 'string' || input instanceof String;
}

export function getSearches() {
  return RECENT_SEARCHES;
}

export function addSearch(searchStr) {
  if (!exists(searchStr) && isString(searchStr)) {
    RECENT_SEARCHES.push(searchStr);
  }
}

export function removeSearch(searchStr) {
  if (exists(searchStr)) {
    var index = RECENT_SEARCHES.indexOf(searchStr);
    RECENT_SEARCHES.splice(index, 1);
  }
}
