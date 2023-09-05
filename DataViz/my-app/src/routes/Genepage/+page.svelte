<script>
  // Import necessary modules
  import { onMount } from 'svelte';
  import { get } from 'svelte/store'; // You can use stores or props to get the gene data
  import { load } from './+page.js';

  // Define a gene object with sample data (replace with your actual data)
  let gene = {
    ID: 'ECK120000987',
    Blattner_number: 'b0002',
    Start: 337,
    Stop: 2799,
    Strand: 'forward',
    Product: 'fused aspartate kinase/homoserine dehydrogenase 1',
    Confidence: 'High',
    Evidence: ['evidence1', 'evidence2'],
  };

  // Function to generate the RegulonDB link
  function generateRegulonDBLink(id) {
    return `http://regulondb.ccg.unam.mx/gene?organism=ECK12&format=jsp&type=gene&term=${id}`;
  }

  let regulonDBLink = generateRegulonDBLink(gene.ID);

  onMount(() => {
    // Fetch additional data if needed
  });
</script>

<main>
  <!-- Gene name as an h2 header -->
  <h2>{gene.Product}</h2>

  <!-- Unordered list with gene details -->
  <ul>
    <li><strong>ID:</strong> {gene.ID}</li>
    <li><strong>Blattner number:</strong> {gene.Blattner_number}</li>
    <li><strong>Start:</strong> {gene.Start}</li>
    <li><strong>Stop:</strong> {gene.Stop}</li>
    <li><strong>Strand:</strong> {gene.Strand}</li>
    <li><strong>Product:</strong> {gene.Product}</li>
    <li><strong>Confidence:</strong> {gene.Confidence}</li>
    <li>
      <strong>Evidence:</strong>
      <ul>
        {#each gene.Evidence as evidence}
          <li>{evidence}</li>
        {/each}
      </ul>
    </li>
    <li>
      <strong>RegulonDB link:</strong>
      <a href={regulonDBLink} target="_blank" rel="noopener noreferrer">Visit RegulonDB</a>
    </li>
  </ul>
</main>
