import React from 'react';

function PublicationSearchInput({ value, onSearchChange }) {
  return (
    <input
        type="text"
        placeholder="Pesquise por publicações..."
        value={value}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
  );
}

export default PublicationSearchInput;
