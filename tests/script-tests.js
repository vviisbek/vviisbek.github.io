/// <reference path="../js/script.js"/>

beforeEach(function() {
	var fixture = '<p id="pageResults"></p>' +
				  '<div id="sortButtons">' +
				  	'<button id="btnNameSort" class="btn active" type="button" onclick="sortByName(results)">Sort by name</button>' +
					'<button id="btnPriceSort" class="btn" type="button" onclick="sortByPrice(results)">Sort by price</button>' +
					'<button id="btnStarSort" class="btn" type="button" onclick="sortByStarRating(results)">Sort by star rating</button>' +
				  '</div>' + 
				  '<div id="filterDate"><label>Departure date:</label><input type="date" name="Date" id="departureDate"></div>' +
				  '<div id="filterAirport"><label>Departure airport:</label><select id="departureLocation"></select></div>';

	document.body.insertAdjacentHTML(
		'afterbegin',
		fixture);
});

afterEach(function() {
	document.body.removeChild(document.getElementById('pageResults'));
	document.body.removeChild(document.getElementById('sortButtons'));
	document.body.removeChild(document.getElementById('filterDate'));
	document.body.removeChild(document.getElementById('filterAirport'));
})

describe("List of cities", function() {
	var cities;

	beforeEach(function() {
		cities = [
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
		addDepartureLocations();
		document.getElementById("departureDate").innerHTML.value = new Date("07.01.2014");
	});


	it('have correct number of cities', function() {
		expect(cities.length).toEqual(3);
	});

	it('addResult run with no error', function() {
		expect(function() {
			addResult(cities[0]);
		}).not.toThrow();
	});

	it('showResults run with no error', function() {
		expect(function() {
			showResults(cities);
		}).not.toThrow();
	});

	it('showResults output 3 results', function() {
		showResults(cities);
		expect((text.match(new RegExp("<li", "g")) || []).length).toEqual(3);
	});

	it('sortByPrice sorts cities by price', function() {
		sortByPrice(cities);
		expect(cities[0].hotelName).toEqual('Laguna Park II');
		expect(cities[1].hotelName).toEqual('Aguamarina Golf Hotel and Apartments');
		expect(cities[2].hotelName).toEqual('Costa Adeje Gran Hotel');
	});

	it('sortByName sorts cities by name', function() {
		sortByName(cities);
		expect(cities[0].hotelName).toEqual('Aguamarina Golf Hotel and Apartments');
		expect(cities[1].hotelName).toEqual('Costa Adeje Gran Hotel');
		expect(cities[2].hotelName).toEqual('Laguna Park II');

	});

	it('sortByStarRating sorts cities by star rating', function() {
		sortByStarRating(cities);
		expect(cities[0].hotelName).toEqual('Costa Adeje Gran Hotel');
		expect(cities[1].hotelName).toEqual('Aguamarina Golf Hotel and Apartments');
		expect(cities[2].hotelName).toEqual('Laguna Park II');

	});
});
