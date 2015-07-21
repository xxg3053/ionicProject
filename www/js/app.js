// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db=null;
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
    db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS people (id integer primary key, firstname text, lastname text)");
  });
})
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
    .state('menus.db' ,{
        url:'/db',
        views:{
            'menus-db':{
                templateUrl:'html/sqlite.html',
                controller:'dbCtrl' 
            }
        }
    });

    $urlRouterProvider.otherwise('/menus/home');
})
.controller('homeCtrl', ['$scope', function($scope){
    
}])
.controller("dbCtrl", function($scope, $cordovaSQLite,$ionicLoading,$timeout) {
    $scope.people = {
        firstname:'first',
        lastname:'last'
    }
    $scope.peoples = [];
    $scope.myNotice = function(msg, timeout){
        $ionicLoading.show({template:msg});
        $timeout(function(){$ionicLoading.hide();}, timeout || 1000);
        return false;
    }

    $timeout(function(){
         $scope.list();
    },1000)

    $scope.insert = function() {
        console.log($scope.people.firstname+"="+$scope.people.lastname);
        var query = "INSERT INTO people (firstname, lastname) VALUES (?,?)";
        $cordovaSQLite.execute(db, query, [$scope.people.firstname, $scope.people.lastname]).then(function(res) {
           console.log("INSERT ID -> " + res.insertId);
            $scope.myNotice("录入成功：id:"+res.insertId,2000);
            $scope.list();
        }, function (err) {
            console.error(err);
             $scope.myNotice("error"+err);
        });
    }
    
    $scope.select = function(lastname) {
        var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
        $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
            if(res.rows.length > 0) {
                console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
    }

     $scope.list = function(lastname) {
        $scope.peoples = [];
        var query = "SELECT firstname, lastname from people ";
        $cordovaSQLite.execute(db,query,[]).then(function(res){
            $scope.totalCount = res.rows.length;
            if(res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    $scope.peoples.push(res.rows.item(i));
                };
            }
        },function (err) {
            console.error(err);
        });
    }

    $scope.delete = function(firstname) {
        console.log('delete:'+firstname);
        var query = "delete from people where firstname=?";
        $cordovaSQLite.execute(db,query,[firstname]).then(function(res){
            $scope.list();
        },function (err) {
            console.error(err);
        });
    }

    
    //$cordovaSQLite.deleteDB("my.db");
});
