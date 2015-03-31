function createSoccerViz() {
	d3.csv("../Code/worldcup.csv", function(data) {
		overallTeamViz(data);
	})
	function overallTeamViz(incomingData) {
		d3.select("svg")
		.append("g")
		.attr("id", "teamsG")
		.attr("transform", "translate(50,300)")
		.selectAll("g")
		.data(incomingData)
		.enter()
		.append("g")
		.attr("class", "overallG")
		.attr("transform",
			function (d,i) {return "translate(" + (i * 50) + ", 0)"}
			);
		var teamG = d3.selectAll("g.overallG");
		teamG
		.append("circle").attr("r", 0)
		.transition()
		.delay(function(d, i) {return i * 100})
		.attr("r", 40)
		.transition()
		.duration(500)
		.attr("r", 20)
		.style("fill", "pink")
		.style("stroke", "black")
		.style("stroke-width", "1px");
		teamG
		.append("text")
		.style("text-anchor", "middle")
		.attr("y", 30)
		.style("font-size", "10px")
		.text(function(d) {return d.team;});
	
		var dataKeys = d3.keys(incomingData[0]).filter(function(el) {
			return el != 'team' && el != "region"
		})

		d3.select('#controls').selectAll('button.teams')
			.data(dataKeys)
			.enter()
			.append("button")
			.on("click", buttonClick)
			.html(function(d) {return d;})

		function buttonClick(datapoint) {
			var maxValue  = d3.max(incomingData, function(el) {return parseFloat(el[datapoint])})
			var radiusScale = d3.scale.linear().domain([0, maxValue]).range([2, 20])
			d3.selectAll("g.overallG").select("circle").transition().duration(1000)
				.attr("r", function(d) {return radiusScale(d[datapoint])})
			};
		

		teamG.on("mouseover", highlightRegion);
		function highlightRegion(d) {
			console.log("hover")
			d3.selectAll("g.overallG")
				.select("circle").style("fill", "pink")
				.style("fill", function(el) {return el['region'] == d['region'] ? "red" : "gray"})
		};

		function highlightRegion2(d) {
			d3.sele
		}

		teamG.on("mouseout", function() {
			d3.selectAll("g.overallG").select("circle").style("fill","pink")
		})

		d3.select("circle").each(function(d, i) {
			console.log(d); console.log(i), console.log(this);
		});

		};
	}
