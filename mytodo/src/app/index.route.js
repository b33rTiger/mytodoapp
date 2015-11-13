(function() {
  'use strict';

  angular
    .module('mytodo')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/todos', {
        templateUrl:'app/todos/todos.html',
        controller: 'TodoController',
        controllerAs: 'todos'
      })
      .when('/lists', {
        templateUrl: 'app/lists/list.html',
        controller: 'ListController',
        controllerAs: 'lists'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
