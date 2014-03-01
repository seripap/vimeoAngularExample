/*! vimeoExample
 @modified Saturday, March 1st, 2014, 12:22:16 PM */
var vimeoApp=angular.module("vimeoApp",["angularSmoothscroll"]);vimeoApp.controller("videoMetadataController",function($scope,$sce){$scope.$on("videoCollectionChanged",function(event,data){$scope.metadata=data}),$scope.safeHtml=function(html){return $sce.trustAsHtml(html)}}),vimeoApp.directive("vimeoPlayer",function($rootScope,$document,$compile){var vimeoPlayer={_template:function(videoId,width,height){return'<iframe src="//player.vimeo.com/video/'+videoId+'" width="'+width+'" height="'+height+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'},initalize:function(videoId,width,height){var width=640,height=360;return this._template(videoId,width,height)}};return function(scope,element){scope.$on("videoCollectionChanged",function(event,data){var template=vimeoPlayer.initalize(data.id,data.width,data.height);element.empty().append($compile(template)(scope))})}}),vimeoApp.controller("videoPlayerCollectionController",function($rootScope,$scope,$http){$scope.getData=function(){var url="http://vimeo.com/api/v2/channel/staffpicks/videos.json",promise=$http.get(url);promise.then(function(response){$scope.videoData=response.data,$scope.changeVideo(response.data[0])}),promise.catch(function(msg){console.error(msg),alert("There was an error with the vimeo api. Please try again later.")})},$scope.changeVideo=function(data){$scope.nowPlaying=data.id,$rootScope.$broadcast("videoCollectionChanged",data)},$scope.getData()});var vimeoApp=angular.module("vimeoApp",["angularSmoothscroll"]);vimeoApp.controller("videoMetadataController",function($scope,$sce){$scope.$on("videoCollectionChanged",function(event,data){$scope.metadata=data}),$scope.safeHtml=function(html){return $sce.trustAsHtml(html)}}),vimeoApp.directive("vimeoPlayer",function($rootScope,$document,$compile){var vimeoPlayer={_template:function(videoId,width,height){return'<iframe src="//player.vimeo.com/video/'+videoId+'" width="'+width+'" height="'+height+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'},initalize:function(videoId,width,height){var width=640,height=360;return this._template(videoId,width,height)}};return function(scope,element){scope.$on("videoCollectionChanged",function(event,data){var template=vimeoPlayer.initalize(data.id,data.width,data.height);element.empty().append($compile(template)(scope))})}}),vimeoApp.controller("videoPlayerCollectionController",function($rootScope,$scope,$http){$scope.getData=function(){var url="http://vimeo.com/api/v2/channel/staffpicks/videos.json",promise=$http.get(url);promise.then(function(response){$scope.videoData=response.data,$scope.changeVideo(response.data[0])}),promise.catch(function(msg){console.error(msg),alert("There was an error with the vimeo api. Please try again later.")})},$scope.changeVideo=function(data){$scope.nowPlaying=data.id,$rootScope.$broadcast("videoCollectionChanged",data)},$scope.getData()});