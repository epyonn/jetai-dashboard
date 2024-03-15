/** 
 * File Name: data.ts
 * Purpose: Custom APIs to fetch data from postgresql db using Prisma ORM tool.
 * Created Date: 2024-03-12 
 */ 
import prisma from '@/prisma/prisma';

// fetch initial jets data using prisma orm tool
export async function fetchJets() {
  const jets = await prisma.jet.findMany();
  return jets;
}

// fetches data sorted by wingspan
export async function fetchJetByWingspan() {
  try {
    const fetchJetByWingspan = await prisma.jet.findMany({
      orderBy: {
        wingspan: 'desc',
      },
    });

    return fetchJetByWingspan;
  } catch (error) {
    console.error('Error fetching jet with largest wingspan:', error);
    throw new Error('Failed to fetch jet with largest wingspan');
  }
}

// fetches data sorted by year
export async function fetchJetsByYear() {
  try {
    const jets = await prisma.jet.findMany({
      orderBy: {
        year: 'desc',
      }
    });

    return jets;
  } catch (error) {
    console.error('Error fetching jets by wingspan:', error);
    throw new Error('Failed to fetch jets by wingspan');
  }
}