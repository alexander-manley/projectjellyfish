(function() {
  'use strict';

  angular.module('app.states')
    .run(appRun);

  /** @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return {
      'projects.list': {
        url: '', // No url, this state is the index of projects
        templateUrl: 'app/states/projects/list/list.html',
        controller: StateController,
        controllerAs: 'vm',
        title: 'Projects',
        resolve: {
          projects: resolveProjects
        }
      }
    };
  }

  /** @ngInject */
  function resolveProjects(Project) {
    return Project.query({archived: false}).$promise;
  }

  /** @ngInject */
  function StateController(projects, lodash) {
    var vm = this;

    vm.projects = projects;
    vm.activate = activate;
    vm.title = 'Projects';

    activate();

    function activate() {
      vm.projects = lodash.sortBy(vm.projects, "name");
    }
  }
})();
