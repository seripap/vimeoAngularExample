vimeoApp.directive('vimeoPlayer', function($rootScope, $document, $compile) {

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
