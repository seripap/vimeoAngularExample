/*! vimeoExample
 @modified Saturday, March 1st, 2014, 12:22:16 PM */
vimeoApp.controller("videoMetadataController",function($scope,$sce){$scope.$on("videoCollectionChanged",function(event,data){$scope.metadata=data}),$scope.safeHtml=function(html){return $sce.trustAsHtml(html)}});