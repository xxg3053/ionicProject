

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])
.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
   
  });
})
/**.factory('Camera', ['$q', function($q){
  return {
      getPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  };
}])**/
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
    ////解决在android平台上是tab在底部显示
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');        

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');


    $stateProvider
    //abstract
    .state('menus', {
        url:'/menus',
        abstract: true,
        templateUrl: 'html/menus.html'
    })
    .state('menus.home' ,{
        url:'/home',
        views:{
            'menus-home':{
                templateUrl:'html/home.html',
                controller:'homeCtrl' 
            }
        }
    })
    .state('menus.list' ,{
        url:'/list',
        views:{
            'menus-home':{
                templateUrl:'html/list.html',
                controller:'listCtrl' 
            }
        }
    })
    .state('menus.listDividers' ,{
        url:'/list/dividers',
        views:{
            'menus-home':{
                templateUrl:'html/list/dividers.html',
                controller:'listCtrl'
            }
        }
    })
     .state('menus.listIcons' ,{
        url:'/list/icons',
        views:{
            'menus-home':{
                templateUrl:'html/list/icons.html',
                controller:'listCtrl'
            }
        }
    })
    .state('menus.listButtons' ,{
        url:'/list/buttons',
        views:{
            'menus-home':{
                templateUrl:'html/list/buttons.html',
                controller:'listCtrl'
            }
        }
    })
    .state('menus.listAvatars' ,{
        url:'/list/avatars',
        views:{
            'menus-home':{
                templateUrl:'html/list/avatars.html',
                controller:'listCtrl'
            }
        }
    })
     .state('menus.listThumbnails' ,{
        url:'/list/thumbnails',
        views:{
            'menus-home':{
                templateUrl:'html/list/thumbnails.html',
                controller:'listCtrl'
            }
        }
    })
    .state('menus.listInset' ,{
        url:'/list/inset',
        views:{
            'menus-home':{
                templateUrl:'html/list/inset.html',
                controller:'listCtrl'
            }
        }
    })
     .state('menus.listCard' ,{
        url:'/list/card',
        views:{
            'menus-home':{
                templateUrl:'html/list/card.html',
                controller:'listCtrl'
            }
        }
    })
      .state('menus.cardShowcase' ,{
        url:'/list/showcase',
        views:{
            'menus-home':{
                templateUrl:'html/list/showcase.html',
                controller:'listCtrl'
            }
        }
    })
    .state('menus.buttons' ,{
        url:'/buttons',
        views:{
            'menus-home':{
                templateUrl:'html/buttons.html',
                controller:'buttonsCtrl' 
            }
        }
    })
     .state('menus.buttonss' ,{
        url:'/buttons/buttons',
        views:{
            'menus-home':{
                templateUrl:'html/buttons/buttons.html',
                controller:'buttonsCtrl' 
            }
        }
    })
.state('menus.buttonBlock' ,{
        url:'/buttons/block',
        views:{
            'menus-home':{
                templateUrl:'html/buttons/block.html',
                controller:'buttonsCtrl' 
            }
        }
    })
.state('menus.buttonDifferent' ,{
        url:'/buttons/different',
        views:{
            'menus-home':{
                templateUrl:'html/buttons/different.html',
                controller:'buttonsCtrl' 
            }
        }
    })



    .state('menus.form' ,{
        url:'/form',
        views:{
            'menus-home':{
                templateUrl:'html/form.html',
                controller:'buttonsCtrl' 
            }
        }
    })
    .state('menus.tabs' ,{
        url:'/tabs',
        views:{
            'menus-home':{
                templateUrl:'html/tabs.html',
                controller:'buttonsCtrl' 
            }
        }
    })
     .state('menus.grid' ,{
        url:'/grid',
        views:{
            'menus-home':{
                templateUrl:'html/grid.html',
                controller:'buttonsCtrl' 
            }
        }
    })
    .state('menus.db' ,{
        url:'/db',
        views:{
            'menus-db':{
                templateUrl:'html/sqlite.html',
                controller:'dbCtrl' 
            }
        }
    })
    .state('menus.camera' ,{
        url:'/camera',
        views:{
            'menus-camera':{
                templateUrl:'html/camera.html',
                controller:'cameraCtrl' 
            }
        }
    })
    .state('menus.gps' ,{
        url:'/gps',
        views:{
            'menus-gps':{
                templateUrl:'html/gps.html',
                controller:'gpsCtrl' 
            }
        }
    });

    $urlRouterProvider.otherwise('/menus/home');
})
.controller('homeCtrl', function($scope,$ionicLoading,$http,$timeout,$cordovaSQLite){
       //初始化
      /**
      IAPI.setMyIonicLoading($ionicLoading);
      IAPI.setMyHttp($http);
      IAPI.setMyTimeout($timeout);
      IAPI.setMySQLite($cordovaSQLite)
      
      IAPI.myNotice('初始化完成！');
      **/
      /** if(!IAPI.isOnline()){
          return IAPI.myNotice('暂无网络连接...');
        }**/
     
     /**
    document.addEventListener("deviceready", onDeviceReady, false);
    
    function onDeviceReady(){
       
         IAPI.myNotice('初始化完成！');
         IAPI.createDB();//创建数据库
         IAPI.myNotice('初始化完成！');
    };  **/
})
.controller('listCtrl', function($scope){
    
})
.controller('buttonsCtrl', function($scope){
    
})
.controller("dbCtrl", function($scope,$timeout) {
    $scope.people = {
        firstname:'first',
        lastname:'last'
    }
    $scope.peoples = [];


    $timeout(function(){
         $scope.list();
    },1000)

    $scope.insert = function() {
        //console.log($scope.people.firstname+"="+$scope.people.lastname);
        //IAPI.insertPeople($scope.people.firstname, $scope.people.lastname);

    }
    

     $scope.list = function() {
        /**
        $scope.peoples = [];
        var query = "SELECT firstname, lastname from people ";
        IAPI.query(query,[],function(res){
            $scope.totalCount = res.rows.length;
            if(res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.peoples.push(res.rows.item(i));
                };
            }
        });**/
    }

    $scope.delete = function(firstname) {
       // console.log('delete:'+firstname);
       /**
       var query = "delete from people where firstname=?";
        IAPI.query(query,[firstname],function(res){
            IAPI.myNotice('删除成功！');
            $scope.list()
        })**/
    }

    
    //$cordovaSQLite.deleteDB("my.db");
})
.controller('cameraCtrl', function($scope,$cordovaCamera){
      /**
       $scope.getPhoto = function() {
           console.log(Camera);
           $scope.myCamera = Camera;
            
            Camera.getPicture().then(function(imageURI) {
              console.log(imageURI);
              $scope.imgurl = imageURI;
              $scope.lastPhoto = imageURI;
            }, function(err) {
              console.err(err);
            }, {
              quality: 75,
              targetWidth: 320,
              targetHeight: 320,
              saveToPhotoAlbum: false
            });
          };**/
     $scope.getPhoto = function() {
          var options = {
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: Camera.PictureSourceType.CAMERA,
            };
         
            $cordovaCamera.getPicture(options).then(function(imageURI) {
              console.log(imageURI);
              $scope.imgurl = imageURI;
              $scope.lastPhoto = imageURI;
            }, function(err) {
              // error
            });
        };

})
.controller('gpsCtrl', function($scope){
    $scope.getLocation = function(){
        $scope.msg ="准备定位中...";
        window.LocationPlugin.getLocation(function(data){
                //data.longtitude 经度
                //data.latitude 纬度
                //data.address 文字描述的地址信息
                //data.hasRadius 是否有定位精度半径
                //data.radius 定位精度半径
                //data.type 定位方式
            $scope.$apply(function(){
                 $scope.msg =  "经度："+data.longtitude
                            + "|| 纬度"+data.latitude
                            + "|| 文字描述的地址信息"+data.address
                            + "|| 是否有定位精度半径"+data.hasRadius
                            + "|| 定位精度半径"+data.radius
                            + "|| 定位方式"+data.type;
            });
            
        },function(msg){
                console.log("错误消息："+msg);
              $scope.$apply(function(){
                $scope.msg="错误消息："+msg;
              });
                
        });
    };
});
