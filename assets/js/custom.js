function formatCrypto (state) {
  if (!state.id) {
    return state.text;
  }
  var baseUrl = "/cryptosquares/assets/images/cryptocurrency";
  var $state = $(
    '<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.png" class="crypto-img" /> ' + state.text + '</span>'
  );
  return $state;
}


$(document).ready(function() {
    $('.cryptocurrency').select2({
        templateResult: formatCrypto,
	    templateSelection: formatCrypto
    });
});

// Set up the chart dimensions
const width = 800; // 14 inches at 120 DPI
const height = 600; // 14 inches at 120 DPI
const padding = 50;

// Load the data
// var protocol = location.protocol
// var host = location.host

// var baseUrl = protocol + "//" + host + "/"


d3.csv("currency.csv").then(data => {
	// Convert population strings to numbers
	data.forEach(d => {
		d.Population = +d.Population;
	});

	// Sort the data by population in descending order and get the top 20 countries
	const sortedData = data.sort((a, b) => b.Population - a.Population).slice(0, 1000);

	// Create the color scale
	const colorScale = d3.scaleOrdinal()
		.domain(sortedData.map(d => d.Country))
		.range(d3.schemeCategory10);

	// Create the pack layout
	const pack = d3.pack()
		.size([width - padding, height - padding])
		.padding(5);

	// Create the hierarchy from the data
	const hierarchy = d3.hierarchy({children: sortedData})
		.sum(d => d.Population);

	// Compute the pack layout
	const root = pack(hierarchy);

	// Create the SVG element
	const svg = d3.select("#chart")
		.attr("width", width)
		.attr("height", height);

	// Create the bubbles
	const bubbles = svg.selectAll(".bubble")
		.data(root.descendants().slice(1))
		.enter()
		.append("g")
		.attr("class", "bubble")
		.attr("transform", d => `translate(${d.x + padding}, ${d.y + padding})`);

	// Add the circles to the bubbles
	bubbles.append("circle")
		.attr("r", d => d.r)
		.attr("fill", d => colorScale(d.data.Country));

	// Add the country name and population text to the bubbles
	bubbles.append("text")
		.attr("dy", "-0.4em")
		.style("text-anchor", "middle")
		.append("tspan")
		.attr("class", "country")
		.text(d => d.data.Country)
		.append("tspan")
		.attr("class", "population")
		.attr("x", 0)
		.attr("dy", "1.2em")
		.text(d => d.data.Population.toLocaleString());

	// Set the text color to black
	d3.selectAll("text").style("fill", "black");
});
