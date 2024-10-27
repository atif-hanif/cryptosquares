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

// const svg = d3.select("svg");
// const width = +svg.attr("width");
// const height = +svg.attr("height");
// const squareSize = 70;
// const padding = 10;
// const logoSize = 16;
// const cols = Math.floor(width / squareSize); 
// const borderColors = ["#ff0000", "#60e550"];
// d3.csv("currencies.csv").then(data => {
// const squares = [];

    
// data.forEach(d => {
//     let attempts = 0;
//     let x, y, overlaps;
//     const value = +d.Rates;
    
//     do {
//         x = Math.random() * (width - squareSize);
//         y = Math.random() * (height - squareSize);
        
//         overlaps = squares.some(square => 
//             x < square.x + squareSize && 
//             x + squareSize > square.x && 
//             y < square.y + squareSize && 
//             y + squareSize > square.y
//         );

//         attempts++;
//     } while (overlaps && attempts < 100); 


//     if (attempts < 100) {
//         squares.push({ x, y, name: d.Currency, value, image: d.image });
//     }
// });

//     svg.selectAll(".square")
//     .data(squares)
//     .enter()
//     .append("rect")
//     .attr("class", "square")
//     .attr("x", d => d.x)
//     .attr("y", d => d.y)
//     .attr("width", squareSize)
//     .attr("height", squareSize)
//     .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
//     .attr("stroke", (d, i) => borderColors[i % borderColors.length])
//         .attr("stroke-width", 2);

//     svg.selectAll(".square-text-name")
//         .data(squares)
//         .enter()
//         .append("text")
//         .attr("class", "square-text-name")
//         .attr("x", d => d.x + squareSize / 2)
//         .attr("y", d => d.y + squareSize  / 2)
//         .text(d => d.name);

//     svg.selectAll(".square-value")
//         .data(squares)
//         .enter()
//         .append("text")
//         .attr("class", "square-text")
//         .attr("x", d => d.x + squareSize / 2)
//         .attr("y", d => d.y + (3 * squareSize) / 4) 
//         .text(d => d.value);
//     svg.selectAll(".square-image")
//         .data(squares)
//         .enter()
//         .append("image")
//         .attr("class", "square-image")
//         .attr("xlink:href", d => d.image)
//         .attr("x", d => d.x + (squareSize - logoSize) / 2) 
//         .attr("y", d => d.y + (squareSize - logoSize) / 8)
//         .attr("width", logoSize)
//         .attr("height", logoSize);
// });

const svg = d3.select("#chart")
    .attr("width", "100%")  // Make SVG responsive width-wise
    .attr("height", "100%") // Make SVG responsive height-wise
    .attr("viewBox", `0 0 1500 540`)  // Set viewBox for responsiveness
    .attr("preserveAspectRatio", "xMinYMin meet");  // Preserve aspect ratio

const width = 1500; // Define fixed viewBox width
const height = 540; // Define fixed viewBox height
const squareSize = 70; // Base size for the squares
const padding = 10; // Increase this value for more padding between squares
const logoSize = 16; // Size of the logos

// Define a gradient for the border
const defs = svg.append("defs");

const gradient = defs.append("linearGradient")
    .attr("id", "borderGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%");

// Define color stops for gradient
gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#f5a623");  // Start color

gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#f56b2a");  // End color

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
        .attr("fill", (d, i) => d3.schemeCategory10[i % 10])  // Apply fill color
        .attr("stroke", "url(#borderGradient)")  // Apply gradient to border
        .attr("stroke-width", 4);  // Border width

    // Add text inside squares
    svg.selectAll(".square-text-name")
        .data(squares)
        .enter()
        .append("text")
        .attr("class", "square-text-name")
        .attr("x", d => d.x + squareSize / 2) // Center text horizontally
        .attr("y", d => d.y + squareSize / 2) // Position for name
        .text(d => d.name); // Display name

    svg.selectAll(".square-value")
        .data(squares)
        .enter()
        .append("text")
        .attr("class", "square-text")
        .attr("x", d => d.x + squareSize / 2) // Center text horizontally
        .attr("y", d => d.y + (3 * squareSize) / 4) // Position for value
        .text(d => d.value); // Display value

    // Add images inside squares
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