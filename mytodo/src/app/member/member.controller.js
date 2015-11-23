(function() {
  'use strict';

  angular
    .module('mytodo')
    .controller('MemberController', ['MemberService', 'AuthenticationService', '$log', '$location', function (MemberService, AuthenticationService, $log, $location) {
      var vm = this;
      vm.boards = [];
      vm.members = {};
      vm.formData = {};

    //Create Member
    vm.createMember = function () {
      MemberService.createMember(vm.formData)
        .then(function (data) {
          $location.path('/memberlogin');
        })
        .catch(function (data) {
          $log.error(data);
        });
    };

    //Login Member
    vm.loginMember = function () {
      MemberService.loginMember(vm.formData)
        .then(function (data) {
          AuthenticationService.setCredentials(data);
          $location.path('/boards/');
        })
        .catch(function (data) {
          $log.error(data);
        });
    };

      //Show Boards
      // BoardService.getBoards()
      //   .then(function (data) {
      //     vm.boards = data;
      //   })
      //   .catch(function (data) {
      //     $log.error(data);
      //   });

      // //Create Board
      // vm.createBoard = function () {
      //   BoardService.createBoard(vm.formData)
      //     .then(function (data){
      //       vm.boards.push(data);
      //       vm.formData = {};
      //     })
      // };

      // //Delete Lists
      // vm.deleteList = function (id) {
      //   $http.post('/api/delete/lists/' + id)
      //     .success(function (data) {
      //       vm.lists = data;
      //     })
      //     .error(function (data) {
      //       $log.error(data);
      //     });
      // };

      // //Edit Lists
      // vm.editList = function (id, updatedItem) {
      //   $http.post('/api/edit/lists/' + id, {name: updatedItem})
      //     .success(function (data) {
      //       vm.lists = data;
      //     })
      //     .error(function (data) {
      //       $log.error(data);
      //     });
      // };
    }]);

})();
