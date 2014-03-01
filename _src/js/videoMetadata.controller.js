vimeoApp.controller('videoMetadataController', function($scope, $sce) {
	// wait for the broadcast then set the data
	$scope.$on('videoCollectionChanged', function(event, data) {
		$scope.metadata = data;
	});

	// since description returns <br>, we have to trust it
	$scope.safeHtml = function(html) {
		return $sce.trustAsHtml(html);
	}

})
