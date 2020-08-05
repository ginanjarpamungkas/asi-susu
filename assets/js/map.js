var zoom = d3.zoom().scaleExtent([1,8]).on('zoom', zoomed);
function zoomed() {
    g_country.attr("transform", d3.event.transform);
}
var color =  ['#ffffff', '#ffe5de', '#ffcabc', '#fcb09c', '#f6957d', '#ee7a5e', '#e45d41', '#d93d23', '#cc0000']
var svg = d3.select("#map-world").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 500').attr('id', 'word-map').call(zoom).on("wheel.zoom", null);
var g_country = svg.append("g").attr("class", "countries")
var projection = d3.geoMercator().scale(600).translate([-750,350]);
var path = d3.geoPath().projection(projection);
var tooltip = d3.select('body').append('div').attr('class', 'hidden tooltip');
d3.select("#zoom_in").on("click", function() {
    zoom.scaleBy(svg.transition().duration(750), 1.2);
});
d3.select("#zoom_out").on("click", function() {
    zoom.scaleBy(svg.transition().duration(750), 0.8);
});

d3.json("eastAsia.json",
  function(json) {
    country = g_country
    .selectAll("path")
    .data(json.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", "#c4c4c4")
    .style("opacity", '1')
    .attr("stroke", "#000000")
    .attr("stroke-width", 0.2)
    .attr("id",function(d){return d.properties.CODE;})
    .on("mouseover", function (d) {
                                d3.select(this).transition().style("stroke-width", 1).attr("stroke", "#f79518")
                                loadTooltip(d),
                                tooltip.style('visibility','visible').style("left", ((d3.event.pageX)+10) + "px").style("top", (d3.event.pageY - 28) + "px")
                            })
                            .on("mouseout", function (d) {
                                d3.select(this).transition().style("stroke-width", 0.5).attr("stroke", "#000")
                                tooltip.style('visibility','hidden');
                            });
    var provinsi = '';
    d3.csv('data.csv',function(csv){
	    provinsi = csv
							$.each(csv, function(id,v) {
								if (v.value > 30) {
									$('#'+v.code).css('fill',color[8])
								} else if (v.value > 20) {
									$('#'+v.code).css('fill',color[7])
								} else if (v.value > 10) {
									$('#'+v.code).css('fill',color[6])
								} else if (v.value < 11) {
									$('#'+v.code).css('fill',color[5])
								} else {
									$('#'+v.code).css('fill',color[0])
								}
							})
						})
    textCountry = g_country.selectAll("text").data(json.features).enter().append("svg:text").text(function(d){return d.properties.ADMIN;}).attr("x", function(d){return path.centroid(d)[0];}).attr("y", function(d){return  path.centroid(d)[1];}).attr("text-anchor","middle").attr('font-size','5pt').attr('class','textCountry');
  }
)
function readmore(e) {
    $(e).toggleClass('close');
    $('.box-inner, .more-btn').toggleClass('close');
}
function loadTooltip(d){
    var html = "";
    $.each(provinsi,function(id,value) {
        if (provinsi[id].code == d.properties.CODE) {
            html += `<div style="max-width:300px">
            <h4 class='kasus' style="padding-bottom:5px">` + provinsi[id].country + `</h4>
            <h4 style="font-weight:300">value :` + provinsi[id].value + `</h4>
            </div>`;
            tooltip.html(html);
        }else{
            html += ``;
            tooltip.html(html);
        }
    });
}
