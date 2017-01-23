// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'ngSanitize', 'angularFileUpload', 'ui.tinymce', 'ui.bootstrap', 'ngAnimate', 'myApp.filters', 'myApp.services', 'myApp.directives']).
run(function($rootScope, modalService) {
    console.log("app run");
    // показываем меню
    $rootScope.showMenu = function () {
      // $log.info('show Dialog');
      var modalDefaults = {
        backdrop: true,
        keyboard: true,
        modalFade: true,
        templateUrl: 'mainMenu.html',
        size: 'lg'
      };
      var modalOptions = {
        closeButtonText: 'Отмена',
        actionButtonText: 'Отправить',
        headerText: 'Комментарий'
      };
      modalService.showModal(modalDefaults, modalOptions).then(function (result) {
        console.info(result);
      });
    };
    // настройки редактора
    $rootScope.tinymceOptions = {
      // General options
      selector:'textarea',
      mode : "exact",
      elements : "wysiwygEditor",
      themes : "modern",
      language: 'ru',
      height: 400,
      plugins : "image,pagebreak,layer,table,save,advlist,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,fullscreen,noneditable,visualchars,nonbreaking,template",
      extended_valid_elements : 'script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],div[*],p[*],object[width|height|classid|codebase|embed|param],param[name|value],embed[param|src|type|width|height|flashvars|wmode]',
      // media_strict: false,
      theme_advanced_toolbar_location : "top",
      theme_advanced_toolbar_align : "left",
      theme_advanced_statusbar_location : "bottom",
      theme_advanced_resizing : true,
      relative_urls : true,
      // convert_urls : false,
      file_browser_callback: function(field_name, url, type, win) {
          if(type=='image') $('#my_form input').click();
      }
  };
  $rootScope.isAuthorized = true;
  $rootScope.isAdmin = true;

  // var session = AuthService.getSession();
    // console.log(session);
    // if(AuthService.isAuthorized()) {
    //   console.log("authorized");
    //   $rootScope.isAuthorized = true;
    // } else {
    //   console.log("unauthorized");
    //   $rootScope.isAuthorized = false;
    // }
}).
// config(["$provide", function($provide){
//   // Use the `decorator` solution to substitute or attach behaviors to
//   // original service instance; @see angular-mocks for more examples....
//   $provide.decorator( '$log', [ "$delegate", function( $delegate )
//   {
//       // Save the original $log.debug()
//       var debugFn = $delegate.debug;

//       $delegate.debug = function( )
//       {
//         var args    = [].slice.call(arguments),
//             now     = new Date();

//         // Prepend timestamp
//         args[0] = supplant("{0} - {1}", [ now, args[0] ]);

//         // Call the original with the output prepended with formatted timestamp
//         debugFn.apply(null, args)
//       };

//       return $delegate;
//   }])
// }]).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/index',
    controller: IndexCtrl
  }).
  when('/addPost', {
    templateUrl: 'partials/addPost',
    controller: AddPostCtrl
  }).
  when('/readPost/:id', {
    templateUrl: 'partials/readPost',
    controller: ReadPostCtrl
  }).
  // when('/editPost/:id', {
  //   templateUrl: 'partials/editPost',
  //   controller: EditPostCtrl
  // }).
  // when('/deletePost/:id', {
  //   templateUrl: 'partials/deletePost',
  //   controller: DeletePostCtrl
  // }).
  when('/adminPanel', {
    templateUrl: 'partials/adminPanel',
    controller: AdminPanelCtrl
  }).
  otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);