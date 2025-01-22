import React, { useState } from 'react';
import PublicationSearch from './pages/PublicationSearch';
import Navbar from './components/Navbar';
import PublicationSearchInput from './components/PublicationSearchInput';
import SidebarFilters from './components/SidebarFilters';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [resultsCount, setResultsCount] = useState(0);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleResultsChange = (count) => {
    setResultsCount(count);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />
      {/* <h1 className="text-4xl text-center pt-5">Portal de Periódicos</h1> */}
      
      {/* Search Section */}
      <div className='w-full bg-slate-200 border border-1 border-t-gray-400 border-b-gray-400 pt-4 pb-2'>
        <div className='flex flex-col items-center gap-2'>
          <PublicationSearchInput
            value={searchQuery}
            onSearchChange={handleSearch}
          />
          <p className="text-center mt-2">{resultsCount} results</p>
        </div>
      </div>

      <div className='flex'>
        {/* Sidebar */}
        <SidebarFilters className="h-full" />

        {/* Main Content */}
        <div className="container mx-auto">
          <PublicationSearch 
            searchQuery={searchQuery} 
            onResultsChange={handleResultsChange}
          />
        </div>
      </div>
    </div>
  );
}

export default App;