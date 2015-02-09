// Guardian and page load variables
var guardianKey = 'qvyzgawpwcd8pd5debezxuxy';
var guardianBaseUrl = 'http://content.guardianapis.com/search?q=debates&show-fields=trailText&api-key=';
var guardianUrl = guardianBaseUrl + guardianKey;
var pageToLoad = 1;
var allowLoad = true;


/**
 * Load 10 new articles for page number = pageToLoad
 */
function loadNewArticles(){
	guardianUrl += '&page=' + pageToLoad;
	console.log(guardianUrl);
	$.getJSON(guardianUrl, function( data ){
		var articles = data.response.results;
		//console.log(articles);
		for (var i = 0; i < articles.length; i++) {
			$('#maincontent').append('<h3><a href="' + articles[i].webUrl + '">' + articles[i].webTitle + '</a></h3>');
			$('#maincontent').append(articles[i].fields.trailText);
		};
	});

	pageToLoad++;
};

/**
 * Get doc height
 */
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}

// Initial load of articles
$(loadNewArticles());

// On scroll to bottom, load 10 more articles
$(window).scroll(function() {
	if(allowLoad) {
    	if($(window).scrollTop() + $(window).height() == getDocHeight()) {
   			allowLoad = false;
	   		$('#maincontent').append('<div id="loading">Loading new articles</div>');
	    	loadNewArticles();
	    	$('#loading').remove();
	    	setTimeout(function(){allowLoad=true},500);
   		};		
    };
});

