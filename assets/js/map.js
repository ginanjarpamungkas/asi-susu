var zoom = d3.zoom().scaleExtent([1,8]).on('zoom', zoomed);
function zoomed() {
    g_country.attr("transform", d3.event.transform);
}

var svg = d3.select("#map-world").append("svg").attr('x', 0).attr('y', 0).attr('viewBox', '0 0 960 500').attr('id', 'word-map').call(zoom).on("wheel.zoom", null);
var g_country = svg.append("g").attr("class", "countries")
var projection = d3.geoMercator().scale(600).translate([-750,350]);
var path = d3.geoPath().projection(projection);
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
    // .on('mouseenter', function(d) {
    //   tooltip.style("display","block")
    //   d3.select(this)
    //     .transition()
    //     .style('fill', ''+d.properties.COLOR+'')
    //   })
    // .on('mousemove', function(d) {
    //   if (d.properties.NAME == 'WPPNRI 717' || d.properties.NAME == 'WPPNRI 715' || d.properties.NAME == 'WPPNRI 718') {
    //     tooltip
    //       .style("left", (d3.event.pageX)-($('.tooltip').width()+30) + "px")
    //       .style("top", (d3.event.pageY - 60) + "px")
    //       .html(`
    //       <div><center><span>${d.properties.NAME}</span></center></div>
    //       <div><span>Wilayah:</span><br><p>${d.properties.WILAYAH}</p></div>
    //       <div><span>Potensi:</span><br><p>${d.properties.POTENSI}</p></div>
    //       <div><span>Tangkapan Diperbolehkan:</span><br><p>${d.properties.TANGKAPAN}</p></div>
    //       <div><span>Tingkat Pemanfaatan:</span><br><p>${d.properties.PEMANFAATAN}</p></div>
    //       <div><span>Status:</span><br><p>${d.properties.STATUS}</p></div>
    //       <div><span>Kuota Penangkapan Benih:</span><br><p>${d.properties.KUOTA} ekor</p></div>
    //       `);
    //   }else{
    //     tooltip
    //       .style("left", (d3.event.pageX + 10) + "px")
    //       .style("top", (d3.event.pageY - 60) + "px")
    //       .html(`
    //       <div><center><span>${d.properties.NAME}</span></center></div>
    //       <div><span>Wilayah:</span><br><p>${d.properties.WILAYAH}</p></div>
    //       <div><span>Potensi:</span><br><p>${d.properties.POTENSI}</p></div>
    //       <div><span>Tangkapan Diperbolehkan:</span><br><p>${d.properties.TANGKAPAN}</p></div>
    //       <div><span>Tingkat Pemanfaatan:</span><br><p>${d.properties.PEMANFAATAN}</p></div>
    //       <div><span>Status:</span><br><p>${d.properties.STATUS}</p></div>
    //       <div><span>Kuota Penangkapan Benih:</span><br><p>${d.properties.KUOTA} ekor</p></div>
    //       `);
    //   }
    // })
    // .on('mouseout', function() {
    //     tooltip.style("display","none")
    //     d3.select(this)
    //     .transition()
    //     .style('fill', '#fff')
    // });
    textCountry = g_country.selectAll("text").data(json.features).enter().append("svg:text").text(function(d){return d.properties.ADMIN;}).attr("x", function(d){return path.centroid(d)[0];}).attr("y", function(d){return  path.centroid(d)[1];}).attr("text-anchor","middle").attr('font-size','5pt').attr('class','textCountry');
  }
)
function readmore(e) {
    $(e).toggleClass('close');
    $('.box-inner, .more-btn').toggleClass('close');
}
