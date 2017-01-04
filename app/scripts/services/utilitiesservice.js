'use strict';

/**
 * @ngdoc service
 * @name autoguiaFrontEndApp.UtilitiesService
 * @description
 * # UtilitiesService
 * Service in the autoguiaFrontEndApp.
 */
angular.module('autoguiaFrontEndApp')
  .service('UtilitiesService', utilities);

function utilities($localStorage) {

  var $storage = $localStorage;
  var validSteps = new Set();

  this.createValidStepsSet = function() {
    if (typeof $storage.validSteps === 'undefined') {
      $storage.validSteps = validSteps.set;
    }
  };

  this.addStep = function(step) {
    validSteps.add(step);
    $storage.validSteps = validSteps.set;
  }

  this.validStep = function(step) {
    return validSteps.has(step) || step <= this.getMaxValidStep();
  }

  this.removeStep = function(step) {
    validSteps.remove(step);
    $storage.validSteps = validSteps.set;
  }


  this.toggleSelection = function(name, array) {
    var index = array.indexOf(name);
    toggleFromArray(index, array, name);
  }

  this.Set = Set;

  this.toggleObjectSelection = function(obj, property, array) {
    var index = objectArrayIndexOf(array, obj[property], property);
    toggleFromArray(index, array, obj);
  }

  function toggleFromArray(index, array, item) {
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(item);
    }
  }

  function objectArrayIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
  }

  this.gridifyItems = function(array, width, height, start, primaryKey) {
    for (var i = start || 0; i < array.length; i++) {
      var item = array[i];
      var id = item[primaryKey];
      var grid = {
        x: id % 3 * width,
        y: Math.floor(id / 3) * height,
      };
      array[i].grid = grid;
      // console.log(`(${id}) - (${grid.x}, ${grid.y})`)
    }
  }

  this.calculateEarthDistance = function xx(point1, point2) {
    var R = 6371; // km
    var dLat = toRad(point2.lat - point1.lat);
    var dLon = toRad(point2.lon - point1.lon);
    var lat1 = toRad(point1.lat);
    var lat2 = toRad(point2.lat);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  };

  function toRad(value) {
    return value * Math.PI / 180;
  }

  /**
   * @desc Gets the current highest valid step! (highest meaning step number)
   * @param {String} step
   */
  this.getMaxValidStep = function(step) {
    if (validSteps.set.length > 0) {
      return validSteps.set.sort()[validSteps.set.length - 1];
    }
    return 1;
  };

  function Set() {
    this.set = [];

    this.add = function(item, key) {
      var index = typeof key === 'undefined' ?
        this.set.indexOf(item) :
        objectArrayIndexOf(this.set, item, key);

      if (index === -1) {
        this.set.push(item);
        return true;
      }
      return false;
    }

    this.remove = function(item, key) {
      var index = typeof key === 'undefined' ?
        this.set.indexOf(item) :
        objectArrayIndexOf(this.set, item, key);

      if (index > -1) {
        this.set.splice(index, 1);
        return true;
      }
      return false;
    }

    this.has = function(item) {
      return this.set.indexOf(item) !== -1;
    }
  }
}
