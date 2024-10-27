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

/* First JS */

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

/* Second JS */

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

/* Third JS */

// const svg = d3.select("#chart")
//     .attr("width", "100%") 
//     .attr("height", "100%")
//     .attr("viewBox", `0 0 1500 540`) 
//     .attr("preserveAspectRatio", "xMinYMin meet"); 

// const width = 1500;
// const height = 540;
// const squareSize = 70;
// const padding = 10;
// const logoSize = 16;

// const defs = svg.append("defs");

// const gradient = defs.append("linearGradient")
//     .attr("id", "borderGradient")
//     .attr("x1", "0%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "100%");

// gradient.append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", "#f5a623"); 

// gradient.append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", "#f56b2a"); 

// d3.csv("currencies.csv").then(data => {
//     const squares = [];

//     data.forEach(d => {
//         let attempts = 0;
//         let x, y, overlaps;
//         const value = +d.Rates;

//         do {
//             x = Math.random() * (width - squareSize);
//             y = Math.random() * (height - squareSize);

//             overlaps = squares.some(square => 
//                 x < square.x + squareSize && 
//                 x + squareSize > square.x && 
//                 y < square.y + squareSize && 
//                 y + squareSize > square.y
//             );

//             attempts++;
//         } while (overlaps && attempts < 100);

//         if (attempts < 100) {
//             squares.push({ x, y, name: d.Currency, value, image: d.image });
//         }
//     });

//     svg.selectAll(".square")
//         .data(squares)
//         .enter()
//         .append("rect")
//         .attr("class", "square")
//         .attr("x", d => d.x)
//         .attr("y", d => d.y)
//         .attr("width", squareSize)
//         .attr("height", squareSize) 
//         .attr("fill", (d, i) => d3.schemeCategory10[i % 10]) 
//         .attr("stroke", "url(#borderGradient)") 
//         .attr("stroke-width", 4); 

//     svg.selectAll(".square-text-name")
//         .data(squares)
//         .enter()
//         .append("text")
//         .attr("class", "square-text-name")
//         .attr("x", d => d.x + squareSize / 2)
//         .attr("y", d => d.y + squareSize / 2)
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

/* Fourth JS */

// const svg = d3.select("#chart")
//     .attr("width", "100%") 
//     .attr("height", "100%")
//     .attr("viewBox", `0 0 1500 540`) 
//     .attr("preserveAspectRatio", "xMinYMin meet"); 

// const width = 1500;
// const height = 540;
// const squareSize = 70;
// const logoSize = 16;

// const defs = svg.append("defs");

// const highGradient = defs.append("linearGradient")
//     .attr("id", "highGradient")
//     .attr("x1", "0%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "100%");

// highGradient.append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", "#ff0000"); 

// highGradient.append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", "#ffdb4d");  

// const lowGradient = defs.append("linearGradient")
//     .attr("id", "lowGradient")
//     .attr("x1", "0%")
//     .attr("y1", "0%")
//     .attr("x2", "100%")
//     .attr("y2", "100%");

// lowGradient.append("stop")
//     .attr("offset", "0%")
//     .attr("stop-color", "#60e550"); 

// lowGradient.append("stop")
//     .attr("offset", "100%")
//     .attr("stop-color", "#00bcd4"); 


// const valueThreshold = 5000; 

// d3.csv("currencies.csv").then(data => {
//     const squares = [];

//     data.forEach(d => {
//         let attempts = 0;
//         let x, y, overlaps;
//         const value = +d.Rates;

//         do {
//             x = Math.random() * (width - squareSize);
//             y = Math.random() * (height - squareSize);

//             overlaps = squares.some(square => 
//                 x < square.x + squareSize && 
//                 x + squareSize > square.x && 
//                 y < square.y + squareSize && 
//                 y + squareSize > square.y
//             );

//             attempts++;
//         } while (overlaps && attempts < 100);

//         if (attempts < 100) {
//             squares.push({ x, y, name: d.Currency, value, image: d.image });
//         }
//     });

//     svg.selectAll(".square")
//         .data(squares)
//         .enter()
//         .append("rect")
//         .attr("class", "square")
//         .attr("x", d => d.x) 
//         .attr("y", d => d.y)
//         .attr("width", squareSize)
//         .attr("height", squareSize)
//         .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
//         .attr("stroke", d => d.value > valueThreshold ? "url(#highGradient)" : "url(#lowGradient)") 
//         .attr("stroke-width", 4);  

    
//     svg.selectAll(".square-text-name")
//         .data(squares)
//         .enter()
//         .append("text")
//         .attr("class", "square-text-name")
//         .attr("x", d => d.x + squareSize / 2)
//         .attr("y", d => d.y + squareSize / 2)
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

/* Fifth JS */

const svg = d3.select("#chart")
    .attr("width", "100%") 
    .attr("height", "100%")
    .attr("viewBox", `0 0 1500 540`)  
    .attr("preserveAspectRatio", "xMinYMin meet");  

const width = 1500;
const height = 540;
const squareSize = 70; 
const logoSize = 16;

const defs = svg.append("defs");

const highGradient = defs.append("linearGradient")
    .attr("id", "highGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%");

highGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#ff5e5e"); 

highGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#ffcc00"); 

const lowGradient = defs.append("linearGradient")
    .attr("id", "lowGradient")
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "100%");


lowGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#60e550"); 

lowGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#00bcd4"); 


const valueThreshold = 5000; 

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
        } while (overlaps && attempts < 100);

        if (attempts < 100) {
            squares.push({ x, y, name: d.Currency, value, image: d.image });
        }
    });


    svg.selectAll(".square")
        .data(squares)
        .enter()
        .append("rect")
        .attr("class", "square")
        .attr("x", d => d.x + squareSize / 2)
        .attr("y", d => d.y + squareSize / 2) 
        .attr("width", 0)
        .attr("height", 0) 
        .attr("fill", (d, i) => d3.schemeCategory10[i % 10]) 
        .attr("stroke", d => d.value > valueThreshold ? "url(#highGradient)" : "url(#lowGradient)") 
        .attr("stroke-width", 4) 
        .transition() 
        .duration(1000)
        .attr("x", d => d.x)
        .attr("y", d => d.y) 
        .attr("width", squareSize) 
        .attr("height", squareSize) 
        .ease(d3.easeElastic); 

	const nameText = svg.selectAll(".square-text-name")
        .data(squares)
        .enter()
        .append("text")
        .attr("class", "square-text-name")
        .attr("x", d => d.x + squareSize / 2)
        .attr("y", d => d.y + squareSize / 2)
        .attr("opacity", 0)
        .text(d => d.name)
        .transition()
        .duration(1000)
        .attr("opacity", 1)
        .ease(d3.easeElastic);

	function moveElements() {
		svg.selectAll(".square")
			.transition()
			.duration(3000)
			.attr("x", function(d) {
				d.x = (d.x + Math.random() * 100 - 50) % width;
				if (d.x < 0) d.x += width;
				return d.x;
			})
			.attr("y", function(d) {
				d.y = (d.y + Math.random() * 100 - 50) % height;
				if (d.y < 0) d.y += height;
				return d.y;
			})
			.on("end", moveElements);

		svg.selectAll(".square-text-name")
			.transition()
			.duration(3000)
			.attr("x", function(d) { return d.x + squareSize / 2; })
			.attr("y", function(d) { return d.y + squareSize / 2; })
			.on("end", moveElements);
	}

	setTimeout(moveSquares, 1200);

    svg.selectAll(".square")
        .transition()
        .delay(1000)
        .duration(2000)
        .ease(d3.easeSin)
        .attr("width", squareSize * 1.1) 
        .attr("height", squareSize * 1.1) 
        .attr("x", d => d.x - squareSize * 0.05) 
        .attr("y", d => d.y - squareSize * 0.05) 
        .transition()
        .duration(2000)
        .attr("width", squareSize) 
        .attr("height", squareSize) 
        .attr("x", d => d.x) 
        .attr("y", d => d.y) 
        .ease(d3.easeSin)
        .on("end", function() {
            d3.select(this).transition().call(d3.select(this).transition()); 
        });

    svg.selectAll(".square-text-name")
        .data(squares)
        .enter()
        .append("text")
        .attr("class", "square-text-name")
        .attr("x", d => d.x + squareSize / 2)
        .attr("y", d => d.y + squareSize / 2)
        .text(d => d.name);

    svg.selectAll(".square-value")
        .data(squares)
        .enter()
        .append("text")
        .attr("class", "square-text")
        .attr("x", d => d.x + squareSize / 2)
        .attr("y", d => d.y + (3 * squareSize) / 4)
        .text(d => d.value);
});