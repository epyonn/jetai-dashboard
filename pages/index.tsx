/** 
 * File Name: data.ts
 * Purpose: Displays server-rendered jet data in sortable table format. 
 * Created Date: 2024-03-12 
 */ 
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { fetchJets, fetchJetByWingspan, fetchJetsByYear, fetchJetsByEngine } from '@/app/api/data';
import { Jet } from '@/app/types/types';
import { FaArrowDown } from 'react-icons/fa'; // Import the arrow icon
import Dashboard from '@/app/components/Dashboard';
import '@/app/styling/global.css';

type Props = {
  jets: Jet[];
  sortWingspan: Jet[];
  sortYear: Jet[];
  sortEngine: Jet[];
};

// function asynchronously fetches server rendered data
export const getServerSideProps: GetServerSideProps = async () => {
  
  // fetches all jets data in parallel to streamline
  const [jets, sortWingspan, sortYear, sortEngine ] = await Promise.all ([
    fetchJets(),
    fetchJetByWingspan(),
    fetchJetsByYear(),
    fetchJetsByEngine()
  ])
  return {
    props: { jets, sortWingspan, sortYear, sortEngine },
  };
};

const HomePage = ({ jets: initialJets, sortWingspan, sortYear, sortEngine }: Props) => {
  // state variables
  const [jetsData, setJetsData] = useState<Jet[]>(initialJets);
  const [sort, setSort] = useState<string>('');
  const [checkedJets, setCheckedJets] = useState<Jet[]>([]);

  // useEffect to handle sorting logic
  useEffect(() => {
    // assigns jetsData based on sort string value
    const sortJets = async () => {
      let sortedJets;
      switch (sort) {
        case 'wingspan':
          sortedJets = sortWingspan;
          console.log('being clicked');
          console.log(sortWingspan);
          break;
        case 'year':
          sortedJets = sortYear;
          break;
        case 'engine':
          sortedJets = sortEngine;
          break;
        default:
          sortedJets = initialJets;
      }
      setJetsData(sortedJets);
    };

    sortJets();
  }, [sort, initialJets]);

  // handles logic for checkedJets
  const handleCheckboxChange = (jet: Jet) => {
    const isChecked = checkedJets.some((checkedJet) => checkedJet.id === jet.id);

    if (isChecked) {
      setCheckedJets(checkedJets.filter((checkedJet) => checkedJet.id !== jet.id));
    } else {
      setCheckedJets([...checkedJets, jet]);
    }
  };

  // create table columns
  const tableColumns: { header: string; dataKey: keyof Jet, sortAction?: () => void }[] = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Name', dataKey: 'name' },
    { 
      header: 'Wingspan (m)', 
      dataKey: 'wingspan', 
      sortAction: () => setSort('wingspan') // Set sort action for wingspan
    },
    { 
      header: 'Engines', 
      dataKey: 'engines', 
      sortAction: () => setSort('engine') // Set sort action for engine
    },
    { 
      header: 'Year', 
      dataKey: 'year',
      sortAction: () => setSort('year') // Set sort action for year
    },
  ];

  return (
  <div className='flex flex-col items-center h-screen w-screen p-5'>
    <h1 className="text-blue-500 font-bold text-lg p-3">Top 10 Jets</h1>

    <div className="overflow-x-auto ">
      <table className="min-w-full table-auto divide-y divide-gray-200 shadow-lg border border-gray-200" >
        <thead className="bg-gray-100">
          <tr>
            {tableColumns.map(({ header, sortAction }) => (
              <th key={header} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
                {sortAction && (
                    <FaArrowDown 
                    onClick={sortAction} 
                    className="ml-2 text-blue-500" // Uses tailwindcss for color, adjust as needed
                    style={{ display: 'inline', cursor: 'pointer' }}
                  />
                )}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
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

    <div className='flex flex-row items-center gap-4 m-2'>
      <label htmlFor="comparisonCriteria" className="block text-sm font-medium text-gray-700">
        Ask OpenAI to Compare Selected Jets by
      </label>
      <div>
        <select className="border border-gray-300 rounded-md p-2 w-40" name="comparisonCriteria" id="comparisonCriteria">
          <option value="wingspan">Wingspan</option>
          <option value="engine">Engine</option>
          <option value="year">Year</option>
        </select>
      </div>
      <button className="py-2 px-4 bg-blue-500 text-white rounded-md shadow">
        Compare Selected Jets
      </button>
    </div>

    
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

  export default HomePage;
