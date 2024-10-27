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

// const width = 1000;
// const height = 600;
// const padding = 50;
// const squarePadding = 40;

// d3.csv("currencies.csv").then(data => {

// 	data.forEach(d => {
// 		d.Rates = +d.Rates;
// 	});

// 	const sortedData = data.sort((a, b) => b.Rates - a.Rates).slice(0, 100);

// 	const colorScale = d3.scaleOrdinal()
// 		.domain(sortedData.map(d => d.Currency))
// 		.range(d3.schemeCategory10);

// 	const pack = d3.pack()
// 		.size([width - padding * 2, height - padding * 2]) 
// 		.padding(squarePadding);

// 	const hierarchy = d3.hierarchy({children: sortedData})
// 		.sum(d => d.Rates);

// 	const root = pack(hierarchy);

// 	const svg = d3.select("#chart")
// 		.attr("width", width)
// 		.attr("height", height);

// 	const squares = svg.selectAll(".square")
// 		.data(root.descendants().slice(1)) 
// 		.enter()
// 		.append("g")
// 		.attr("class", "square")
// 		.attr("transform", d => `translate(${Math.random() * (width - padding * 2) + padding}, ${Math.random() * (height - padding * 2) + padding})`);  


// 	const sizeFactor = 2.0; 

// 	squares.append("rect")
// 		.attr("width", d => d.r * 2 * sizeFactor) 
// 		.attr("height", d => d.r * 2 * sizeFactor)  
// 		.attr("x", d => -d.r * sizeFactor)
// 		.attr("y", d => -d.r * sizeFactor) 
// 		.attr("fill", d => colorScale(d.data.Currency));

// 	squares.transition()
// 		.duration(2000) 
// 		.attr("transform", d => `translate(${d.x + padding}, ${d.y + padding})`);

// 	squares.append("text")
// 		.attr("dy", "-0.4em")
// 		.style("text-anchor", "middle")
// 		.append("tspan")
// 		.attr("class", "currency")
// 		.text(d => d.data.Currency)
// 		.append("tspan")
// 		.attr("class", "rates")
// 		.attr("x", 0)
// 		.attr("dy", "1.2em")
// 		.text(d => d.data.Rates.toLocaleString());

// 	d3.selectAll("text").style("fill", "black");

// });

const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");
const squareSize = 70; // Base size for the squares
const padding = 10; // Increase this value for more padding between squares
const logoSize = 16; // Size of the logos
const cols = Math.floor(width / squareSize); 
const borderColors = ["#ff0000", "#60e550"];
//const colorScale = d3.scaleOrdinal(d3.schemeCategory10); 
// Create squares with random positions
d3.csv("currencies.csv").then(data => {
const squares = [];

    
data.forEach(d => {
    let attempts = 0;
    let x, y, overlaps;
    const value = +d.Rates;
    
    do {
        x = Math.random() * (width - squareSize);
        y = Math.random() * (height - squareSize);
        
        overlaps = squares.some(square => 
            x < square.x + squareSize && 
            x + squareSize > square.x && 
            y < square.y + squareSize && 
            y + squareSize > square.y
        );

        attempts++;
    } while (overlaps && attempts < 100); // Limit attempts
    //const x = (index % cols) * squareSize; // Column-wise placement
        //  const y = Math.floor(index / cols) * squareSize; // Row-wise placement


    if (attempts < 100) {
        squares.push({ x, y, name: d.Currency, value, image: d.image });
    }
});
// Create squares
    svg.selectAll(".square")
    .data(squares)
    .enter()
    .append("rect")
    .attr("class", "square")
    .attr("x", d => d.x) // Random x position
    .attr("y", d => d.y) // Random y position
    .attr("width", squareSize) // Set square width
    .attr("height", squareSize) // Set square height
    //.attr("fill", d => d.color);
    .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
    //.attr("stroke", "#60e550") // Border color
    .attr("stroke", (d, i) => borderColors[i % borderColors.length]) // Different border color
        .attr("stroke-width", 2); // Border width
    //.attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

    
    // Add text inside squares
    svg.selectAll(".square-text-name")
        .data(squares)
        .enter()
        .append("text")
        .attr("class", "square-text-name")
        .attr("x", d => d.x + squareSize / 2) // Center text horizontally
        .attr("y", d => d.y + squareSize  / 2) // Position for name
        .text(d => d.name); // Display name

    svg.selectAll(".square-value")
        .data(squares)
        .enter()
        .append("text")
        .attr("class", "square-text")
        .attr("x", d => d.x + squareSize / 2) // Center text horizontally
        .attr("y", d => d.y + (3 * squareSize) / 4) // Position for value
        .text(d => d.value); // Display value
    svg.selectAll(".square-image")
        .data(squares)
        .enter()
        .append("image")
        .attr("class", "square-image")
        .attr("xlink:href", d => d.image) // Set the image source
        .attr("x", d => d.x + (squareSize - logoSize) / 2) // Center the image horizontally
        .attr("y", d => d.y + (squareSize - logoSize) / 8) // Center the image vertically
        .attr("width", logoSize) // Set smaller image width
        .attr("height", logoSize); // Set smaller image height
});