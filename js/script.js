

var results = [
    {
        hotelName: "Costa Adeje Gran Hotel",
        price: "1136.50",
        starRating: 4.6,
        location: "Costa Adeje, Tenerife",
        date: "07.03.2014",
        durationDays: 7,
        departFrom: "East Midlands",
        group: "2 Adults, 2 children & 1 infant",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tellus est, condimentum vel dictum in, ultricies in ex. Sed non rhoncus nisi. Ut quis ullamcorper magna. Aliquam egestas aliquam est, vitae feugiat lectus aliquet dapibus.",
        imgLocation: "assets/image_01.png"
    }, {
        hotelName: "Laguna Park II",
        price: "499.99",
        starRating: 3.2,
        location: "Costa Adeje, Tenerife",
        date: "07.03.2014",
        durationDays: 7,
        departFrom: "Manchester",
        group: "2 Adults & 2 children",
        info: "Suspendisse condimentum risus vel nibh hendrerit tincidunt. Donec quis elementum arcu. Suspendisse gravida enim vel diam imperdiet, nec pretium leo consequat.",
        imgLocation: "assets/image_02.png"
    }, {
        hotelName: "Aguamarina Golf Hotel and Apartments",
        price: "696.80",
        starRating: 4.1,
        location: "Costa Adeje, Tenerife",
        date: "05.27.2014",
        durationDays: 7,
        departFrom: "Liverpool",
        group: "2 Adults & 1 child",
        info: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer rutrum porta neque, at volutpat diam facilisis at. Nulla dictum urna vel tortor ornare, sit amet consequat velit laoreet.",
        imgLocation: "assets/image_03.png"
    }
];
var text;

// add departure locations into select based on our data
function addDepartureLocations() {
    var airportSelect = document.getElementById("departureLocation");
    var option = document.createElement("option");
    option.text = "All";
    option.value = "All";
    airportSelect.add(option);
    results.forEach(function(result) {
        var option = document.createElement("option");
        option.text = result["departFrom"];
        option.value = result["departFrom"];
        airportSelect.add(option);
    });
}

Date.prototype.isSameDateAs = function(pDate) {
  return (
    this.getFullYear() === pDate.getFullYear() &&
    this.getMonth() === pDate.getMonth() &&
    this.getDate() === pDate.getDate()
  );
}

// showing results based on our input data
function showResults(input) {
	text = "<ul>";
	input.forEach(addResult);
	text += "</ul>";
	document.getElementById("pageResults").innerHTML = text;

    collapsibleHotelInfo();
    manageSortButtons();
}

function addResult(value) {
	var resultDate = new Date(value["date"]);
    var departureDate = new Date(document.getElementById("departureDate").value);
    var locationFilter = document.getElementById("departureLocation").value;
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if ((isNaN(departureDate) || resultDate.isSameDateAs(departureDate)) &&
        (locationFilter === "All" || locationFilter === value["departFrom"])) {
        var stars = Math.round(value["starRating"]);
        var starSymbol = "&#11088;";
    	text += "<li style='list-style-type: none'>" +
    			"<header class='hotelHead'>" + 
    				"<section class='hotelName'>" + value["hotelName"] + "<span class='a'>" + starSymbol.repeat(stars) + "</span>" + "<br><span class='b'>" + value["location"] + "</span></section>" + 
    				"<section class='hotelPrice'>holiday price<br> <b>&#163;" + value["price"] + "</b></section>" + 
    			"</header>" +
    			"<figure class='imgContainer'> <img src='" + value["imgLocation"] + "' alt='Image of hotel' id='hotelImage'></figure>" +
    			"<footer class='hotelBottom'>" +
    				"<button class='hotelInfoCollapsible'>" +
                        "<p>" +
                            "<b>" + resultDate.getDate() + " " + monthNames[resultDate.getMonth()] + " " + resultDate.getFullYear() + "</b>" +
                            " for <b>" + value["durationDays"] + " days</b>" +
                            " from <b>" + value["departFrom"] + ", " + value["group"] + "</b>" + 
                        "</p>" +
                    "</button>" +
                    "<summary class='hotelInfo'>" + 
                        "<p>" + value["info"] + "</p>" +
                        "<button class='btnBookNow'> BOOK NOW </button>" +
                    "</summary>" + 
    			"</footer>" +
    		"</li>";
    }
}

function sortByPrice(input) {
	input.sort(function(a,b) {
		return parseFloat(a.price) - parseFloat(b.price);
	});
	showResults(results);
}

function sortByName(input) {
	input.sort(function(a, b){
    	if(a.hotelName < b.hotelName) { return -1; }
    	if(a.hotelName > b.hotelName) { return 1; }
    	return 0;
	});
	showResults(results);
}

function sortByStarRating(input) {
	input.sort(function(a,b) {
		return parseFloat(b.starRating) - parseFloat(a.starRating);
	});
	showResults(results);
}

// Changing sorting buttons to active on click
function manageSortButtons() {
    var btnContainer = document.getElementById("sortButtons");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
}

// ------- Hotel info collapsible content
function collapsibleHotelInfo() {
    var colContainer = document.getElementById("pageResults");
    var coll = colContainer.getElementsByClassName("hotelInfoCollapsible");

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.opacity = 0;
            } else {
                content.style.opacity = 1;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}