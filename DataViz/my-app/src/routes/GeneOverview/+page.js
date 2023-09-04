// export const load = ({ fetch }) => {
//     const fetchGenes = async () => { 
//       const res = await fetch('https://vda-lab.github.io/assets/genes.json') 
//       const data = await res.json() 
//       return data
//     }
  
//     return {
//       Gene1 : fetchGenes() 
//     }
// }
  

export const load = async () => {
  try {
    const res = await fetch('https://vda-lab.github.io/assets/genes.json');
    if (res.ok) {
      const geneData = await res.json();
      return {
        props: {
          geneData,
        },
      };
    } else {
      // Handle the case where the response is not OK (e.g., handle errors)
      return {
        status: res.status,
      };
    }
  } catch (error) {
    // Handle any network or other errors that may occur during the fetch
    console.error(error);
    return {
      status: 500, // Internal Server Error
    };
  }
};
