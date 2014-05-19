'use strict';

angular.module('pxhjckDirectives', [])

.directive("burnAutofocus", function(){
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs){
	            element[0].focus();
	        }
	    };
	})

/*  MODAL DIALOG 
	credit:
	http://adamalbrecht.com/2013/12/12/creating-a-simple-modal-dialog-directive-in-angular-js/ 
*/
.directive('modalDialog', function() {
  return {
    restrict: 'A',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
      	/*  originally: scope.show = false; 
      		if set true, modal can't be simply closed */

      	scope.show = attrs.closable == undefined ? false : attrs.closable === 'true' ? false : true;
      
      	/*
			if(attrs.closable == undefined){
	      		scope.show = false;
	      	}else{
	      		if(attrs.closable === 'true'){
	      			scope.show = false;
	      		}else{
	      			scope.show = true;
	      		};
	      	};
      	*/
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
  };
});