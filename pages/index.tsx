/** 
 * File Name: data.ts
 * Purpose: Displays server-rendered jet data in sortable table format. 
 * Created Date: 2024-03-12 
 */ 
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { fetchJets, fetchJetByWingspan, fetchJetsByYear } from '@/app/api/data';
import { Jet } from '@/app/types/types';
import Dashboard from '@/app/components/Dashboard';
import '@/app/styling/global.css';

type Props = {
  jets: Jet[];
  largestWingspan: Jet[];
  
};

// function asynchronously fetches server rendered data
export const getServerSideProps: GetServerSideProps = async () => {
  // fetches all jets data in parallel to streamline
  const [jets, largestWingspan ] = await Promise.all ([
    fetchJets(),
    fetchJetByWingspan(),
  ])
  return {
    props: { jets, largestWingspan },
  };
};

const HomePage = ({ jets: initialJets, largestWingspan }: Props) => {
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
          sortedJets = largestWingspan;
          console.log('being clicked');
          console.log(largestWingspan);
          break;
        case 'year':
          sortedJets = await fetchJetsByYear();
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
  const tableColumns: { header: string; dataKey: keyof Jet }[] = [
    { header: 'ID', dataKey: 'id' },
    { header: 'Name', dataKey: 'name' },
    { header: 'Wingspan (m)', dataKey: 'wingspan' },
    { header: 'Engines', dataKey: 'engines' },
    { header: 'Year', dataKey: 'year' },
  ];

  return (
    <div className='flex flex-col items-center h-screen w-screen p-5'>
      <h1>Top 10 Jet Inventory</h1>
      
      <button onClick={() => setSort('wingspan')} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
        Sort by Wingspan
      </button>
      <button onClick={() => setSort('year')} className="mb-4 ml-2 px-4 py-2 bg-green-500 text-white rounded">
        Sort by Year
      </button>

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
      <div>
        <h2>Checked Jets:</h2>
        <ul>
          {checkedJets.map((checkedJet) => (
            <li key={checkedJet.id}>{checkedJet.name}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default HomePage;
