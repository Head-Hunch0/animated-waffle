<h1>Anna- School- Student nr</h1>     
                
        <a href="http://localhost:5173/">Home ;</a>
        <a href="http://localhost:5173/InteractionsOverview">Interactions Overview ;</a>
        <a href="http://localhost:5173/GeneOverview"> Gene Overview ;</a>
<h2> Genes Overview</h2>

<!-- <script>

	import { scaleLinear } from 'd3-scale';
	import { load } from './+page.js';
  export let  data;

	const points = [
    {#each data.Gene1 as datapoint}
  ];

	const xTicks = [datapoint.gene_start];
	const yTicks = [0, 5, 10, 15, 20];
	const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width = 500;
	let height = 200;

	function formatMobile(tick) {
		return "'" + tick.toString().slice(-2);
	}

	$: xScale = scaleLinear()
		.domain([0, xTicks.length])
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, Math.max.apply(null, yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;
</script> -->

<!-- <h2>US birthrate by year</h2> -->

<!-- <div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg> -->
		<!-- y axis -->
		<!-- <g class="axis y-axis">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
					<line x2="100%" />
					<text y="-4">{tick} {tick === 20 ? ' per 1,000 population' : ''}</text>
				</g>
			{/each}
		</g> -->

		<!-- x axis -->
		<!-- <g class="axis x-axis">
			{#each points as point, i}
				<g class="tick" transform="translate({xScale(i)},{height})">
					<text x={barWidth / 2} y="-4">{width > 380 ? point.year : formatMobile(point.year)}</text>
				</g>
			{/each}
		</g>

		<g class="bars">
			{#each points as point, i}
				<rect
					x={xScale(i) + 2}
					y={yScale(point.birthrate)}
					width={barWidth - 4}
					height={yScale(0) - yScale(point.birthrate)}
				/>
			{/each}
		</g>
	</svg>
</div> -->

<!-- <h2>US birthrate by year</h2>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
  <svg> -->
    <!-- y axis -->
    <!-- <g class="axis y-axis">
      {#each yTicks as tick (tick)}
        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
          <line x2="100%" />
          <text y="-4">{tick} {tick === 20 ? ' per 1,000 population' : ''}</text>
        </g>
      {/each}
    </g> -->

    <!-- x axis -->
    <!-- <g class="axis x-axis">
      {#each points as point, i (i)}
        <g class="tick" transform="translate({xScale(i)},{height})">
          <text x={barWidth / 2} y="-4">{width > 380 ? point.year : formatMobile(point.year)}</text>
        </g>
      {/each}
    </g> -->

    <!-- <g class="bars">
      {#each points as point, i}
        <rect
          x={xScale(i) + 2}
          y={yScale(point.birthrate)}
          width={barWidth - 4}
          height={yScale(0) - yScale(point.birthrate)}
        />
      {/each}
    </g>
  </svg>
</div> -->


<!-- <style>
	h2 {
		text-align: center;
	}

	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tick {
		font-family: Helvetica, Arial;
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: none;
		opacity: 0.65;
	}
</style> -->



<script>
  // Import necessary modules
  import {load} from './+page.js';
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
	// import data from 'd3-selection/src/selection/data.js';

  // Define your gene data (replace this with your actual data)
  let genes =
	load()
;

  // console.log(genes);
  // Set up D3 visualization on mount
  onMount(() => {
    genes.then((data) =>{
      // console.log(data.props?.geneData);
      const gene= data.props?.geneData
    
    const svg = d3.select('svg');
    const circleRadius = 250;
    const centerX = 300; // Center X-coordinate of the circle
    const centerY = 300; // Center Y-coordinate of the circle

    // Create the circle representing the chromosome
    svg
      .append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', circleRadius)
      .style('fill', 'none')
      .style('stroke', 'black');

            // Calculate the maximum and minimum values for gene_start and gene_stop
      const minGeneStart = d3.min(gene, (d) => d.gene_start);
      const maxGeneStop = d3.max(gene, (d) => d.gene_stop);

      // Define scales for X and Y coordinates
      const xScale = d3
        .scaleLinear()
        .domain([minGeneStart, maxGeneStop])
        .range([0, 2 * Math.PI]); // Angle range for circular visualization

      const yScale = d3
        .scaleLinear()
        .domain([0, 1]) // Assuming a range of [0, 1] for Y values
        .range([0, circleRadius]);


// Bind the data to the selection
const geneLines = svg.selectAll('.gene-line').data(gene).enter();

// Create lines for each gene
const geneLinks = geneLines
  .append('a')
  .attr('xlink:href', (d) => `/gene/${d.gene_id}`) // Set the href to the gene details page URL
  .attr('target', '_blank'); // Open in a new tab

// Create lines for each gene within the anchor tags
geneLinks
  .append('line')
  .attr('x1', (d) => {
    // Calculate X-coordinate based on gene_start
    // Adjust for forward and reverse strands
    return d.gene_strand === 'forward' ? centerX + circleRadius : centerX - circleRadius;
  })
  .attr('y1', centerY)
  .attr('x2', (d) => {
    // Calculate X-coordinate for gene end
    return d.gene_strand === 'forward'
      ? centerX + circleRadius + (d.gene_stop - d.gene_start) // Adjust for gene length
      : centerX - circleRadius - (d.gene_stop - d.gene_start); // Adjust for gene length
  })
  .attr('y2', centerY)
  .attr('stroke', 'black')
  .attr('opacity', 0.5)
  .on('mouseover', handleMouseOver)
  .on('mouseout', handleMouseOut);
    // Add ticks along the chromosome
    const numTicks = 200; // Number of ticks
    const tickRadius = circleRadius + 13; // Distance from the circle
    const tickAngle = (2 * Math.PI) / numTicks;

    for (let i = 0; i < numTicks; i++) {
      const angle = i * tickAngle;
      const tickX1 = centerX + circleRadius * Math.cos(angle);
      const tickY1 = centerY + circleRadius * Math.sin(angle);
      const tickX2 = centerX + tickRadius * Math.cos(angle);
      const tickY2 = centerY + tickRadius * Math.sin(angle);

      svg
        .append('line')
        .attr('x1', tickX1)
        .attr('y1', tickY1)
        .attr('x2', tickX2)
        .attr('y2', tickY2)
        .attr('stroke', 'black')
        .attr('opacity', 0.5);

		
    }

        // Initialize tooltip
    const tooltip = d3.select('main').append('div')
      .attr('class', 'tooltip')
      .style('visibility', 'hidden');

    let hoveredGene = null;

    // Event handler for mouseover on a gene line
    function handleMouseOver(gene) {
  hoveredGene = gene;
  // Increase opacity and change color on hover
  d3.select(this)
    .attr('opacity', 1)
    .attr('stroke', 'red');

  // Display gene information (customize this based on your design)
  // Example: Display gene_id and gene_name in a tooltip
  tooltip.html(`<strong>ID:</strong> ${gene.gene_id}<br><strong>Name:</strong> ${gene.gene_name}`)
    .style('visibility', 'visible');
    }

    // Event handler for mouseout from a gene line
    function handleMouseOut() {
        hoveredGene = null;
  // Restore opacity and color on mouseout
  d3.select(this)
    .attr('opacity', 0.5)
    .attr('stroke', 'black');
  
  // Hide the tooltip
  tooltip.style('visibility', 'hidden');

    }
    
    // Adjust X-coordinate based on gene_strand
function calculateX(gene) {
  const centerX = 300; // Center X-coordinate of the SVG
  const minY = 50; // Minimum Y-coordinate for genes
  const maxY = 300; // Maximum Y-coordinate for genes

  switch (gene.axes) {
    case "regulator":
      return centerX; // Center X for regulator genes
    case "workhorse":
      return gene.gene_strand === 'forward' ? centerX - minY : centerX + minY; // Adjust X for workhorse genes
    case "manager":
      return gene.gene_strand === 'forward' ? centerX + minY : centerX - minY; // Adjust X for manager genes
    default:
      return centerX; // Default to center X
  }
}

// Other functions and event handlers remain the same
})
  });


  
</script>

<main>

  <!-- SVG container for the chromosome visualization -->
  <svg width="600" height="600">
    <!-- Chromosome visualization goes here -->
	
  </svg>
  
</main>

<style>
  /* Add your CSS styling here for the tooltip */
  .tooltip {
    position: absolute;
    padding: 10px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 12px;
  }

  a:hover {
  background-color: lightgray; /* Change background color on hover */
  color: darkblue; /* Change text color on hover */
  text-decoration: underline; /* Add underline on hover */
}
</style>