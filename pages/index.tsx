/** 
 * File Name: index.tsx
 * Purpose: Integrates server-side data fetching for jet information using Prisma ORM, and renders the jet data using the JetTable component. It also includes functionality for comparing jets.
 * Created Date: 2024-03-14 
 */ 
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import { fetchJets, fetchJetByWingspan, fetchJetsByYear, fetchJetsByEngine } from '@/pages/api/data';
import { Jet , Props} from '@/types/types';
import JetTable from '@/components/JetTable';
import ComparisonSelector from '@/components/ComparisonSelector';
import ComparisonResults from '@/components/ComparisonResults';
import ChartComponent from '@/components/ChartComponent';
import BarChart from '@/components/BarChart';
import { handleSubmit } from '@/utils/utils'; // Adjust the import path as necessary

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
    <div className='flex flex-row items-center justify-center min-h-screen'>
      <div className='flex flex-col items-center justify-center w-full p-4 md:p-10 lg:h-3/4 lg:w-3/4 border border-gray-200 shadow-lg rounded-lg overflow-auto'>
        <div className='flex flex-col md:flex-row gap-4 w-full'>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <ChartComponent jetsData={jetsData} sort={sort}/>
            </div>
            <div className="overflow-auto">
              <label className="text-blue-500 font-bold text-xl p-3 items-center">Top 10 Jets</label>
              <div className="overflow-auto h-80">
                <JetTable
                  jetsData={jetsData}
                  checkedJets={checkedJets}
                  tableColumns={tableColumns}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <ComparisonSelector
                comparison={comparison}
                setComparison={setComparison}
                handleFormSubmit={handleFormSubmit}
              />
            </div>
            <div>
              <ComparisonResults results={response} />
            </div>
            <div>
              <BarChart responseData={response} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

  export default HomePage;
