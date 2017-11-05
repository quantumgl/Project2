var app = angular.module('dir', []);

app.directive('userSelection', function () {
    return {
        restrict: 'E',
        templateUrl: '/Users/user-selection.html',
        controller: function () {
            this.tab = 1;
            this.selectTab = function (setTab) {
                this.tab = setTab;
            };
            this.isSelected = function (checkTab) {
                return this.tab === checkTab;
            };
        },
        controllerAs: 'panel' //Alias
    };
});
