import React, { useState, useEffect } from 'react';
import PublicationSearchInput from '../components/PublicationSearchIput';
import PublicationCard from '../components/PublicationCard';

function PublicationSearch() {
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPublications();
  }, []);

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

  // Função de busca que implementa uma lógica de relevância
  const searchPublications = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredPublications(publications);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const getRelevanceScore = (publication) => {
      let score = 0;
      const searchableText = `${publication.name} ${publication.email} ${publication.body}`.toLowerCase();
      
      // Pontuação para correspondências exatas no título
      if (publication.name.toLowerCase().includes(query.toLowerCase())) {
        score += 10;
      }

      // Pontuação para cada termo de busca encontrado
      searchTerms.forEach(term => {
        // Correspondência no título tem peso maior
        if (publication.name.toLowerCase().includes(term)) {
          score += 5;
        }
        // Correspondência no corpo do texto
        if (publication.body.toLowerCase().includes(term)) {
          score += 2;
        }
        // Correspondência no email
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
    <div className="flex flex-col w-full mx-auto place-items-center justify-center px-4 py-8">
        <PublicationSearchInput
        value={searchQuery}
        onSearchChange={searchPublications}
      />
      <p className='mt-3'>{filteredPublications.length} results</p>
 
      {/* Área de ordenação */}
      <div className="flex flex-row gap-2 mt-2 mb-4">
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
      <div className="flex flex-col items-center justify-center">
        {filteredPublications.map((publication) => (
          <PublicationCard
            key={publication.id}
            name={publication.name}
            email={publication.email}
            body={publication.body}
          />
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {filteredPublications.length === 0 && searchQuery && (
        <div className="text-center text-gray-600 py-8">
          No publications found for "{searchQuery}"
        </div>
      )}
    </div>
  );
}

export default PublicationSearch;