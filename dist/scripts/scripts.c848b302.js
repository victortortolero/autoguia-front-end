"use strict";function utilities(){function a(a,b,c){for(var d=0,e=a.length;e>d;d++)if(a[d][c]===b)return d;return-1}this.toggleSelection=function(a,b){var c=b.indexOf(a);c>-1?b.splice(c,1):b.push(a)},this.toggleObjectSelection=function(b,c,d){var e=a(d,b[c],c);e>-1?d.splice(e,1):d.push(b)},this.gridifyItems=function(a,b,c,d){for(var e=d||0;e<a.length;e++){var f=a[e],g=f.id,h={x:g%3*b,y:Math.floor(g/3)*c};a[e].grid=h}}}angular.module("autoguiaFrontEndApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage","infinite-scroll","gridstack-angular","ngGeolocation"]).config(["$routeProvider","$localStorageProvider",function(a,b){a.when("/",{templateUrl:"views/step1.html",controller:"TypesController",controllerAs:"vm"}).when("/step-2",{templateUrl:"views/step2.html",controller:"VersionCtrl",controllerAs:"vm"}).when("/step-3",{templateUrl:"views/cars.html",controller:"CarsCtrl",controllerAs:"vm"}).when("/thanks",{templateUrl:"views/savefilter.html",controller:"SavefilterCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"}),b.setKeyPrefix("autoguia-v1-")}]).run(["userDataService","LoadingBarService",function(a,b){a.init(),b.loading(!1)}]),angular.module("autoguiaFrontEndApp").controller("TypesController",["$scope","$timeout","$window","$location","autoGuiaService","userDataService","UtilitiesService","LoadingBarService","GoogleGeolocationService",function(a,b,c,d,e,f,g,h,i){function j(){h.loading(!0),l.loadingBrands=!0,e.getBrands(l.filter.types).then(function(a){var c=a.data;b(function(){l.brands=c.brands,l.loadingBrands=!1,h.loading(!1)},1500)})}function k(){h.loading(!0),e.getTypes().then(function(a){var c=a.data;b(function(){l.loadingTypes=!1,h.loading(!1),l.types=c.types},1e3)})}var l=this;l.types=[],l.brands=[],l.filter=f.newUserFilter(),k(),l.toggleSelection=g.toggleSelection,l.loadingTypes=!0,l.loadingBrands=!0,a.$watch(function(){return l.filter.types.length},function(){j(),l.filter.brands=[]}),l.nextPage=function(){f.saveFilter(l.filter),d.path("/step-2")}}]),angular.module("autoguiaFrontEndApp").filter("capitalize",function(){return function(a){return a?a.charAt(0).toUpperCase()+a.substr(1).toLowerCase():""}}),angular.module("autoguiaFrontEndApp").service("autoGuiaService",["$http",function(a){var b={},c="data/";return b.getTypes=function(){return a.get(c+"types.json")},b.getBrands=function(b){return a.get(c+"brands.json")},b.versions=function(){return a.get(c+"versions.json")},b.prices=function(){return a.get(c+"prices.json")},b.cars=function(b){return a.get(c+"cars.json")},b}]),angular.module("autoguiaFrontEndApp").service("userDataService",["$localStorage",function(a){function b(){d.user=angular.extend({},e)}var c={},d=a;c.init=function(){return"undefined"==typeof d.user&&(d.$reset(),b()),d.user},c.reset=function(){d.$reset()},c.newUserFilter=function(){var a={types:[],brands:[],valid:!1};return a},c.saveFilter=function(a){d.user.filters.length<1?d.currentFilterIndex=d.user.filters.push(a)-1:d.user.filters[0]=a},c.saveUserInfo=function(a){d.user.info=angular.extend(d.user.info,a)},c.currentFilter=function(){return d.user.filters[0]},c.currentUser=function(){return d.user},c.validateStep1=function(){var a=d.user.filters[0],b="undefined"!=typeof a.types&&"undefined"!=typeof a.brands&&a.types.length>=1&&a.brands.length>=1;return b},c.validateStep2=function(){var a=d.user.filters[0],b="undefined"!=typeof a.versions&&a.versions.length>=1;return b},c.validate=function(){return d.user.filters.length>=1};var e={filters:[],info:{name:"",lastName:"",email:"",phone:"",address:"",location:{latitude:0,longitude:0}}};return c}]),angular.module("autoguiaFrontEndApp").controller("VersionCtrl",["$scope","$timeout","$window","$document","$location","autoGuiaService","userDataService","UtilitiesService","LoadingBarService",function(a,b,c,d,e,f,g,h,i){function j(){l.loadingVersions=!0,i.loading(!0),f.versions().then(function(a){a.data;b(function(){l.loadingVersions=!1,l.versions=a.data.versions},1e3)}),i.loading(!0),l.loadingPrices=!0,f.prices().then(function(a){l.loadingPrices=!1,i.loading(!1),l.maxRate=a.data.maxRate,l.maxValue=a.data.maxValue})}function k(){var a=g.validate()&&g.validateStep1();a||e.path("/")}k();var l=this;l.versions=[],l.filter=g.currentFilter(),l.filter.versions=[],l.filter.maxRate=0,l.filter.maxValue=0,l.loadingVersions=!0,l.loadingPrices=!0,l.maxRate=2e3,l.maxValue=12e3,j(),l.toggleSelection=h.toggleSelection,l.nextPage=function(){g.saveFilter(l.filter),e.path("/step-3")}}]),angular.module("autoguiaFrontEndApp").controller("CarsCtrl",["$document","$rootScope","$timeout","$window","GoogleGeolocationService","LoadingBarService","UtilitiesService","userDataService","$location",function(a,b,c,d,e,f,g,h,i){function j(){m(l.items,l.gridWidth,l.gridHeight)}function k(){var a=h.validate()&&h.validateStep1()&&h.validateStep2();a||i.path("/")}k();var l=this;l.items=[],b.selectedCars=l.selectedCars=[],l.filter=h.currentFilter(),l.user={},l.options={cellHeight:83,verticalMargin:15,disableResize:!0,animate:!0},l.gridWidth=4,l.gridHeight=6,l.fetchingCars=!1;var m=g.gridifyItems;l.toggleObjectSelection=g.toggleObjectSelection;for(var n=0;9>n;n++)l.items.push({id:n});j(),l.fetchCars=function(){f.isLoading()||(f.loading(!0),c(function(){for(var a=l.items.length,b=l.items[l.items.length-1].id,c=1;9>=c;c++)l.items.push({id:b+c});m(l.items,l.gridWidth,l.gridHeight,a),f.loading(!1)},2e3))},l.getOffers=function(){e.getPosition().then(function(a){var b=a.data.location;l.user.location={},l.user.location.latitude=b.lat,l.user.location.longitude=b.lng,h.saveFilter(l.filter),h.saveUserInfo(l.user),l.nextPage()})},a.ready(function(){$('[data-target="form-modal"]').leanModal(),$("#offer-form").submit(function(a){return a.preventDefault(),!1})}),l.nextPage=function(){i.path("/thanks")}}]),angular.module("autoguiaFrontEndApp").service("UtilitiesService",utilities),angular.module("autoguiaFrontEndApp").service("LoadingBarService",["$rootScope",function(a){var b={};return b.loading=function(b){a.loadingBar=b},b.isLoading=function(){return a.loadingBar},b}]),angular.module("autoguiaFrontEndApp").controller("SavefilterCtrl",["$location","userDataService",function(a,b){var c=this;c.reset=function(){b.reset(),a.path("/")}}]),angular.module("autoguiaFrontEndApp").service("GoogleGeolocationService",["$http",function(a){var b={},c="https://www.googleapis.com/geolocation/v1/geolocate?key=",d="AIzaSyBbNa0uGlxuJZxOZOOiu1dx3eHRsp3CcqI",e=c+d;return b.getPosition=function(){return a.post(e,{})},b}]),angular.module("autoguiaFrontEndApp").run(["$templateCache",function(a){a.put("views/cars.html",'<!-- <button ng-show="vm.selectedCars.length >= 1" class="waves-effect waves-light btn modal-trigger" data-target="form-modal">\n  Modal\n</button> --> <div class="row"> <div class="col s12" infinite-scroll="vm.fetchCars()" infinite-scroll-distance="0.1"> <div on-change="onChange(event,items)" on-drag-start="onDragStart(event,ui)" on-drag-stop="onDragStop(event,ui)" on-resize-start="onResizeStart(event,ui)" on-resize-stop="onResizeStop(event,ui)"> <section gridstack options="vm.options" class="grid-stack"> <section gridstack-item class="grid-stack-item" ng-repeat="item in vm.items" gs-item-x="item.grid.x" gs-item-y="item.grid.y" gs-item-width="vm.gridWidth" gs-item-height="vm.gridHeight" gs-item-autopos="1"> <ul class="collection with-header z-depth-1 hoverable grid-stack-item-content"> <li class="collection-header car-img-container"> <img class="responsive-img" src="http://placehold.it/800x600" alt="placeholder"> <p> <input type="checkbox" ng-checked="vm.filter.types.indexOf(item.name) > -1" ng-click="vm.toggleObjectSelection(item, \'id\', vm.selectedCars)" id="{{ \'car-\' + item.id }}"> <label for="{{ \'car-\' + item.id }}"></label> </p> </li> <li class="collection-item avatar"> <i class="material-icons circle">time_to_leave</i> <span class="title">Marca {{item.id}}</span> <p>Modelo <br> Año {{vm.fetchingCars}} </p> <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> </li> <li class="collection-item avatar"> <i class="material-icons circle red">star</i> <span class="title">U.S. News Scores</span> <p>8/10 pt</p> <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> </li> <li class="collection-item avatar"> <i class="material-icons circle red">play_arrow</i> <span class="title">Nivel de contaminación</span> <p>8/10 pt</p> </li> </ul> </section> </section> </div> </div> <!-- Modal Structure --> <div id="form-modal" class="modal"> <div class="modal-content"> <form id="offer-form"> <div class="row"> <p class="flow-text">Que me comunican a los concesionarios que estan cerca a:</p> <div class="input-field col s12"> <i class="material-icons prefix">my_location</i> <textarea ng-model="vm.user.address" id="address" class="materialize-textarea"></textarea> <label for="address">Dirección</label> </div> </div> <div class="row"> <p class="flow-text">Datos Personales</p> </div> <div class="row"> <div class="input-field col s12 m6"> <i class="material-icons prefix">account_circle</i> <input ng-model="vm.user.name" id="first_name" type="text" class="validate" required> <label for="first_name">Nombre</label> </div> <div class="input-field col s12 m6"> <i class="material-icons prefix">account_circle</i> <input ng-model="vm.user.lastName" id="last_name" type="text" class="validate" required> <label for="last_name">Apellido</label> </div> </div> <div class="row"> <div class="input-field col s12 m6"> <i class="material-icons prefix">email</i> <input ng-model="vm.user.email" id="email" type="email" class="validate" required> <label for="email">Correo</label> </div> <div class="input-field col s12 m6"> <i class="material-icons prefix">phone</i> <input ng-model="vm.user.phone" id="phone" type="tel" class="validate" required> <label for="phone">Telefono</label> </div> </div> <button type="submit" ng-click="vm.getOffers()" class="right modal-action modal-close waves-effect waves-red btn-flat"> Obtener Ofertas! </button> </form> </div> <div class="modal-footer"> <!-- <button class="left modal-action modal-close waves-effect waves-red btn-flat">Cerrar</button> --> </div> </div></div>'),a.put("views/savefilter.html",'<div class="row"> <h1 class="flow-text"> Gracias por usarnos. Pronto tendra las mejores ofertas en su correo! </h1> <button ng-click="vm.reset()" class="btn waves-effect waves-light red"> Reset </button> </div>'),a.put("views/step1.html",'<div class="divider"></div> <div class="row section"> <div class="col m6"> <section class="row section" id="tipo-auto"> <p class="flow-text">El tipo de auto que te gustaria tener:</p> <div ng-show="vm.loadingTypes" class="progress"> <div class="indeterminate"></div> </div> <forms id="tipo-auto-form"> <!-- <i class="material-icons">label</i> This is text --> <span class="checkbox-holder" ng-repeat="type in vm.types"> <input type="checkbox" ng-checked="vm.filter.types.indexOf(type.name) > -1" ng-click="vm.toggleSelection(type.name, vm.filter.types)" id="{{ type.name | lowercase }}"> <label for="{{ type.name | lowercase }}">{{ type.name | capitalize }}</label> </span>  </forms></section> <div class="divider"></div> <section ng-show="vm.filter.types.length >= 1" class="row section" id="marca-auto"> <p class="flow-text">Marcas de preferencia:</p> <div ng-show="vm.loadingBrands" class="progress"> <div class="indeterminate"></div> </div> <section ng-show="!vm.loadingBrands"> <forms class="row" id="marca-auto-form"> <!-- <i class="material-icons">label</i> This is text --> <span class="col m3 s12 car-img-container" ng-repeat="brand in vm.brands"> <img class="responsive-img" src="http://placehold.it/400x400" alt=""> <p> <input type="checkbox" id="{{ brand.name | lowercase }}" ng-checked="vm.filter.brands.indexOf(brand.name) > -1" ng-click="vm.toggleSelection(brand.name, vm.filter.brands)"> <label for="{{ brand.name | lowercase }}"></label> </p> </span>  </forms></section> </section> <section ng-show="vm.filter.brands.length >= 1"> <h5> <a ng-click="vm.nextPage()">Elegir versiones y presupuestos ></a> </h5> </section> </div> <aside class="col m5 offset-m1"> <img class="responsive-img" src="http://placehold.it/1920x1080" alt="placeholder"> </aside> </div>'),a.put("views/step2.html",'<div class="row"> <div class="col m6 s12"> <section class="row" id="version-auto"> <p class="flow-text">El tipo de auto que te gustaria tener:</p> <div ng-show="vm.loadingVersions" class="progress"> <div class="indeterminate"></div> </div> <forms id="version-auto-form"> <!-- <i class="material-icons">label</i> This is text --> <span class="checkbox-holder" ng-repeat="version in vm.versions"> <input type="checkbox" ng-checked="vm.filter.versions.indexOf(version.name) > -1" ng-click="vm.toggleSelection(version.name, vm.filter.versions)" id="{{ version.name | lowercase }}"> <label for="{{ version.name | lowercase }}">{{ version.name | capitalize }}</label> </span>  </forms></section> <section ng-show="vm.filter.versions.length >= 1" class="row" id="precio-auto"> <p class="flow-text">Posibilidades economicas:</p> <div ng-show="vm.loadingPrices" class="progress"> <div class="indeterminate"></div> </div> <forms class="row" id="precio-auto-form"> <section class="col m6"> <p class="range-field"> <label class="range-label" for="cuotamensual">Cuota mensual maxima</label> <input ng-model="vm.filter.maxRate" type="range" id="cuotamensual" min="0" max="2000"> </p> </section> <section class="col m6"> <p class="range-field"> <label class="range-label" for="valormaximo">Valor maximo</label> <input ng-model="vm.filter.maxValue" type="range" id="valormaximo" min="0" max="120000"> </p> </section>  </forms></section> <section ng-show="vm.filter.versions.length >= 1 && vm.filter.maxRate > 1 && vm.filter.maxValue > 1"> <h5> <a ng-click="vm.nextPage()">Elegir versiones y presupuestos ></a> </h5> </section> </div> <aside class="col m5 offset-m1"> <img class="responsive-img" src="http://placehold.it/1920x1080" alt="placeholder"> </aside> </div>')}]);