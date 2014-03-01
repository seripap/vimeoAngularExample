vimeoApp.controller('videoPlayerCollectionController', function($rootScope, $scope, $http) {

	// promise to recieve data
	$scope.getData = function() {
		// define vimeo json
		var url = "http://vimeo.com/api/v2/channel/staffpicks/videos.json";
		var promise = $http.get(url);

		// when the response is recieved
		promise.then(function(response) {
			// set the video data collection to populate from response data
			$scope.videoData = response.data;

			// send the broadcast of the first data
			if (response.data[0]) {
				$scope.changeVideo(response.data[0]);
			}
		});

		// on error, nothing fancy
		promise.catch (function(msg) {
			console.error(msg);
			// alert boxes
			alert('There was an error with the vimeo api. Please try again later.');
		})

	}


	// broadcast new video
	$scope.changeVideo = function(data) {
		// currently playing video ID
		$scope.nowPlaying = data.id;
		// send the broadcast to the rootscope so other controllers have access to the info
		$rootScope.$broadcast('videoCollectionChanged', data);
	}


	// initalize
	$scope.getData();

});
