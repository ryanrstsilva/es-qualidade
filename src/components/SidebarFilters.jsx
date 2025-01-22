import React from 'react';

function SidebarFilters() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 pt-5">
      {/* Year Filter */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          YEAR
        </h3>
        <div className="space-y-2">
          {[2024, 2023, 2022, 2021, 2020].map((year) => (
            <div key={year} className="flex items-center">
              <input
                type="checkbox"
                id={`year-${year}`}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor={`year-${year}`} className="ml-2 text-sm text-gray-700">
                {year} {year === 2024 && '(2,026)'}
                {year === 2023 && '(11,503)'}
                {year === 2022 && '(10,811)'}
                {year === 2021 && '(13,989)'}
                {year === 2020 && '(11,698)'}
              </label>
            </div>
          ))}
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
          See more
        </button>
      </div>

      {/* Document Type Filter */}
      <div className="px-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          DOCUMENT TYPE
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="journal"
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="journal" className="ml-2 text-sm text-gray-700">
              Journal (138,252)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="conference"
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="conference" className="ml-2 text-sm text-gray-700">
              Conference Proceedings (58,982)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="generic"
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="generic" className="ml-2 text-sm text-gray-700">
              Generic (16,387)
            </label>
          </div>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
          See more
        </button>
      </div>

      {/* Journal Filter */}
      <div className="px-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          JOURNAL
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="lecture-notes"
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="lecture-notes" className="ml-2 text-sm text-gray-700">
              Lecture Notes in Computer Science (7,043)
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="acm-bulletin"
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="acm-bulletin" className="ml-2 text-sm text-gray-700">
              ACM SIGCSE Bulletin (1,873)
            </label>
          </div>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">
          See more
        </button>
      </div>
    </div>
  );
}

export default SidebarFilters;