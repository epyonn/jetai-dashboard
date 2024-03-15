import React, { useState } from 'react';
import { Jet } from '../types/types';
import '../ui/global.css';

type Props = {
  jets: Jet[];

};

const tableColumns: { header: string; dataKey: keyof Jet }[] = [
  { header: 'ID', dataKey: 'id' },
  { header: 'Name', dataKey: 'name' },
  { header: 'Wingspan (m)', dataKey: 'wingspan' },
  { header: 'Engines', dataKey: 'engines' },
  { header: 'Year', dataKey: 'year' },
];

const JetsTable: React.FC<Props> = ({ jets }) => {
  const [checkedJets, setCheckedJets] = useState<Jet[]>([]);

  const handleCheckboxChange = (jet: Jet) => {
    const isChecked = checkedJets.some((checkedJet) => checkedJet.id === jet.id);

    if (isChecked) {
      setCheckedJets(checkedJets.filter((checkedJet) => checkedJet.id !== jet.id));
    } else {
      setCheckedJets([...checkedJets, jet]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto divide-y divide-gray-200 shadow-md">
        <thead className="bg-gray-50">
          <tr>
            {tableColumns.map(({ header }) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {jets.map((jet) => (
            <tr key={jet.id}>
              {tableColumns.map(({ dataKey }) => (
                <td key={dataKey} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {jet[dataKey]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={checkedJets.some((checkedJet) => checkedJet.id === jet.id)}
                  onChange={() => handleCheckboxChange(jet)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Checked Jets:</h2>
        <ul>
          {checkedJets.map((checkedJet) => (
            <li key={checkedJet.id}>{checkedJet.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JetsTable;
