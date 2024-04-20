import wineData from './winedata.json';

// Utility function to calculate Gamma for a single data point
const calculateGamma = (data: any) => {
  const { Ash, Hue, Magnesium } = data;
  return (parseFloat(Ash) * parseFloat(Hue)) / parseFloat(Magnesium);
};

// Utility function to calculate Mean


export const calculateStats = () => {
  const stats: any = {
    class1: { flavanoids: [], gamma: [] },
    class2: { flavanoids: [], gamma: [] },
      };

      wineData.forEach((data: any) => {
        const { Alcohol, Flavanoids } = data;
        if (Alcohol && Flavanoids) {
          const gamma = calculateGamma(data);

    
          const className = `class${Alcohol}`;
      // Initialize class if not already
      if (!stats[className]) {
        stats[className] = { flavanoids: [], gamma: [] };
      }
      // Push data to respective class
      stats[className].flavanoids.push(Flavanoids);
      stats[className].gamma.push(gamma);
    }
  });

  return stats;
};
