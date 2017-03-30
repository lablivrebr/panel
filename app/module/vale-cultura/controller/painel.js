angular.module("vale-cultura").controller("PainelCtrl", ['$scope', '$state', '$mdDialog', '$http',
    function ($scope, $state, $mdDialog, $http) {

        // Chamada do servicos.
        $http.get('http://10.1.20.55:81/api/trabalhadores/get').then(function(response) {
            $scope.api = response.data;
        });

        angular.element(document).ready(function () {
            // let circle = d3.selectAll("circle");
            // circle.style("fill", "steelblue");
            // circle.attr("r", 30);
            // circle.attr("cx", function() { return Math.random() * 720; });
            // circle.data([32, 57, 112]);
            // circle.attr("r", function(d) { return Math.sqrt(d); });
            // circle.attr("cx", function(d, i) { return i * 100 + 30; });

            teste();
            teste1();
            teste2();
        });

        function teste()
        {

            var margin = {top: 20, right: 40, bottom: 30, left: 20},
                width = 960 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom,
                barWidth = Math.floor(width / 19) - 1;
            var x = d3.scale.linear()
                .range([barWidth / 2, width - barWidth / 2]);

            var y = d3.scale.linear()
                .range([height, 0]);

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("right")
                .tickSize(-width)
                .tickFormat(function (d) {
                    return Math.round(d / 1e6) + "M";
                });

            // An SVG element with a bottom-right origin.
            var svg = d3.select("#grafico").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // A sliding container to hold the bars by birthyear.
            var birthyears = svg.append("g")
                .attr("class", "birthyears");

            // A label for the current year.
            var title = svg.append("text")
                .attr("class", "title")
                .attr("dy", ".71em")
                .text(new Date().getFullYear());

            d3.csv("app/module/vale-cultura/data/population3.csv", function (error, data) {

                // Convert strings to numbers.
                data.forEach(function (d) {
                    d.people = +d.people;
                    d.year = +d.year;
                    d.age = +d.age;
                });

                // Compute the extent of the data set in age and years.
                var age1 = d3.max(data, function (d) {
                        return d.age;
                    }),
                    year0 = d3.min(data, function (d) {
                        return d.year;
                    }),
                    year1 = d3.max(data, function (d) {
                        return d.year;
                    }),
                    year = year1;

                // Update the scale domains.
                x.domain([year1 - age1, year1]);
                y.domain([0, d3.max(data, function (d) {
                    return d.people;
                })]);

                // Produce a map from year and birthyear to [male, female].
                data = d3.nest()
                    .key(function (d) {
                        return d.year;
                    })
                    .key(function (d) {
                        return d.year - d.age;
                    })
                    .rollup(function (v) {
                        return v.map(function (d) {
                            return d.people;
                        });
                    })
                    .map(data);

                // Add an axis to show the population values.
                svg.append("g")
                    .attr("class", "y axis")
                    .attr("transform", "translate(" + width + ",0)")
                    .call(yAxis)
                    .selectAll("g")
                    .filter(function (value) {
                        return !value;
                    })
                    .classed("zero", true);

                // Add labeled rects for each birthyear (so that no enter or exit is required).
                var birthyear = birthyears.selectAll(".birthyear")
                    .data(d3.range(year0 - age1, year1 + 1, 5))
                    .enter().append("g")
                    .attr("class", "birthyear")
                    .attr("transform", function (birthyear) {
                        return "translate(" + x(birthyear) + ",0)";
                    });

                birthyear.selectAll("rect")
                    .data(function (birthyear) {
                        return data[year][birthyear] || [0, 0];
                    })
                    .enter().append("rect")
                    .attr("x", -barWidth / 2)
                    .attr("width", barWidth)
                    .attr("y", y)
                    .attr("height", function (value) {
                        return height - y(value);
                    });

                // Add labels to show birthyear.
                birthyear.append("text")
                    .attr("y", height - 4)
                    .text(function (birthyear) {
                        return birthyear;
                    });

                // Add labels to show age (separate; not animated).
                svg.selectAll(".age")
                    .data(d3.range(0, age1 + 1, 5))
                    .enter().append("text")
                    .attr("class", "age")
                    .attr("x", function (age) {
                        return x(year - age);
                    })
                    .attr("y", height + 4)
                    .attr("dy", ".71em")
                    .text(function (age) {
                        return age;
                    });

                // Allow the arrow keys to change the displayed year.
                window.focus();
                d3.select(window).on("keydown", function () {
                    switch (d3.event.keyCode) {
                        case 37:
                            year = Math.max(year0, year - 10);
                            break;
                        case 39:
                            year = Math.min(year1, year + 10);
                            break;
                    }
                    update();
                });

                function update() {
                    if (!(year in data)) return;
                    title.text(year);

                    birthyears.transition()
                        .duration(750)
                        .attr("transform", "translate(" + (x(year1) - x(year)) + ",0)");

                    birthyear.selectAll("rect")
                        .data(function (birthyear) {
                            return data[year][birthyear] || [0, 0];
                        })
                        .transition()
                        .duration(750)
                        .attr("y", y)
                        .attr("height", function (value) {
                            return height - y(value);
                        });
                }
            });
        }

        function teste1 (){

            var width = 960,
                height = 700,
                radius = Math.min(width, height) / 2;

            var x = d3.scale.linear()
                .range([0, 2 * Math.PI]);

            var y = d3.scale.sqrt()
                .range([0, radius]);

            var color = d3.scale.category20c();

            var svg = d3.select("#grafico2").append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + (height / 2 + 10) + ")");

            var partition = d3.layout.partition()
                .sort(null)
                .value(function(d) { return 1; });

            var arc = d3.svg.arc()
                .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
                .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
                .innerRadius(function(d) { return Math.max(0, y(d.y)); })
                .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

// Keep track of the node that is currently being displayed as the root.
            var node;

            d3.json("app/module/vale-cultura/data/flare.json", function(error, root) {
                console.info(error);
                console.info(root);
                node = root;
                var path = svg.datum(root).selectAll("path")
                    .data(partition.nodes)
                    .enter().append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
                    .on("click", click)
                    .each(stash);

                d3.selectAll("input").on("change", function change() {
                    var value = this.value === "count"
                        ? function() { return 1; }
                        : function(d) { return d.size; };

                    path
                        .data(partition.value(value).nodes)
                        .transition()
                        .duration(1000)
                        .attrTween("d", arcTweenData);
                });

                function click(d) {
                    node = d;
                    path.transition()
                        .duration(1000)
                        .attrTween("d", arcTweenZoom(d));
                }
            });

            d3.select(self.frameElement).style("height", height + "px");

// Setup for switching data: stash the old values for transition.
            function stash(d) {
                d.x0 = d.x;
                d.dx0 = d.dx;
            }

// When switching data: interpolate the arcs in data space.
            function arcTweenData(a, i) {
                var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
                function tween(t) {
                    var b = oi(t);
                    a.x0 = b.x;
                    a.dx0 = b.dx;
                    return arc(b);
                }
                if (i == 0) {
                    // If we are on the first arc, adjust the x domain to match the root node
                    // at the current zoom level. (We only need to do this once.)
                    var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
                    return function(t) {
                        x.domain(xd(t));
                        return tween(t);
                    };
                } else {
                    return tween;
                }
            }

// When zooming: interpolate the scales.
            function arcTweenZoom(d) {
                var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
                    yd = d3.interpolate(y.domain(), [d.y, 1]),
                    yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
                return function(d, i) {
                    return i
                        ? function(t) { return arc(d); }
                        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
                };
            }
        }

        function teste2()
        {
            // Dimensions of sunburst.
            var width = 750;
            var height = 600;
            var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
            var b = {
                w: 75, h: 30, s: 3, t: 10
            };

// Mapping of step names to colors.
            var colors = {
                "ano": "#5687d1",
                "product": "#7b615c",
                "search": "#de783b",
                "account": "#6ab975",
                "other": "#a173d1",
                "end": "#bbbbbb"
            };

// Total size of all segments; we set this later, after loading the data.
            var totalSize = 0;

            var vis = d3.select("#chart").append("svg:svg")
                .attr("width", width)
                .attr("height", height)
                .append("svg:g")
                .attr("id", "container")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            var partition = d3.layout.partition()
                .size([2 * Math.PI, radius * radius])
                .value(function(d) { return d.size; });

            var arc = d3.svg.arc()
                .startAngle(function(d) { return d.x; })
                .endAngle(function(d) { return d.x + d.dx; })
                .innerRadius(function(d) { return Math.sqrt(d.y); })
                .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

// Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.
            d3.text("app/module/vale-cultura/data/visit-sequences.csv", function(text) {
                var csv = d3.csv.parseRows(text);
                var json = buildHierarchy(csv);
                createVisualization(json);
            });

// Main function to draw and set up the visualization, once we have the data.
            function createVisualization(json) {

                // Basic setup of page elements.
                initializeBreadcrumbTrail();
                drawLegend();
                d3.select("#togglelegend").on("click", toggleLegend);

                // Bounding circle underneath the sunburst, to make it easier to detect
                // when the mouse leaves the parent g.
                vis.append("svg:circle")
                    .attr("r", radius)
                    .style("opacity", 0);

                // For efficiency, filter nodes to keep only those large enough to see.
                var nodes = partition.nodes(json)
                    .filter(function(d) {
                        return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
                    });

                var path = vis.data([json]).selectAll("path")
                    .data(nodes)
                    .enter().append("svg:path")
                    .attr("display", function(d) { return d.depth ? null : "none"; })
                    .attr("d", arc)
                    .attr("fill-rule", "evenodd")
                    .style("fill", function(d) { return colors[d.name]; })
                    .style("opacity", 1)
                    .on("mouseover", mouseover);

                // Add the mouseleave handler to the bounding circle.
                d3.select("#container").on("mouseleave", mouseleave);

                // Get total size of the tree = value of root node from partition.
                totalSize = path.node().__data__.value;
            };

// Fade all but the current sequence, and show it in the breadcrumb trail.
            function mouseover(d) {

                var percentage = (100 * d.value / totalSize).toPrecision(3);
                var percentageString = percentage + "%";
                if (percentage < 0.1) {
                    percentageString = "< 0.1%";
                }

                d3.select("#percentage")
                    .text(percentageString);

                d3.select("#explanation")
                    .style("visibility", "");

                var sequenceArray = getAncestors(d);
                updateBreadcrumbs(sequenceArray, percentageString);

                // Fade all the segments.
                d3.selectAll("path")
                    .style("opacity", 0.3);

                // Then highlight only those that are an ancestor of the current segment.
                vis.selectAll("path")
                    .filter(function(node) {
                        return (sequenceArray.indexOf(node) >= 0);
                    })
                    .style("opacity", 1);
            }

// Restore everything to full opacity when moving off the visualization.
            function mouseleave(d) {

                // Hide the breadcrumb trail
                d3.select("#trail")
                    .style("visibility", "hidden");

                // Deactivate all segments during transition.
                d3.selectAll("path").on("mouseover", null);

                // Transition each segment to full opacity and then reactivate it.
                d3.selectAll("path")
                    .transition()
                    .duration(1000)
                    .style("opacity", 1)
                    .each("end", function() {
                        d3.select(this).on("mouseover", mouseover);
                    });

                d3.select("#explanation")
                    .style("visibility", "hidden");
            }

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
            function getAncestors(node) {
                var path = [];
                var current = node;
                while (current.parent) {
                    path.unshift(current);
                    current = current.parent;
                }
                return path;
            }

            function initializeBreadcrumbTrail() {
                // Add the svg area.
                var trail = d3.select("#sequence").append("svg:svg")
                    .attr("width", width)
                    .attr("height", 50)
                    .attr("id", "trail");
                // Add the label at the end, for the percentage.
                trail.append("svg:text")
                    .attr("id", "endlabel")
                    .style("fill", "#000");
            }

// Generate a string that describes the points of a breadcrumb polygon.
            function breadcrumbPoints(d, i) {
                var points = [];
                points.push("0,0");
                points.push(b.w + ",0");
                points.push(b.w + b.t + "," + (b.h / 2));
                points.push(b.w + "," + b.h);
                points.push("0," + b.h);
                if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
                    points.push(b.t + "," + (b.h / 2));
                }
                return points.join(" ");
            }

// Update the breadcrumb trail to show the current sequence and percentage.
            function updateBreadcrumbs(nodeArray, percentageString) {

                // Data join; key function combines name and depth (= position in sequence).
                var g = d3.select("#trail")
                    .selectAll("g")
                    .data(nodeArray, function(d) { return d.name + d.depth; });

                // Add breadcrumb and label for entering nodes.
                var entering = g.enter().append("svg:g");

                entering.append("svg:polygon")
                    .attr("points", breadcrumbPoints)
                    .style("fill", function(d) { return colors[d.name]; });

                entering.append("svg:text")
                    .attr("x", (b.w + b.t) / 2)
                    .attr("y", b.h / 2)
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.name; });

                // Set position for entering and updating nodes.
                g.attr("transform", function(d, i) {
                    return "translate(" + i * (b.w + b.s) + ", 0)";
                });

                // Remove exiting nodes.
                g.exit().remove();

                // Now move and update the percentage at the end.
                d3.select("#trail").select("#endlabel")
                    .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
                    .attr("y", b.h / 2)
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "middle")
                    .text(percentageString);

                // Make the breadcrumb trail visible, if it's hidden.
                d3.select("#trail")
                    .style("visibility", "");

            }

            function drawLegend() {

                // Dimensions of legend item: width, height, spacing, radius of rounded rect.
                var li = {
                    w: 75, h: 30, s: 3, r: 3
                };

                var legend = d3.select("#legend").append("svg:svg")
                    .attr("width", li.w)
                    .attr("height", d3.keys(colors).length * (li.h + li.s));

                var g = legend.selectAll("g")
                    .data(d3.entries(colors))
                    .enter().append("svg:g")
                    .attr("transform", function(d, i) {
                        return "translate(0," + i * (li.h + li.s) + ")";
                    });

                g.append("svg:rect")
                    .attr("rx", li.r)
                    .attr("ry", li.r)
                    .attr("width", li.w)
                    .attr("height", li.h)
                    .style("fill", function(d) { return d.value; });

                g.append("svg:text")
                    .attr("x", li.w / 2)
                    .attr("y", li.h / 2)
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "middle")
                    .text(function(d) { return d.key; });
            }

            function toggleLegend() {
                var legend = d3.select("#legend");
                if (legend.style("visibility") == "hidden") {
                    legend.style("visibility", "");
                } else {
                    legend.style("visibility", "hidden");
                }
            }

// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how
// often that sequence occurred.
            function buildHierarchy(csv) {
                var root = {"name": "root", "children": []};
                for (var i = 0; i < csv.length; i++) {
                    var sequence = csv[i][0];
                    var size = +csv[i][1];
                    if (isNaN(size)) { // e.g. if this is a header row
                        continue;
                    }
                    var parts = sequence.split("-");
                    var currentNode = root;
                    for (var j = 0; j < parts.length; j++) {
                        var children = currentNode["children"];
                        var nodeName = parts[j];
                        var childNode;
                        if (j + 1 < parts.length) {
                            // Not yet at the end of the sequence; move down the tree.
                            var foundChild = false;
                            for (var k = 0; k < children.length; k++) {
                                if (children[k]["name"] == nodeName) {
                                    childNode = children[k];
                                    foundChild = true;
                                    break;
                                }
                            }
                            // If we don't already have a child node for this branch, create it.
                            if (!foundChild) {
                                childNode = {"name": nodeName, "children": []};
                                children.push(childNode);
                            }
                            currentNode = childNode;
                        } else {
                            // Reached the end of the sequence; create a leaf node.
                            childNode = {"name": nodeName, "size": size};
                            children.push(childNode);
                        }
                    }
                }
                return root;
            };
        }
    }
]);
