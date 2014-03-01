// Declare our namespace for our app
var vimeoApp = angular.module('vimeoApp', ['angularSmoothscroll']);
;vimeoApp.controller('videoMetadataController', function($scope, $sce) {
	// wait for the broadcast then set the data
	$scope.$on('videoCollectionChanged', function(event, data) {
		$scope.metadata = data;
	});

	// since description returns <br>, we have to trust it
	$scope.safeHtml = function(html) {
		return $sce.trustAsHtml(html);
	}

})
;vimeoApp.directive('vimeoPlayer', function($rootScope, $document, $compile) {

	// vimeo player handler to bind a new player
	var vimeoPlayer = {
		// basic viemo template returned
		_template: function(videoId, width, height) {
			return '<iframe src="//player.vimeo.com/video/' + videoId + '" width="' + width + '" height="' + height + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		},

		initalize: function(videoId, width, height) {
			//overriding the player height and width because the original too big
			//initally you could take this away since the defaults to whatever is provided from the json feed
			var width = 640;
			var height = 360;

			return this._template(videoId, width, height);
		}
	}

	// returning our template
	return function(scope, element, attrs) {
		// wait for data to be recieved before rendering
		scope.$on('videoCollectionChanged', function(event, data) {
			// Create our video template
			var template = vimeoPlayer.initalize(data.id, data.width, data.height);

			// Append the video template to the DOM, dump old player if neccessary
			element.empty().append($compile(template)(scope));
		});
	};
});
;vimeoApp.controller('videoPlayerCollectionController', function($rootScope, $scope, $http) {

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
			$scope.changeVideo(response.data[0]);
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
;// Declare our namespace for our app
var vimeoApp = angular.module('vimeoApp', ['angularSmoothscroll']);
;vimeoApp.controller('videoMetadataController', function($scope, $sce) {
	// wait for the broadcast then set the data
	$scope.$on('videoCollectionChanged', function(event, data) {
		$scope.metadata = data;
	});

	// since description returns <br>, we have to trust it
	$scope.safeHtml = function(html) {
		return $sce.trustAsHtml(html);
	}

})
;vimeoApp.directive('vimeoPlayer', function($rootScope, $document, $compile) {

	// vimeo player handler to bind a new player
	var vimeoPlayer = {
		// basic viemo template returned
		_template: function(videoId, width, height) {
			return '<iframe src="//player.vimeo.com/video/' + videoId + '" width="' + width + '" height="' + height + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
		},

		initalize: function(videoId, width, height) {
			//overriding the player height and width because the original too big
			//initally you could take this away since the defaults to whatever is provided from the json feed
			var width = 640;
			var height = 360;

			return this._template(videoId, width, height);
		}
	}

	// returning our template
	return function(scope, element, attrs) {
		// wait for data to be recieved before rendering
		scope.$on('videoCollectionChanged', function(event, data) {
			// Create our video template
			var template = vimeoPlayer.initalize(data.id, data.width, data.height);

			// Append the video template to the DOM, dump old player if neccessary
			element.empty().append($compile(template)(scope));
		});
	};
});
;vimeoApp.controller('videoPlayerCollectionController', function($rootScope, $scope, $http) {

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
			$scope.changeVideo(response.data[0]);
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
