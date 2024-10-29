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

// const width = 1200;
// const height = 600;
// const padding = 50;

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
// 		.padding(50);

// 	const hierarchy = d3.hierarchy({children: sortedData})
// 		.sum(d => d.Rates);

// 	const root = pack(hierarchy);

// 	const svg = d3.select("#chart")
// 		.attr("width", width)
// 		.attr("height", height);

// 	const bubbles = svg.selectAll(".bubble")
// 		.data(root.descendants().slice(1)) 
// 		.enter()
// 		.append("g")
// 		.attr("class", "bubble")
// 		.attr("transform", d => `translate(${Math.random() * (width - padding * 2) + padding}, ${Math.random() * (height - padding * 2) + padding})`);  // Start from random positions within bounds

	
// 	const sizeFactor = 2.0; 
	
// 	bubbles.append("circle")
// 		.attr("r", d => d.r * 2 * sizeFactor) 
// 		.attr("fill", d => colorScale(d.data.Currency));

// 	bubbles.transition()
// 		.duration(2000) 
// 		.attr("transform", d => `translate(${d.x + padding}, ${d.y + padding})`);

// 	bubbles.append("text")
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

const svg = d3.select("#chart")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 1500 540`)
    .attr("preserveAspectRatio", "xMinYMin meet");

const width = 1500;
const height = 540;
const baseSquareSize = 70; 
const padding = 10; 

const squareSize = Math.min(baseSquareSize * (window.innerWidth / 1500), 100); 

const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const modalClose = document.querySelector(".modal-close");

modalClose.onclick = function() {
  modal.style.display = "none";
};

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

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
        .attr("stroke", d => d.value > 5000 ? "url(#highGradient)" : "url(#lowGradient)")
        .attr("stroke-width", 4)
        .on("click", (event, d) => {
            modal.style.display = "block";
            modal.style.background = "rgba(0,0,0,0.5)"
            modalText.textContent = `Currency: ${d.name}\nRate: ${d.value}`;
        })
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
        .on("click", (event, d) => {
            modal.style.display = "block";
            modal.style.background = "rgba(0,0,0,0.5)"
            modalText.textContent = `Currency: ${d.name}\nRate: ${d.value}`;
        })
        .transition()
        .duration(1000)
        .attr("opacity", 1)
        .ease(d3.easeElastic);
});