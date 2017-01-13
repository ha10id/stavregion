// Контроллеры

// главная страница
function IndexCtrl($rootScope, $scope, $http, $location,  modalService, $log) {
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  // var slides = $scope.slides =[];
  var currIndex = 0;

  $http.get('/api/regions').
  success(function(data, status, headers, config) {
    $scope.slides = data;
  });

  $http.get('/api/news').
  success(function(data, status, headers, config) {
    $scope.news = data;
  });

  $http.get('/api/listsimple').
  success(function(data, status, headers, config) {
    $scope.simplenews = data;
  });

  // $scope.news = dataService.query();
  // $log.info($scope.news);
  // $rootScope.showMenu = function() {
  //   $log.info('click!');
  //   alert('click!');
  // };


  $scope.format = 'yyyy/MM/dd';
  $scope.dt = new Date();
  $scope.showWeeks = false;
  $scope.options = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: false
  };

  $scope.GetNews = function(item) {
    $log.info(item);
    $location.url("/readPost/"+item);
  };
  $scope.AddNews = function() {
    $log.info('item');
    $location.url("/addPost/");
  };

  function getDayClass(data) {
    var date = data.date,
    mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }
    return '';
  }
  // показываем диалог комментария
  $rootScope.showDialog = function () {
    $log.info('show Dialog');
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
      headerText: 'Новость'
    };
    modalService.showModal(modalDefaults, modalOptions).then(function (result) {
      console.info(result);
    });
  };
}

function AddPostCtrl($rootScope, $scope, $http, $location, $log) {
         var uploader = $scope.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        // a sync filter
        uploader.filters.push({
            name: 'syncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                console.log('syncFilter');
                return this.queue.length < 10;
            }
        });

        // an async filter
        uploader.filters.push({
            name: 'asyncFilter',
            fn: function(item /*{File|FileLikeObject}*/, options, deferred) {
                console.log('asyncFilter');
                setTimeout(deferred.resolve, 1e3);
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
};

      function ReadPostCtrl($scope, $http, $routeParams) {
        $http.get('/api/news/' + $routeParams.id).
        success(function(data) {
          $scope.news = data;
        });
      }

      function EditPostCtrl($scope, $http, $location, $routeParams) {
        $scope.form = {};
        $http.get('/api/post/' + $routeParams.id).
        success(function(data) {
          $scope.form = data.post;
        });

        $scope.editPost = function () {
          $http.put('/api/post/' + $routeParams.id, $scope.form).
          success(function(data) {
            $location.url('/readPost/' + $routeParams.id);
          });
        };
      }

      function DeletePostCtrl($scope, $http, $location, $routeParams) {
        $http.get('/api/post/' + $routeParams.id).
        success(function(data) {
          $scope.post = data.post;
        });

        $scope.deletePost = function () {
          $http.delete('/api/post/' + $routeParams.id).
          success(function(data) {
            $location.url('/');
          });
        };

// страница администрирования
function AdminPanelCtrl($scope, $uibModal, $log) {
  'use strict';
  // $scope.users = Users.query();
  // $scope.categories = Categories.query();
  // $scope.goverments = Goverments.query();

  // $scope.status = {
  //   isFirstOpen: true,
  //   oneAtATime: true,
  //   isItemOpen: [true]
  // };

  // $scope.users_group = [
  // {id: 0, name: "гость"},{id: 1, name: "пользователь"},{id: 2, name: "модератор"},{id: 3, name: "администратор"}
  // ];

  // $scope.user =[];

  // $log.info('-----admin panel controller---------------');
  // $log.info($scope.goverments);

  // $scope.saveUser = function(user) {
  //   // $log.info(user.id);
  //   // $scope.$apply(function(){
  //     var groupObject = user.group;
  //     user.group = groupObject.id;
  //     $log.info(user);
  //   // user.group = groupObject;
  //   $log.info('выбранная группа: ', user.group);
  //   user.group = groupObject;
  //   // })
  // }
  // // функция сохранения обращения
  // $scope.editGoverment = function (ogv_id) {
  //   // ngDialog.open({ template: 'popupTmpl.html', className: 'ngdialog-theme-default' });
  //   $log.info("delete!", ogv_id);
  // };
  // $scope.showForm = true;
  // $log.info("click!", ogv_id);
}


$scope.home = function () {
  $location.url('/');
};
}