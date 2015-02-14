// Guardian and page load variables
var guardianKey = 'qvyzgawpwcd8pd5debezxuxy';
var guardianBaseUrl = 'http://content.guardianapis.com/search?q=debates&show-fields=trailText&api-key=';
var pageToLoad = 1;
var allowLoad = true;


/**
 * Load 10 new articles for page number = pageToLoad
 */
function loadNewArticles(){
	// Remove any previously left error messages and add loading message
	$('#error').remove();
	$('#maincontent').append('<div id="loading">Loading new articles</div>');
	
	var guardianUrl = guardianBaseUrl + guardianKey + '&page=' + pageToLoad;
	$.getJSON(guardianUrl, function( data ){
		// Output articles
		var articles = data.response.results;
		for (var i = 0; i < articles.length; i++) {
			$('#maincontent').append('<h3><a href="' + articles[i].webUrl + '">' + articles[i].webTitle + '</a></h3>');
			$('#maincontent').append(articles[i].fields.trailText);
		};

		// Remove loading message and increment pageToLoad
		$('#loading').remove();
		pageToLoad++;

	}).fail(function() {
		// Remove loading message and replace with error message
		$('#loading').remove();
    	$('#maincontent').append('<div id="error">Sorry there was an error loading your articles</div>');
  	});

	
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
	    	loadNewArticles();
	    	setTimeout(function(){allowLoad=true},500);
   		};		
    };
});

