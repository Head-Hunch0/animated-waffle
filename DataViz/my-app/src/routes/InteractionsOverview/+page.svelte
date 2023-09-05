<!-- <h1>Anna- School- Student nr</h1>     
                
        <a href="http://localhost:5173">Home ;</a>
        <a href="http://localhost:5173/InteractionsOverview">Interactions Overview ;</a>
        <a href="http://localhost:5173/GeneOverview"> Gene Overview ;</a>
        <h2> Interactions Overview</h2>

        <script>
            import {load} from './+page.js';
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  
          // Calculate X and Y coordinates based on gene type
function calculateX(gene) {
  const centerX = 300; // Center X-coordinate of the SVG
  const minY = 50; // Minimum Y-coordinate for genes
  const maxY = 300; // Maximum Y-coordinate for genes

  switch (gene.axes) {
    case "regulator":
      return centerX; // Center X for regulator genes
    case "workhorse":
      return centerX - minY; // Adjust X for workhorse genes
    case "manager":
      return centerX + minY; // Adjust X for manager genes
    default:
      return centerX; // Default to center X
  }
}

function calculateY(gene) {
  // Calculate Y-coordinate based on gene type (stacking upwards)
  const minY = 50; // Minimum Y-coordinate for genes
  const maxY = 300; // Maximum Y-coordinate for genes

  switch (gene.axes) {
    case "regulator":
      return minY; // Top for regulator genes
    case "workhorse":
      return maxY; // Bottom for workhorse genes
    case "manager":
      return maxY; // Bottom for manager genes
    default:
      return 0; // Default to 0
  }
}

// Define colors based on gene type
function geneColor(gene) {
  switch (gene.axes) {
    case "regulator":
      return "red"; // Red for regulator genes
    case "workhorse":
      return "green"; // Green for workhorse genes
    case "manager":
      return "yellow"; // Yellow for manager genes
    default:
      return "gray"; // Default to gray
  }
}

// Handle mouseover event for interactions
function handleMouseOver(interaction) {
  // Change line color, stroke-width, and opacity on mouseover
  interaction.lineColor = "red"; // Red line color on mouseover
  interaction.strokeWidth = 5; // Increased stroke width on mouseover
  interaction.opacity = 0.8; // Increased opacity on mouseover
}

// Redirect to interaction details page on click
function redirectToInteractionDetails(interaction) {
  // Define your logic to navigate to the interaction details page
  // Example: You can use Svelte's router to navigate to the details page
  // router.push(`/interaction-details/${interaction.id}`);
}

        </script>
        <main>
          <svg width="600" height="600">
             Visual elements will go here -->
          <!-- </svg> -->
          
          <!-- {#each genes as gene}
            <circle
              cx={calculateX(gene)}  
              cy={calculateY(gene)} 
              r="2" 
              fill={geneColor(gene)} 
            />
          {/each}
          
          {#each interactions as interaction}
            <line
              x1={calculateX(interaction.from_gene)} 
              y1={calculateY(interaction.from_gene)} 
              x2={calculateX(interaction.to_gene)} 
              y2={calculateY(interaction.to_gene)} 
              stroke="rgba(0, 0, 0, 0.3)" 
              stroke-width="1" 
              on:mouseover={() => handleMouseOver(interaction)} 
              on:click={() => redirectToInteractionDetails(interaction)} 
            />
          {/each} -->
        <!-- </main> -->



<h1>Anna - School - Student nr</h1>     
                
<a href="http://localhost:5173">Home ;</a>
<a href="http://localhost:5173/InteractionsOverview">Interactions Overview ;</a>
<a href="http://localhost:5173/GeneOverview">Gene Overview ;</a>
<h2>Interactions Overview</h2>

<script>
  import { load } from './+page.js';
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  // Data loading (uncomment and complete this part)
  let genes = [];
  let interactions = [];

  // Example: Fetch genes and interactions data using load()
  load().then((data) => {
    genes = data.props?.geneData; // Replace with actual gene data
    interactions = data.props?.interactionData; // Replace with actual interaction data
  });


  
  // Calculate X and Y coordinates based on gene type
  function calculateX(gene) {
    const centerX = 300; // Center X-coordinate of the SVG
    const minY = 50; // Minimum Y-coordinate for genes
    const maxY = 300; // Maximum Y-coordinate for genes

    switch (gene.axes) {
      case "regulator":
        return centerX; // Center X for regulator genes
      case "workhorse":
        return centerX - minY; // Adjust X for workhorse genes
      case "manager":
        return centerX + minY; // Adjust X for manager genes
      default:
        return centerX; // Default to center X
    }
  }

  function calculateY(gene) {
    // Calculate Y-coordinate based on gene type (stacking upwards)
    const minY = 50; // Minimum Y-coordinate for genes
    const maxY = 300; // Maximum Y-coordinate for genes

    switch (gene.axes) {
      case "regulator":
        return minY; // Top for regulator genes
      case "workhorse":
        return maxY; // Bottom for workhorse genes
      case "manager":
        return maxY; // Bottom for manager genes
      default:
        return 0; // Default to 0
    }
  }

  // Define colors based on gene type
  function geneColor(gene) {
    switch (gene.axes) {
      case "regulator":
        return "red"; // Red for regulator genes
      case "workhorse":
        return "green"; // Green for workhorse genes
      case "manager":
        return "yellow"; // Yellow for manager genes
      default:
        return "gray"; // Default to gray
    }
  }

  // Handle mouseover event for interactions
  function handleMouseOver(interaction) {
    // Change line color, stroke-width, and opacity on mouseover
    interaction.lineColor = "red"; // Red line color on mouseover
    interaction.strokeWidth = 5; // Increased stroke width on mouseover
    interaction.opacity = 0.8; // Increased opacity on mouseover
  }

  // Redirect to interaction details page on click
  function redirectToInteractionDetails(interaction) {
    // Define your logic to navigate to the interaction details page
    // Example: You can use Svelte's router to navigate to the details page
    // router.push(`/interaction-details/${interaction.id}`);
  }
</script>

<main>
  <svg width="600" height="600">
    <!-- Render gene circles and interaction lines here -->
    {#each genes as gene}
      <circle
        cx={calculateX(gene)}
        cy={calculateY(gene)}
        r="5" 
        fill={geneColor(gene)}
      />
    {/each}
    {#each interactions as interaction}
      <!-- Calculate control point coordinates -->
      <line
        x1={calculateX(interaction.from_gene)}
        y1={calculateY(interaction.from_gene)}
        x2={calculateX(interaction.to_gene)}
        y2={calculateY(interaction.to_gene)}
        stroke={interaction.lineColor || "rgba(0, 0, 0, 1)"}
        stroke-width={interaction.strokeWidth || 1}
        on:mouseover={() => handleMouseOver(interaction)}
        on:click={() => redirectToInteractionDetails(interaction)}
        role="button"
        tabindex="0"  
        on:keydown={(e) => {
          if (e.key === "Enter" || e.key === "Space") {
            // Handle keyboard events (e.g., Enter key or Space key)
            redirectToInteractionDetails(interaction);
          }
        }}
      />
    {/each}
  </svg>
</main>
