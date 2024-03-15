/** 
 * File Name: JetTable.tsx
 * Purpose: Renders a dynamic table displaying jet data, including functionality for sorting by various columns and selecting jets for comparison. 
 * Created Date: 2024-03-12 
 */
import React from 'react';
import { Jet } from '@/app/types/types';
import { FaArrowDown } from 'react-icons/fa';

interface JetTableProps {
    jetsData: Jet[];
    checkedJets: Jet[];
    tableColumns: { header: string; dataKey: keyof Jet; sortAction?: () => void }[];
    handleCheckboxChange: (jet: Jet) => void;
  }
  
const JetTable: React.FC<JetTableProps> = ({ jetsData, tableColumns, handleCheckboxChange, checkedJets }) => (
    <div className="overflow-x-auto rounded-md">
        <table className="min-w-full table-auto divide-y divide-gray-200 shadow-lg border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
            <tr>
            {tableColumns.map(({ header, sortAction }) => (
                <th key={header} className="px-1 md:px-6 md:y-3 text-left text-xs font-medium text-gray-500 uppercase md:tracking-wider" onClick={sortAction}>
                {header}
                {sortAction && <FaArrowDown className="ml-2 text-blue-500" style={{ display: 'inline', cursor: 'pointer' }} />}
                </th>
            ))}
            <th className="md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            {jetsData.map((jetData) => (
            <tr key={jetData.id}>
                {tableColumns.map(({ dataKey }) => (
                <td key={dataKey} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {jetData[dataKey]}
                </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <input
                    type="checkbox"
                    checked={checkedJets.some((checkedJet) => checkedJet.id === jetData.id)}
                    onChange={() => handleCheckboxChange(jetData)}
                    />
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
);

export default JetTable;
