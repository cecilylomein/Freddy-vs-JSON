var suggestedMovies;
var allMovies;
var searchBy;
var input; 
var api = ____;

/* Sends request, fetches and loads data */
function loadApplication(method, url) {
	request = new XMLHttpRequest();
	request.open(method, url, true);
	requestion.onreadystatechange = handleReq;
	request.send();
}


/* Handles request */
function handleReq() {
	if (request.readyState == 4 && request.status == 200) {



		parseMovieList();
		listMovies();
	}
	else if (request.readyState == 4 && request.status == 404) {
		alert("ERROR. Try reloading the browser again.");
	}

}

/* Parse JSON */
function parseMovieList() {

}

function init() {
	loadApplication('GET', api);
}


function renderPage(n) {
	
}


function showAll() {
	suggestedMovies = allMovies;
}

function searchByDirector() {
	renderPage('d');
}

function searchByYear() {
	renderPage('y');
}

function searchByCountry() {
	renderPage('c');
}

function searchByGenre() {
	renderPage('g');

}