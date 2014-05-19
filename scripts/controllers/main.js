'use strict';

angular.module('youtubeRadio')
  .controller('MainCtrl', function($scope, youtubeRelated, youtubeSearch, lastfmSimilar, $q, $http, $route){

    function ytRelated(id, callback){
    	var query = youtubeRelated.query({ id: id }),
            yt = [];
    	query.$promise.then(function(data){    		  	
		    angular.forEach(data.feed.entry, function(item, i){
		      this.push({
	            artist  : item.title.$t.split(" - ")[0],
	            title   : item.title.$t.split(" - ")[1] || '',
	            videoid : item.link[1].href.split("/")[item.link[1].href.split("/").length - 2]
		      });
		    }, yt);
		    if(callback && typeof callback == 'function'){
                callback.call(this, yt);
            };
	    });
    };


    function ytSearch(keyword, callback){
        var query = youtubeSearch.query({q: keyword}),
            yt = [];
        query.$promise.then(function(data){   
            angular.forEach(data.feed.entry, function(item, i){
              this.push({
                artist  : item.title.$t.split(" - ")[0],
                title   : item.title.$t.split(" - ")[1],
                videoid : item.link[1].href.split("/")[item.link[1].href.split("/").length - 2]
              });
            }, yt);
            if(callback && typeof callback == 'function'){
                callback.call(this, yt);
            };
        });
    };

    function lfSimilar(keyword, callback){
        var query = lastfmSimilar.query({artist:keyword}),
            lastfm = [];
        query.$promise.then(function(data){
            angular.forEach(data.similarartists.artist, function(item, i){
                this.push({
                    artist : item.name, 
                    image  : item.image[2]["#text"]
                });
            }, lastfm);
            if(callback && typeof callback == 'function'){
                callback.call(this, lastfm);
            };
        });
    };

    function setPlayer(src){
        document.getElementById('player').src = src;
    };

    function setPlaylist(arr, first){
        var list = [], 
            first = first || arr[0].videoid;
        for(var i=0,max=arr.length;i<max;i++){
            list.push(arr[i].videoid);
        };
        setPlayer('http://www.youtube.com/embed/'+ first +'?autoplay=1&playlist='+list.join(","));
    };

    function addList(arrA, arrB){
        arrA.push.apply(arrA,arrB);
    };
    function updateList(arrA, arrB){
        arrA.length = 0;
        arrA.push.apply(arrA,arrB);
    };

    
    $scope.suggested = [];
    $scope.similar   = [];
    $scope.playlist  = [];

    $scope.searchYoutube = function(query){

        ytSearch(query, function(data){
            updateList($scope.suggested, data);
            //setPlaylist($scope.playlist);
        });

        lfSimilar(query, function(data){
            updateList($scope.similar, data);
        });
    };

    var initApp = (function(){
        var initVideo = '';
        var best = ['79YDgv_zWA4','4N31oFeinFY','hT_nvWreIhg','dR3ccmWmLhk','gtOV7bp-gys','4L0YW0tqd_4','Jj-_addP19M','6nQCxwneUwA','yVDuJBBr-Oc','eUMwFaXTM3s','j5dFe-WKuPs','oNtFcXqG4w8','3Y_Op6yqpeU','JzAektg101M','6rgStv12dwA','6t7EvaWIOn8','3WmK19dXRZc','PSSpFI-rhL0','Py5AKfC5kV4','3Hc0SL76UGo','wycjnCCgUes','J43T8rEOg-I','91FiJsPOQTs','MuZhnNR6vzc','RNuUgbUzM8U','IKTJoHbKZO0','FemwJXl4rLA','thag2Hlos6E','Pib8eYDSFEI','ZNeXVSt8E80','EBAzlNJonO8','zq7chp71sRo','GozvYidSMqg','X_bFO1SNRZg','lmc21V-zBq0','rVeMiVU77wo','HIfFA8-RaHQ','LEtlbQnfhxU','RF0HhrwIwp0','9PnOG67flRA','1p-qilKyOmo','numCZoBFcv4','vI2HOKQ9QnA','kqjeNSNuNPM','CJXAxlj1-Z8','-aW7NFSGklM','v33r88NXK-8','qRs0MrfDhmw','x4yxoHwNzEE'];
        if($route.current.params.videoid){
            initVideo = $route.current.params.videoid;            
        }else{
            initVideo = shuffle(best)[0];
            console.log('initVideo', initVideo);
        };
        ytDeepRelated(initVideo, function(data){
            updateList($scope.playlist, data);
            setPlaylist($scope.playlist, initVideo);
            console.log('init:data[0].artist', data[0].artist);
            lfSimilar(data[0].artist, function(similar){
                updateList($scope.similar, similar);
            });
        });

    })();
    
    /* FIXME: $q.all() deferred promises should be used instead of this callback hell: */
    function ytDeepRelated(id, callback){
        var deepResult = [];
        ytRelated(id, function(primary){
            ytRelated(primary[0].videoid, function(secondary){
                addList(deepResult, secondary);
                ytRelated(primary[1].videoid, function(tertiary){
                    addList(deepResult, tertiary);
                    ytRelated(primary[2].videoid, function(quartery){
                        addList(deepResult, quartery);
                        shuffle(deepResult);
                        callback(deepResult);
                    });
                });
            });   
        });
    };
    
    function shuffle(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        };
        return array;
    };


  });
