let graphic = d3.select('#graphic');
let legend = d3.select('#legend');
let pymChild = null;

function drawGraphic() {
	// clear out existing graphics
	graphic.selectAll('*').remove();
	legend.selectAll('*').remove();

	//Accessible summary
	d3.select('#accessibleSummary').html(config.essential.accessibleSummary);

	let threshold_md = config.optional.mediumBreakpoint;
	let threshold_sm = config.optional.mobileBreakpoint;

	//set variables for chart dimensions dependent on width of #graphic
	if (parseInt(graphic.style('width')) < threshold_sm) {
		size = 'sm';
	} else if (parseInt(graphic.style('width')) < threshold_md) {
		size = 'md';
	} else {
		size = 'lg';
	}

	// Define the dimensions and margin, width and height of the chart.
	let margin = config.optional.margin[size];
	let width = parseInt(graphic.style('width')) - margin.left - margin.right;
	let height = 400 - margin.top - margin.bottom;

	// Get categories from the keys used in the stack generator
	const categories = Object.keys(graphic_data[0]).filter((k) => k !== 'date');

	const colorScale = d3
		.scaleOrdinal()
		.domain(categories)
		.range(config.essential.colour_palette);

	// Set up the legend
	const legenditem = d3
		.select('#legend')
		.selectAll('div.legend--item')
		.data(d3.zip(categories, colorScale.range()))
		.enter()
		.append('div')
		.attr('class', 'legend--item');

	legenditem
		.append('div')
		.attr('class', 'legend--icon--circle')
		.style('background-color', function (d) {
			return d[1];
		});

	legenditem
		.append('div')
		.append('p')
		.attr('class', 'legend--text')
		.html(function (d) {
			return d[0];
		});

	// Create an SVG element
	const svg = graphic
		.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
		.attr('class', 'chart')
		.style('background-color', '#fff')
		.append('g')
		.attr('transform', `translate(${margin.left},${margin.top})`);

	// Define the x and y scales
	const x = d3
		.scaleTime()
		.domain(d3.extent(graphic_data, (d) => d.date))
		.range([0, width]);

	// This function generates an array of approximately count + 1 uniformly-spaced, rounded values in the range of the given start and end dates (or numbers).
	let tickValues = x.ticks(config.optional.xAxisTicks[size]);

	// Add the first and last dates to the ticks array, and use a Set to remove any duplicates
	// tickValues = Array.from(new Set([graphic_data[0].date, ...tickValues, graphic_data[graphic_data.length - 1].date]));

	if (config.optional.addFirstDate == true) {
		tickValues.push(graphic_data[0].date)
		console.log("First date added")
	}

	if (config.optional.addFinalDate == true) {
		tickValues.push(graphic_data[graphic_data.length - 1].date)
		console.log("Last date added")
	}

	const y = d3
		.scaleLinear()
		.domain([0, 1]) // Assuming the y-axis represents the percentage from 0 to 1
		.range([height, 0]);

	// Define the stack generator
	const stack = d3
		.stack()
		.keys(categories) // Use the category names as keys
		.order(d3[config.essential.stackOrder]) // Use the stack order defined in the config later
		.offset(d3[config.essential.stackOffset]); // Convert to percentage values

	// Generate the stacked data
	const stackedData = stack(graphic_data);

	// console.log("stackedData:", stackedData);

	// Define the area generator
	const area = d3
		.area()
		.x((d) => x(d.data.date))
		.y0((d) => y(d[0]))
		.y1((d) => y(d[1]));

	// Create the areas
	svg
		.selectAll('path')
		.data(stackedData)
		.enter()
		.append('path')
		.attr('fill', (d) => {
			// Assign colors to each category
			const category = d.key;
			return colorScale(category);
		})
		.attr('d', area);

	// Add the x-axis
	svg
		.append('g')
		.attr('class', 'x axis')
		.attr('transform', `translate(0, ${height})`)
		.call(
			d3
				.axisBottom(x)
				.tickFormat(d3.timeFormat(config.essential.xAxisTickFormat[size]))
				.tickValues(tickValues)
		);

	// Add the y-axis
	svg
		.append('g')
		.attr('class', 'y axis numeric')
		.call(d3.axisLeft(y).tickFormat(d3.format('.0%')));

	// This does the x-axis label
	svg
		.append('g')
		.attr('transform', `translate(0, ${height})`)
		.append('text')
		.attr('x', width)
		.attr('y', 35)
		.attr('class', 'axis--label')
		.text(config.essential.xAxisLabel)
		.attr('text-anchor', 'end');

	// This does the y-axis label
	svg
		.append('g')
		.attr('transform', 'translate(0,0)')
		.append('text')
		.attr('x', -(margin.left - 5))
		.attr('y', -15)
		.attr('class', 'axis--label')
		.text(config.essential.yAxisLabel)
		.attr('text-anchor', 'start');

	//create link to source
	d3.select('#source').text('Source: ' + config.essential.sourceText);

	//use pym to calculate chart dimensions
	if (pymChild) {
		pymChild.sendHeight();
	}
}

load = (config) => Promise.resolve(d3.csvParse(`date,category one,category two has a really long name and takes a lot of space,category three,category four,category five,category six\n1997,0.150000,0.150000,0.150000,0.150000,0.150000,0.250000\n1998,0.150000,0.150000,0.150000,0.150000,0.150000,0.250000\n1999,0.150000,0.150000,0.150000,0.150000,0.150000,0.250000\n2000,0.150000,0.150000,0.150000,0.150000,0.150000,0.250000\n2001,0.150000,0.150000,0.150000,0.150000,0.150000,0.250000\n2002,0.150000,0.150000,0.150000,0.150000,0.150000,0.250000\n2003,0.150000,0.150000,0.150000,0.150000,0.150000,0.250000\n2004,0.150000,0.150000,0.150000,0.150000,0.150000,0.250000\n2005,0.140000,0.140000,0.140000,0.140000,0.140000,0.300000\n2006,0.140000,0.140000,0.140000,0.140000,0.140000,0.300000\n2007,0.140000,0.140000,0.140000,0.140000,0.140000,0.300000\n2008,0.140000,0.140000,0.140000,0.140000,0.140000,0.300000\n2009,0.140000,0.140000,0.140000,0.140000,0.140000,0.300000\n2010,0.130000,0.130000,0.130000,0.130000,0.130000,0.350000\n2011,0.130000,0.130000,0.130000,0.130000,0.130000,0.350000\n2012,0.130000,0.130000,0.130000,0.130000,0.130000,0.350000\n2013,0.130000,0.130000,0.130000,0.130000,0.130000,0.350000\n2014,0.120000,0.120000,0.120000,0.120000,0.120000,0.400000\n2015,0.120000,0.120000,0.120000,0.120000,0.120000,0.400000\n2016,0.120000,0.120000,0.120000,0.120000,0.120000,0.400000\n2017,0.120000,0.120000,0.120000,0.120000,0.120000,0.400000`)).then((rawData) => {
	graphic_data = rawData.map((d) => {
		return {
			date: d3.timeParse(config.essential.dateFormat)(d.date),
			...Object.entries(d)
				.filter(([key]) => key !== 'date')
				.map(([key, value]) => [key, +value])
				.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
		};
	});

	// console.log('Final data structure:',graphic_data);

	// Use pym to create an iframed chart dependent on specified variables
	pymChild = new pym.Child({
		renderCallback: drawGraphic
	});
});
 load({"essential":{"graphic_data_url":"data.csv","colour_palette":["#206095","#27A0CC","#871A5B","#A8BD3A","#F66068","#118C7B"],"sourceText":"Office for National Statistics","accessibleSummary":"Here is the screen reader text describing the chart.","xDomain":"auto","xAxisTickFormat":{"sm":"%y","md":"%Y","lg":"%Y"},"dateFormat":"%Y","xAxisLabel":"x axis label","yAxisLabel":"y axis label","stackOffset":"stackOffsetExpand","stackOrder":"stackOrderNone"},"optional":{"aspectRatio":{"sm":[1,1],"md":[1,1],"lg":[1,1]},"margin":{"sm":{"top":15,"right":20,"bottom":50,"left":50},"md":{"top":15,"right":50,"bottom":50,"left":50},"lg":{"top":30,"right":50,"bottom":50,"left":50}},"xAxisTicks":{"sm":7,"md":5,"lg":8},"addFirstDate":false,"addFinalDate":false,"mobileBreakpoint":510,"mediumBreakpoint":600},"elements":{"select":0,"nav":0,"legend":1,"titles":0}})