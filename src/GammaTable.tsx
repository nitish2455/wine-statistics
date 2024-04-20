import React from 'react';
import { Table } from '@mantine/core';

interface Props {
  stats: any; 
}

const GammaStatistics: React.FC<Props> = ({ stats }) => {
  return (
    <div>
      <h2>Gamma Statistics</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(stats).map((className: string) => (
              <th key={className}> {className}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mean</td>
            {Object.values(stats).map((classData: any, index: number) => (
              <td key={index}>{calculateMean(classData.gamma)}</td>
            ))}
          </tr>
          <tr>
            <td>Median</td>
            {Object.values(stats).map((classData: any, index: number) => (
              <td key={index}>{calculateMedian(classData.gamma)}</td>
            ))}
          </tr>
          <tr>
            <td>Mode</td>
            {Object.values(stats).map((classData: any, index: number) => (
              <td key={index}>{calculateMode(classData.gamma)}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

const calculateMean = (data: string[]): string => {
  const filteredData = data.filter((value: string) => value !== 'Invalid');
  if (filteredData.length === 0) return 'No data';
  const sum = filteredData.reduce((acc: number, val: string) => acc + parseFloat(val), 0);
  const mean = sum / filteredData.length;
  return mean.toFixed(3);
};

const calculateMedian = (data: string[]): string => {
  const filteredData = data.filter((value: string) => value !== 'Invalid');
  if (filteredData.length === 0) return 'No data';
  const sortedData = filteredData.map((value) => parseFloat(value)).sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    const median = (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
    return median.toFixed(3);
  } else {
    return sortedData[middleIndex].toFixed(3);
  }
};

const calculateMode = (data: string[]): string => {
  const filteredData = data.filter((value: string) => value !== 'Invalid');
  if (filteredData.length === 0) return 'No data';
  const frequencyMap: { [key: number]: number } = {};
  filteredData.forEach((value) => {
    const parsedValue = parseFloat(value);
    frequencyMap[parsedValue] = (frequencyMap[parsedValue] || 0) + 1;
  });
  let mode: number | undefined;
  let maxFrequency = 0;
  for (const value in frequencyMap) {
    if (frequencyMap[value] > maxFrequency) {
      mode = parseFloat(value);
      maxFrequency = frequencyMap[value];
    }
  }
  return mode !== undefined ? mode.toFixed(3) : 'No mode';
};

export default GammaStatistics;
