"use strict";function utilities(){function a(a,b,c){for(var d=0,e=a.length;e>d;d++)if(a[d][c]===b)return d;return-1}this.toggleSelection=function(a,b){var c=b.indexOf(a);c>-1?b.splice(c,1):b.push(a)},this.toggleObjectSelection=function(b,c,d){var e=a(d,b[c],c);e>-1?d.splice(e,1):d.push(b)},this.gridifyItems=function(a,b,c,d,e){for(var f=d||0;f<a.length;f++){var g=a[f],h=g[e],i={x:h%3*b,y:Math.floor(h/3)*c};a[f].grid=i}}}angular.module("autoguiaFrontEndApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage","infinite-scroll","gridstack-angular","ngGeolocation","angular-loading-bar"]).constant("BASE_URL","http://jrojas.dhdinc.info/autoguia-api/public/index.php/").constant("CURRENT_VERSION","V1").config(["$routeProvider","$localStorageProvider","cfpLoadingBarProvider","CURRENT_VERSION",function(a,b,c,d){a.when("/",{templateUrl:"views/step1.html",controller:"TypesController",controllerAs:"vm"}).when("/step-2",{templateUrl:"views/step2.html",controller:"VersionCtrl",controllerAs:"vm"}).when("/step-3",{templateUrl:"views/cars.html",controller:"CarsCtrl",controllerAs:"vm"}).when("/thanks",{templateUrl:"views/savefilter.html",controller:"SavefilterCtrl",controllerAs:"vm"}).otherwise({redirectTo:"/"}),b.setKeyPrefix("autoguia-"+d+"-"),c.includeSpinner=!1}]).run(["userDataService","LoadingBarService","$rootScope","$location",function(a,b,c,d){a.init(),b.loading(!1),c.currentPath=d.path(),c.userLogged=function(){return a.validFilter()},c.currentUser=function(){return a.currentUser().info}}]),angular.module("autoguiaFrontEndApp").controller("TypesController",["$scope","$timeout","$window","$location","autoGuiaService","$rootScope","userDataService","UtilitiesService","LoadingBarService","GoogleGeolocationService",function(a,b,c,d,e,f,g,h,i,j){function k(){i.loading(!0),m.loadingBrands=!0,e.getBrands(m.filter.types).then(function(a){var b=a.data;m.brands=b,m.loadingBrands=!1,i.loading(!1)})}function l(){i.loading(!0),e.getTypes().then(function(a){var b=a.data;m.loadingTypes=!1,i.loading(!1),m.types=b})}f.currentPath=d.path();var m=this;m.types=[],m.brands=[],m.sideCars=[],m.filter=g.newUserFilter(),l(),m.toggleSelection=h.toggleSelection,m.loadingTypes=!0,m.loadingBrands=!0,a.$watch(function(){return m.filter.types.length},function(a){1>a||(k(),m.filter.brands=[])}),a.$watch(function(){return m.filter.brands.length},function(a){1>a||e.sideCarsStep1(m.filter).then(function(a){return a.data}).then(function(a){m.sideCars=a})}),m.nextPage=function(){g.saveFilter(m.filter),d.path("/step-2")}}]),angular.module("autoguiaFrontEndApp").filter("capitalize",function(){return function(a){return a?a.charAt(0).toUpperCase()+a.substr(1).toLowerCase():""}}),angular.module("autoguiaFrontEndApp").service("autoGuiaService",["$http","BASE_URL",function(a,b){var c={},d="data/";return c.getTypes=function(){return a.post(b+"tipos_auto/exists")},c.getBrands=function(c){return a({url:b+"tipos_auto/exists/marcas",method:"POST",data:{array_id_tipo:c}})},c.versions=function(c,d){return a({url:b+"subtipos_auto/exists/tipos_auto/marcas",method:"POST",data:{array_id_tipo:c,array_id_marca:d}})},c.prices=function(){return a.get(d+"prices.json")},c.cars=function(c){return a({url:b+"autos/list/tipos_auto/subtipos_auto/marcas/other",method:"POST",data:{array_id_tipo:c.types,array_id_marca:c.brands,array_id_subtipo:c.versions,valor_maximo:c.maxValue,cuota_mensual_maxima:c.maxRate}})},c.saveUser=function(c){return a({url:b+"guardar_user",method:"POST"})},c.sideCarsStep1=function(c){return a({url:b+"autos/filter/tipos_auto/marcas",method:"POST",data:{array_id_tipo:c.types,array_id_marca:c.brands}})},c.sideCarsStep2=function(c){return a({url:b+"autos/filter/tipos_auto/subtipos_auto/marcas",method:"POST",data:{array_id_tipo:c.types,array_id_marca:c.brands,array_id_subtipo:c.versions}})},c}]),angular.module("autoguiaFrontEndApp").service("userDataService",["$localStorage","CURRENT_VERSION",function(a,b){function c(){e.user=angular.extend({},f)}var d={},e=a;d.init=function(){return d.validateVersion(),"undefined"==typeof e.user&&(e.$reset(),c()),e.user},d.reset=function(){e.$reset()},d.newUserFilter=function(){var a={types:[],brands:[],valid:!1};return a},d.saveFilter=function(a){e.user.filters[0]=angular.extend(e.user.filters[0],a)},d.saveUserInfo=function(a){e.user.info=angular.extend(e.user.info,a)},d.validateFilter=function(){e.user.filters[0].valid=!0},d.validFilter=function(){return e.user.filters[0].valid},d.currentFilter=function(){return e.user.filters[0]},d.currentUser=function(){return e.user},d.validateStep1=function(){var a=e.user.filters[0],b="undefined"!=typeof a.types&&"undefined"!=typeof a.brands&&a.types.length>=1&&a.brands.length>=1;return b},d.validateStep2=function(){var a=e.user.filters[0],b="undefined"!=typeof a.versions&&a.versions.length>=1;return b},d.validate=function(){return e.user.filters.length>=1},d.validateVersion=function(){for(var a in localStorage)-1!==a.search("autoguia")&&-1===a.search(b)&&localStorage.removeItem(a)};var f={filters:[{valid:!1}],info:{name:"",lastName:"",email:"",phone:"",address:"",location:{latitude:0,longitude:0}}};return d}]),angular.module("autoguiaFrontEndApp").controller("VersionCtrl",["$scope","$timeout","$window","$document","$location","autoGuiaService","userDataService","UtilitiesService","LoadingBarService","$rootScope",function(a,b,c,d,e,f,g,h,i,j){function k(){m.loadingVersions=!0,i.loading(!0),f.versions(m.filter.types,m.filter.brands).then(function(a){var b=a.data;m.loadingVersions=!1,m.versions=b,console.log(a)}),f.sideCarsStep1(m.filter).then(function(a){return a.data}).then(function(a){m.sideCars=a}),i.loading(!0),m.loadingPrices=!0,f.prices().then(function(a){m.loadingPrices=!1,i.loading(!1),m.maxRate=a.data.maxRate,m.maxValue=a.data.maxValue})}function l(){var a=g.validate()&&g.validateStep1();a||e.path("/")}j.currentPath=e.path(),console.log(j.currentPath),l();var m=this;m.versions=[],m.filter=g.currentFilter(),console.log(m.filter),m.filter.versions=[],m.filter.maxRate=0,m.filter.maxValue=0,m.loadingVersions=!0,m.loadingPrices=!0,m.sideCars=[],m.maxRate=5e3,m.maxValue=2e5,k(),m.toggleSelection=h.toggleSelection,a.$watch(function(){return m.filter.versions.length},function(a){return 1>a?void f.sideCarsStep1(m.filter).then(function(a){return a.data}).then(function(a){m.sideCars=a}):void f.sideCarsStep2(m.filter).then(function(a){return a.data}).then(function(a){m.sideCars=a,console.log(a)})}),m.nextPage=function(){g.saveFilter(m.filter),e.path("/step-3")}}]),angular.module("autoguiaFrontEndApp").controller("CarsCtrl",["$document","$rootScope","$timeout","$window","GoogleGeolocationService","LoadingBarService","UtilitiesService","userDataService","$location","autoGuiaService",function(a,b,c,d,e,f,g,h,i,j){function k(){j.cars(n.filter).then(function(a){n.cars=a.data,console.log(n.cars),l(10),o(n.items,n.gridWidth,n.gridHeight,0,"id_auto")})}function l(a){for(var b=0;a>b&&n.currentCar<n.cars.length;b++)n.items.push(n.cars[n.currentCar++])}function m(){var a=h.validate()&&h.validateStep1()&&h.validateStep2();a||i.path("/")}b.currentPath=i.path(),m();var n=this;n.items=[],n.cars=[],n.currentCar=0,b.selectedCars=n.selectedCars=[],n.filter=h.currentFilter(),console.log(n.filter),n.user={},n.options={cellHeight:93,verticalMargin:15,disableResize:!0,animate:!0},n.gridWidth=4,n.gridHeight=6,n.fetchingCars=!1;var o=g.gridifyItems;n.toggleObjectSelection=g.toggleObjectSelection,k(),n.fetchCars=function(){n.cars.length>=1&&n.items.length==n.cars.length||f.isLoading()||(f.loading(!0),c(function(){var a=n.items.length;l(5),o(n.items,n.gridWidth,n.gridHeight,a,"id_auto"),f.loading(!1)},50))},n.getOffers=function(){e.getPosition().then(function(a){var b=a.data.location;n.user.location={},n.user.location.latitude=b.lat,n.user.location.longitude=b.lng,h.saveFilter(n.filter),h.saveUserInfo(n.user),h.validateFilter(),n.nextPage()})},a.ready(function(){$('[data-target="form-modal"]').leanModal(),$("#offer-form").submit(function(a){return a.preventDefault(),!1})}),n.nextPage=function(){i.path("/thanks")}}]),angular.module("autoguiaFrontEndApp").service("UtilitiesService",utilities),angular.module("autoguiaFrontEndApp").service("LoadingBarService",["$rootScope",function(a){var b={};return b.loading=function(b){a.loadingBar=b},b.isLoading=function(){return a.loadingBar},b}]),angular.module("autoguiaFrontEndApp").controller("SavefilterCtrl",["$location","userDataService",function(a,b){var c=this;c.reset=function(){b.reset(),a.path("/")}}]),angular.module("autoguiaFrontEndApp").service("GoogleGeolocationService",["$http",function(a){var b={},c="https://www.googleapis.com/geolocation/v1/geolocate?key=",d="AIzaSyBbNa0uGlxuJZxOZOOiu1dx3eHRsp3CcqI",e=c+d;return b.getPosition=function(){return a.post(e,{})},b}]),angular.module("autoguiaFrontEndApp").run(["$templateCache",function(a){a.put("views/cars.html",'<!-- <button ng-show="vm.selectedCars.length >= 1" class="waves-effect waves-light btn modal-trigger" data-target="form-modal">\n  Modal\n</button> --> <div class="row"> <div class="col s12" infinite-scroll="vm.fetchCars()" infinite-scroll-distance="0.1"> <div on-change="onChange(event,items)" on-drag-start="onDragStart(event,ui)" on-drag-stop="onDragStop(event,ui)" on-resize-start="onResizeStart(event,ui)" on-resize-stop="onResizeStop(event,ui)"> <section gridstack options="vm.options" class="grid-stack"> <section gridstack-item class="grid-stack-item" ng-repeat="item in vm.items" gs-item-x="item.grid.x" gs-item-y="item.grid.y" gs-item-width="vm.gridWidth" gs-item-height="vm.gridHeight" gs-item-autopos="1"> <ul class="collection with-header z-depth-1 hoverable grid-stack-item-content"> <li class="collection-header car-img-container"> <img class="responsive-img car-img" src="{{item.img_auto || \'http://placehold.it/800x600\'}}" alt="placeholder"> <p> <input type="checkbox" ng-checked="vm.filter.types.indexOf(item.nombre_version) > -1" ng-click="vm.toggleObjectSelection(item, \'id_auto\', vm.selectedCars)" id="{{ \'car-\' + item.id_auto }}"> <label for="{{ \'car-\' + item.id_auto }}"></label> </p> </li> <li class="collection-item avatar"> <i class="material-icons circle">time_to_leave</i> <span class="title">Auto: <strong>{{item.nombre_version}}</strong></span> <p>Marca: {{item.nombre_marca}}</p> <p>Subtipo: {{item.nombre_subtipo}}</p> <p>Año: {{item.anio_lanzamiento_auto}}</p> <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> </li> <li class="collection-item avatar"> <i class="material-icons circle red">star</i> <p>Precio: {{item.precio}}</p> <p>Cuota mensual: {{item.cuota_mensual_maxima}}</p> <!-- <p>Valor maximo: {{item.valor_maximo}}</p> --> <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> </li> <li class="collection-item avatar"> <i class="material-icons circle red">star</i> <span class="title">Caracteristicas</span> <p>Puertas: {{item.num_puertas}}</p> <p>Velocidades: {{item.num_velocidades}}</p> <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a> </li> <li class="collection-item avatar"> <i class="material-icons circle red">play_arrow</i> <span class="title">Nivel de contaminación</span> <p>co2: {{item.contaminacion_co2}}</p> </li> </ul> </section> </section> </div> </div> <!-- Modal Structure --> <div id="form-modal" class="modal"> <div class="modal-content"> <form id="offer-form"> <div class="row"> <p class="flow-text">Que me comunican a los concesionarios que estan cerca a:</p> <div class="input-field col s12"> <i class="material-icons prefix">my_location</i> <textarea ng-model="vm.user.address" id="address" class="materialize-textarea"></textarea> <label for="address">Dirección</label> </div> </div> <div class="row"> <p class="flow-text">Datos Personales</p> </div> <div class="row"> <div class="input-field col s12 m6"> <i class="material-icons prefix">account_circle</i> <input ng-model="vm.user.name" id="first_name" type="text" class="validate" required> <label for="first_name">Nombre</label> </div> <div class="input-field col s12 m6"> <i class="material-icons prefix">account_circle</i> <input ng-model="vm.user.lastName" id="last_name" type="text" class="validate" required> <label for="last_name">Apellido</label> </div> </div> <div class="row"> <div class="input-field col s12 m6"> <i class="material-icons prefix">email</i> <input ng-model="vm.user.email" id="email" type="email" class="validate" required> <label for="email">Correo</label> </div> <div class="input-field col s12 m6"> <i class="material-icons prefix">phone</i> <input ng-model="vm.user.phone" id="phone" type="tel" class="validate" required> <label for="phone">Telefono</label> </div> </div> <button type="submit" ng-click="vm.getOffers()" class="right modal-action modal-close waves-effect waves-red btn-flat"> Obtener Ofertas! </button> </form> </div> <div class="modal-footer"> <!-- <button class="left modal-action modal-close waves-effect waves-red btn-flat">Cerrar</button> --> </div> </div></div>'),a.put("views/savefilter.html",'<div class="row"> <h1 class="flow-text"> Gracias por usarnos. Pronto tendra las mejores ofertas en su correo! </h1> <div class="col s12 m6"> <button ng-click="vm.reset()" class="btn waves-effect waves-light red"> Ver mas autos! </button> </div> <div class="col s12 m6"> <button ng-click="vm.reset()" class="btn waves-effect waves-light red"> Ver mas autos! </button> </div> </div>'),a.put("views/step1.html",'<div class="divider"></div> <div class="row section"> <div class="col m6 s12"> <section class="row section" id="tipo-auto"> <p class="flow-text">El tipo de auto que te gustaria tener:</p> <div ng-show="vm.loadingTypes" class="progress"> <div class="indeterminate"></div> </div> <forms class="row" id="tipo-auto-form"> <!-- <i class="material-icons">label</i> This is text --> <span class="col m3 s4 checkbox-holder" ng-repeat="type in vm.types"> <input type="checkbox" ng-checked="vm.filter.types.indexOf(type.id_tipo) > -1" ng-click="vm.toggleSelection(type.id_tipo, vm.filter.types)" id="{{ type.nombre_tipo | lowercase }}"> <label for="{{ type.nombre_tipo | lowercase }}">{{ type.nombre_tipo | capitalize }}</label> </span>  </forms></section> <div class="divider"></div> <section ng-show="vm.filter.types.length >= 1" class="row section" id="marca-auto"> <p class="flow-text">Marcas de preferencia:</p> <div ng-show="vm.loadingBrands" class="progress"> <div class="indeterminate"></div> </div> <section ng-show="!vm.loadingBrands"> <forms class="row" id="marca-auto-form"> <!-- <i class="material-icons">label</i> This is text --> <span class="col m3 s12 car-img-container car-img-border" ng-repeat="brand in vm.brands"> <img class="responsive-img" src="{{brand.img_url_marca || \'http://placehold.it/800x800\'}}" alt="car image" ng-click="vm.toggleSelection(brand.id_marca, vm.filter.brands)"> <p> <input type="checkbox" id="{{ brand.nombre_marca | lowercase }}" ng-checked="vm.filter.brands.indexOf(brand.id_marca) > -1" ng-click="vm.toggleSelection(brand.id_marca, vm.filter.brands)"> <label for="{{ brand.nombre_marca | lowercase }}"></label> </p> <span>{{ brand.nombre_marca }} {{brand.id_marca}}</span> </span>  </forms></section> </section> <section ng-show="vm.filter.brands.length >= 1"> <h5> <a ng-click="vm.nextPage()">Elegir versiones y presupuestos ></a> </h5> </section> </div> <aside class="col m5 offset-m1 s12"> <!-- <img class="responsive-img side-image" src="http://placehold.it/1920x1080" alt="placeholder"> --> <section class="row section z-depth-1" id="side-cars"> <h1 class="flow-text center-align" id="cantidad-autos">Autos Totales: {{vm.sideCars.length}}</h1> <div class="divider"></div> <div class="card col m6 s12 hoverable" ng-repeat="car in vm.sideCars"> <div class="card-image waves-effect waves-block waves-light"> <img class="activator responsive-img" src="{{car.img_auto || \'http://placehold.it/1920x1080\'}}"> </div> <div class="card-content"> <span class="card-title activator grey-text text-darken-4">{{car.nombre_version}}<i class="material-icons right">more_vert</i></span> <p>{{car.nombre_marca}}</p> </div> <div class="card-reveal"> <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span> <p>Here is some more information about this product that is only revealed once clicked on.</p> </div> </div> </section> </aside> </div>'),a.put("views/step2.html",'<div class="row"> <div class="col m6 s12"> <section class="row" id="version-auto"> <p class="flow-text">Modelo del auto:</p> <div ng-show="vm.loadingVersions" class="progress"> <div class="indeterminate"></div> </div> <forms class="row" id="version-auto-form"> <!-- <i class="material-icons">label</i> This is text --> <span class="col m3 s4 checkbox-holder" ng-repeat="version in vm.versions"> <input type="checkbox" ng-checked="vm.filter.versions.indexOf(version.id_subtipo) > -1" ng-click="vm.toggleSelection(version.id_subtipo, vm.filter.versions)" id="{{ version.nombre_subtipo | lowercase }}"> <label for="{{ version.nombre_subtipo | lowercase }}">{{ version.nombre_subtipo | capitalize }}</label> </span>  </forms></section> <section ng-show="vm.filter.versions.length >= 1" class="row" id="precio-auto"> <p class="flow-text">Posibilidades economicas:</p> <div ng-show="vm.loadingPrices" class="progress"> <div class="indeterminate"></div> </div> <forms class="row" id="precio-auto-form"> <section class="col m6"> <p class="range-field"> <label class="range-label" for="cuotamensual">Cuota mensual maxima</label> <input ng-model="vm.filter.maxRate" type="range" id="cuotamensual" min="0" max="3000"> </p> </section> <section class="col m6"> <p class="range-field"> <label class="range-label" for="valormaximo">Valor maximo</label> <input ng-model="vm.filter.maxValue" type="range" id="valormaximo" min="0" max="200000"> </p> </section>  </forms></section> <section ng-show="vm.filter.versions.length >= 1 && vm.filter.maxRate > 1 && vm.filter.maxValue > 1"> <h5> <a ng-click="vm.nextPage()">Elegir versiones y presupuestos ></a> </h5> </section> </div> <aside class="col m5 offset-m1"> <!-- <img class="responsive-img" src="http://placehold.it/1920x1080" alt="placeholder"> --> <section class="row section z-depth-1" id="side-cars"> <h1 class="flow-text center-align" id="cantidad-autos">Autos Totales: {{vm.sideCars.length}}</h1> <div class="divider"></div> <!-- <div class="col m6 s12 z-depth-2" ng-repeat="car in vm.sideCars">\n        <img class="responsive-img" src="{{car.img_auto || \'http://placehold.it/1920x1080\'}}">\n        <p>{{car.nombre_marca}}</p>\n      </div> --> <div class="card col m6 s12 hoverable" ng-repeat="car in vm.sideCars"> <div class="card-image waves-effect waves-block waves-light"> <img class="activator responsive-img" src="{{car.img_auto || \'http://placehold.it/1920x1080\'}}"> </div> <div class="card-content"> <span class="card-title activator grey-text text-darken-4">{{car.nombre_version}}<i class="material-icons right">more_vert</i></span> <p>{{car.nombre_marca}}</p> </div> <div class="card-reveal"> <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span> <p>Here is some more information about this product that is only revealed once clicked on.</p> </div> </div> </section> </aside> </div>')}]);