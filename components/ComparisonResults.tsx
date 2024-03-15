/*File Name: ComparisonResults.tsx
* Purpose: Renders a table displaying the comparison results of jets, including their rank, name, and value, based on a selected comparison criteria.
* Created Date: 2024-03-14 
*/

import React from 'react';
import { ComparisonResult } from '@/types/types'; 

interface ComparisonResultsProps {
  results: ComparisonResult[]; 
}

const ComparisonResults: React.FC<ComparisonResultsProps> = ({ results }) => (
  <div className="flex flex-col w-full md:w-1/2 lg:w-1/4 mx-auto">
    <label className="block text-sm font-medium text-gray-700">Comparison Results:</label>
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-full table-auto divide-y divide-gray-200 shadow-lg border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {results.map((result, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.rank}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ComparisonResults;
