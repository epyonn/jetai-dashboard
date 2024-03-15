/** 
 * File Name: index.tsx
 * Purpose: Integrates server-side data fetching for jet information using Prisma ORM, and renders the jet data using the JetTable component. It also includes functionality for comparing jets.
 * Created Date: 2024-03-14 
 */ 
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { fetchJets, fetchJetByWingspan, fetchJetsByYear, fetchJetsByEngine } from '@/pages/api/data';
import { Jet , Props} from '@/app/types/types';
import JetTable from '@/app/components/JetTable';
import ComparisonSelector from '@/app/components/ComparisonSelector';
import ComparisonResults from '@/app/components/ComparisonResults';
import '../global.css';


import { handleSubmit } from '@/app/utils/utils'; // Adjust the import path as necessary

// function asynchronously fetches server side rendered data
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
  // init variables
  const [jetsData, setJetsData] = useState<Jet[]>(initialJets);
  const [sort, setSort] = useState<string>('wingspan');
  const [checkedJets, setCheckedJets] = useState<Jet[]>([]);
  const [comparison, setComparison] = useState<string>("Top Speed");
  const [response, setResponse] = useState<any[]>([]); 

  const handleFormSubmit = async () => {
    await handleSubmit(comparison, checkedJets, setResponse);
  };
  
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
      sortAction: () => setSort('wingspan') 
    },
    { 
      header: 'Engines', 
      dataKey: 'engines', 
      sortAction: () => setSort('engine') 
    },
    { 
      header: 'Year', 
      dataKey: 'year',
      sortAction: () => setSort('year') 
    },
  ];

  return (
  <div className='flex flex-col items-center h-screen w-screen p-5 '>
    <label className="text-blue-500 font-bold text-xl p-3">Top 10 Jets</label>
    <JetTable
      jetsData={jetsData}
      checkedJets={checkedJets}
      tableColumns={tableColumns}
      handleCheckboxChange={handleCheckboxChange}
    />
    <ComparisonSelector
        comparison={comparison}
        setComparison={setComparison}
        handleFormSubmit={handleFormSubmit}
    />
    <ComparisonResults results={response} />
  </div>
    );
  };

  export default HomePage;
