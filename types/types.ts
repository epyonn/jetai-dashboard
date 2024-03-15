/** 
 * File Name: types.ts
 * Purpose: Defines TypeScript types for the application
 * Created Date: 2024-03-14
 */
export type Jet = {
    id: number;
    name: string;
    wingspan: number;
    engines: number;
    year: number;
  };
  
  export type Props = {
    jets: Jet[];
    sortWingspan: Jet[];
    sortYear: Jet[];
    sortEngine: Jet[];
  };
  
  export type ComparisonResult = {
    rank: number | string;
    name: string;
    value: number | string;
  }