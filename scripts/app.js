'use strict';

angular.module('youtubeRadio', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute', 
  'pxhjckDirectives',
  'musicResources'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/:videoid', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
