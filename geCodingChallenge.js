var internet1 = {
	pages: [
		{
			address: "http://foo.bar.com/p1",
			links: [
				"http://foo.bar.com/p2",
				"http://foo.bar.com/p3",
				"http://foo.bar.com/p4"
			]
		},
		{
			address: "http://foo.bar.com/p2",
			links: [
				"http://foo.bar.com/p2",
				"http://foo.bar.com/p4"
			]
		},
		{
			address: "http://foo.bar.com/p4",
			links: [
				"http://foo.bar.com/p5",
				"http://foo.bar.com/p1",
				"http://foo.bar.com/p6"
			]
		},
		{
			address: "http://foo.bar.com/p5",
			links: []
		},
		{
			address: "http://foo.bar.com/p6",
			links: [
				"http://foo.bar.com/p7",
				"http://foo.bar.com/p4",
				"http://foo.bar.com/p5"
			]
		},
	]
}

var internet2 = {
	pages: [
		{
			address: "http://foo.bar.com/p1",
			links: ["http://foo.bar.com/p2"]
		},
		{
			address: "http://foo.bar.com/p2",
			links: ["http://foo.bar.com/p3"]
		},
		{
			address: "http://foo.bar.com/p3",
			links: ["http://foo.bar.com/p4"]
		},
		{
			address: "http://foo.bar.com/p4",
			links: ["http://foo.bar.com/p5"]
		},
		{
			address: "http://foo.bar.com/p5",
			links: ["http://foo.bar.com/p1"]
		},
		{
			address: "http://foo.bar.com/p6",
			links: ["http://foo.bar.com/p1"]
		},
	]
}

function search(internet){

	if (!internet.pages){
		alert("Please supply an 'internet' object");
		return;
	}

	var visited = [];
	var skipped = [];
	var error = [];

	searchHelper(internet.pages[0], skipped, error, internet, visited);

	console.log("Success: " + visited)
	console.log("Skipped: " + skipped)
	console.log("Error: " + error)
}

function findPageIdByAddress(address, pages){
	for (var i = 0; i < pages.length; i++){
		if (pages[i].address === address){
			return i;
		}
	}
}

function searchHelper(page, skipped, error, internet, visited){

	if (visited.includes(page.address)){
		if (!skipped.includes(page.address)){
			skipped.push(page.address)
		}
		return;
	} else {
		visited.push(page.address);
	}

	var adjacentPages = page.links;

	for (var i = 0; i < adjacentPages.length; i++){
		var pageIndexInInternet = findPageIdByAddress(adjacentPages[i], internet.pages);
		
		if (pageIndexInInternet === undefined){
			error.push(adjacentPages[i]);
			continue;
		}

		searchHelper(internet.pages[pageIndexInInternet], skipped, error, internet, visited);
	}
}

console.log("Internet 1:");
search(internet1);

console.log("\nInternet 2");
search(internet2);

