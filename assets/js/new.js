const svg = d3.select("#chart")
    .attr("width", "100%")  // Responsive width
    .attr("height", "100%") // Responsive height
    .attr("viewBox", `0 0 1500 540`)  // Set viewBox for responsiveness
    .attr("preserveAspectRatio", "xMinYMin meet");  // Preserve aspect ratio

const width = 1500;
const height = 540;
const squareSize = 70;  // Size for the squares
const logoSize = 16;  // Size of the logos

// Define gradients for high and low values
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

// Create squares and text with zoom and continuous movement animation
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

    // Create squares with zoom-in animation
    svg.selectAll(".square")
        .data(squares)
        .enter()
        .append("rect")
        .attr("class", "square")
        .attr("x", d => d.x + squareSize / 2)  // Start centered for zoom effect
        .attr("y", d => d.y + squareSize / 2)
        .attr("width", 0)  // Start with size 0
        .attr("height", 0)
        .attr("fill", (d, i) => d3.schemeCategory10[i % 10])  // Apply fill color
        .attr("stroke", d => d.value > 50 ? "url(#highGradient)" : "url(#lowGradient)")
        .attr("stroke-width", 4)
        .transition()
        .duration(1000)
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", squareSize)
        .attr("height", squareSize)
        .ease(d3.easeElastic);

    // Create square names with zoom-in effect
    const nameText = svg.selectAll(".square-text-name")
        .data(squares)
        .enter()
        .append("text")
        .attr("class", "square-text-name")
        .attr("x", d => d.x + squareSize / 2)
        .attr("y", d => d.y + squareSize / 2)
        .attr("opacity", 0)  // Initially invisible
        .text(d => d.name)
        .transition()
        .duration(1000)
        .attr("opacity", 1)
        .ease(d3.easeElastic);

    // Move the squares and the text continuously
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
            .on("end", moveElements);  // Repeat indefinitely

        // Move the text along with the squares
        svg.selectAll(".square-text-name")
            .transition()
            .duration(3000)
            .attr("x", function(d) { return d.x + squareSize / 2; })
            .attr("y", function(d) { return d.y + squareSize / 2; })
            .on("end", moveElements);
    }

    // Start movement animation after zoom-in
    setTimeout(moveElements, 1200);
});