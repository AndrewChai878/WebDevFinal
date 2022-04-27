<template>
    <div class="container">
        Material Balance
        <svg id="chart">
        </svg>
    </div>
</template>

<script>
import * as d3 from 'd3';
export default{
    name: 'BarChart',
    props: {
        data: Array,
    },
    watch:{
        data(){
            this.drawChart()
        }
    },
    mounted(){
        this.drawChart()
    },
    methods:{
        drawChart: function(){
            d3.selectAll('#chart > *').remove();
            var height = 30;
            var start = 0;

            // The total of the two values
            var total = d3.sum(this.data.map(d=>d.value));
            var chart = d3.select("#chart")
                .attr("width", "100%")
                .attr("height", height);

            var color = d3.scaleOrdinal()
            .domain(['black','white'])
            .range(['#000000','#FFFFFF'])

            var bar = chart.selectAll("g")
                .data(this.data)
                .enter().append("g");
            bar.append("rect")
                .attr("width", d=>((d.value/total)*100) + "%")
                .attr("x", function(d) {
            var current = start
                start += 100*(d.value/total);
                return current + "%";
            })
            .attr("height", height)
            .attr("fill",  d=>color(d.color));
        }
    }
}

</script>

<style scoped>
.container{
  margin-left: auto;
  margin-right:auto;
  padding: 20px;
  border: 3px solid black;
  margin-top: 10px;
  background: antiquewhite;
  font-weight: bold;
}

#chart {
	border:2px solid #000;
	background-color: #fff;
}

</style>