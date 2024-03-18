/** 
 * File Name: ComparisonSelector.tsx
 * Purpose: Provides an interactive form for users to select a comparison criteria (e.g., Top Speed, Fuel Efficiency, Maximum Seats) for jets and submit for comparison.
 * Created Date: 2024-03-14 
 */
import React from 'react';

interface ComparisonSelectionFormProps {
  comparison: string;
  setComparison: (value: string) => void;
  handleFormSubmit: () => void;
}

const ComparisonSelector: React.FC<ComparisonSelectionFormProps> = ({
  comparison,
  setComparison,
  handleFormSubmit,
}) => (
  <div className='flex flex-row items-center gap-4 m-3 flex-nowrap'>
    <label htmlFor="comparisonCriteria" className=" text-sm font-medium text-gray-700 whitespace-nowrap">
      Ask OpenAI to Compare Selected Jets by
    </label>
    <div>
      <select
        className="border border-gray-300 rounded-md p-2 w-30 text-sm md:w-40"
        name="comparisonCriteria"
        id="comparisonCriteria"
        value={comparison}
        onChange={(e) => setComparison(e.target.value)}
      >
        <option value="Top Speed">Top Speed</option>
        <option value="Fuel Efficiency">Fuel Efficiency</option>
        <option value="Maximum Seats">Maximum Seats</option>
      </select>
    </div>
    <button onClick={handleFormSubmit} className=" text-sm w-30  md:py-2 md:px-1 bg-blue-500 text-white rounded-md shadow">
      Compare Selected Jets
    </button>
  </div>
);

export default ComparisonSelector;
