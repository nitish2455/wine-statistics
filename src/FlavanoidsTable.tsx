import React from 'react';
import { Table } from '@mantine/core';

interface Props {
  stats: any;
}

const FlavanoidsTable: React.FC<Props> = ({ stats }) => {
  return (
    <div>
      <h2>Flavanoids Statistics</h2>
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
              <td key={index}>{calculateMean(classData.flavanoids)}</td>
            ))}
          </tr>
          <tr>
            <td>Median</td>
            {Object.values(stats).map((classData: any, index: number) => (
              <td key={index}>{calculateMedian(classData.flavanoids)}</td>
            ))}
          </tr>
          <tr>
            <td>Mode</td>
            {Object.values(stats).map((classData: any, index: number) => (
              <td key={index}>{calculateMode(classData.flavanoids)}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

const calculateMean = (data: number[]): string => {
  if (data.length === 0) return 'No data';
  const sum = data.reduce((acc, val) => acc + val, 0);
  const mean = sum / data.length;
  return mean.toFixed(3);
};

const calculateMedian = (data: number[]): string => {
  if (data.length === 0) return 'No data';
  const sortedData = [...data].sort((a, b) => a - b);
  const middleIndex = Math.floor(sortedData.length / 2);
  if (sortedData.length % 2 === 0) {
    const median = (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
    return median.toFixed(3);
  } else {
    return sortedData[middleIndex].toFixed(3);
  }
};

const calculateMode = (data: number[]): string => {
  if (data.length === 0) return 'No data';
  const frequencyMap: { [key: number]: number } = {};
  data.forEach((value) => {
    frequencyMap[value] = (frequencyMap[value] || 0) + 1;
  });
  let mode: number | undefined;
  let maxFrequency = 0;
  for (const value in frequencyMap) {
    if (frequencyMap[value] > maxFrequency) {
      mode = parseInt(value);
      maxFrequency = frequencyMap[value];
    }
  }
  return mode !== undefined ? mode.toFixed(3) : 'No mode';
};

export default FlavanoidsTable;
