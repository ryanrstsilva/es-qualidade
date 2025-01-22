import React, { useState, useEffect } from 'react';
import PublicationCard from '../components/PublicationCard';

function PublicationSearch({ searchQuery, onResultsChange  }) {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchPublications();
  }, []);

  useEffect(() => {
    searchPublications(searchQuery);
  }, [searchQuery, publications]);

  useEffect(() => {
    onResultsChange(filteredPublications.length);
  }, [filteredPublications, onResultsChange]);

  const fetchPublications = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setPublications(data);
      setFilteredPublications(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const searchPublications = (query) => {
    setCurrentPage(1); // Reset para primeira página ao pesquisar
    
    if (!query?.trim()) {
      setFilteredPublications(publications);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const getRelevanceScore = (publication) => {
      let score = 0;
      
      if (publication.name.toLowerCase().includes(query.toLowerCase())) {
        score += 10;
      }

      searchTerms.forEach(term => {
        if (publication.name.toLowerCase().includes(term)) {
          score += 5;
        }
        if (publication.body.toLowerCase().includes(term)) {
          score += 2;
        }
        if (publication.email.toLowerCase().includes(term)) {
          score += 1;
        }
      });

      return score;
    };

    const filtered = publications
      .map(pub => ({
        ...pub,
        relevance: getRelevanceScore(pub)
      }))
      .filter(pub => pub.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance);

    setFilteredPublications(filtered);
  };

  // Cálculos para paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPublications.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);

  const Pagination = () => {
    return (
      <div className="flex justify-center items-center gap-2 my-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Previous
        </button>
        
        <span className="px-4 py-1 text-sm">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="flex gap-8">
        {/* Main content */}
        <div className="flex-1">
          {/* Área de ordenação */}
          <div className="flex flex-row items-center justify-center gap-2 mb-6">
            <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
              Most relevant
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-100">
              Most recent
            </button>
            <button className="px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-100">
              Most cited
            </button>
          </div>

          {/* Lista de publicações */}
          <div className="flex flex-col items-center">
            {currentItems.map((publication) => (
              <PublicationCard
                key={publication.id}
                name={publication.name}
                email={publication.email}
                body={publication.body}
              />
            ))}
          </div>

          {/* Paginação */}
          {filteredPublications.length > 0 && <Pagination />}

          {/* Mensagem quando não há resultados */}
          {filteredPublications.length === 0 && searchQuery && (
            <div className="text-center text-gray-600 py-8">
              No publications found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicationSearch;