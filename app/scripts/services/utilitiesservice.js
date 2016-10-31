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

function utilities() {
  this.toggleSelection = function(name, array) {
    var id = array.indexOf(name);
    if (id > -1) {
      array.splice(id, 1);
    } else {
      array.push(name);
    }
  }

  this.toggleObjectSelection = function(obj, property, array) {
    var index = arrayObjectIndexOf(array, obj[property], property);
    if (index > -1) {
      array.splice(index, 1);
    } else {
      array.push(obj);
    }
  }

  function arrayObjectIndexOf (myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
  }

  this.gridifyItems = function(array, width, height, start) {
    for (var i = start || 0; i < array.length; i++) {
      var item = array[i];
      var id = item.id;
      var grid = {
        x: id % 3 * width,
        y: Math.floor(id / 3) * height,
      };
      array[i].grid = grid;
      // console.log(`(${id}) - (${grid.x}, ${grid.y})`)
    }
  }
}