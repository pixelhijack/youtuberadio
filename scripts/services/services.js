'use strict';
angular.module('musicResources', ['ngResource'])
    .factory('youtubeRelated', function($resource) {
      return $resource(
            'https://gdata.youtube.com/feeds/api/videos/:id/related?v=2&max-results=50&alt=json&callback=JSON_CALLBACK',
            { },
            { query: { method: 'JSONP', cache: false } }
        );
    })
    .factory('youtubeSearch', function($resource) {
      return $resource(
            'http://gdata.youtube.com/feeds/api/videos?q=:q&v=2&start-index=1&max-results=50&alt=json&callback=JSON_CALLBACK',
            { },
            { query: { method: 'JSONP', cache: false } }
        );
    })
    .factory('lastfmSimilar', function($resource) {
      return $resource(
            'http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=:artist&api_key=4c9a840aeb98791ab0363400efd984ac&format=json&callback=JSON_CALLBACK',
            { },
            { query: { method: 'JSONP', cache: false } }
        );
    });

//http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=" + artist + "&api_key=4c9a840aeb98791ab0363400efd984ac&format=json&callback=?

/*
    $http.jsonp('https://gdata.youtube.com/feeds/api/videos/79YDgv_zWA4/related?v=2&max-results=50&alt=json&callback=JSON_CALLBACK')
    	.success(function(data){
    		console.log('data', data);
    	});
*/