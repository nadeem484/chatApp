// create the module and name it scotchApp
var scotchApp = angular.module('start', ['ngRoute', 'btford.socket-io']);



// configure our routes
scotchApp.config(function ($routeProvider) {
    // route for the login page
    $routeProvider
        .when('/',
            {
                templateUrl: 'templates/Login.html',
                controller: 'loginCtrl'
            })
            .when('/login',
            {
                templateUrl: 'templates/Login.html',
                controller: 'loginCtrl'
            })
        // route for the Registration page
        .when('/Registration',
            {
                templateUrl: 'templates/Registration.html',
                controller: 'registerCtrl'
            })
        .when('/dashboard',
            {
                templateUrl: 'templates/dashboard.html',
                controller: 'listCtrl'
            })
            .when('/dashboard/person', {

                templateUrl: 'templates/person.html',
                controller: 'personalMessgControl'
            });

});

scotchApp.service('SocketService', ['socketFactory', function SocketService(socketFactory) {
    return socketFactory({
        ioSocket: io.connect('http://localhost:4100')
    });
}]);
