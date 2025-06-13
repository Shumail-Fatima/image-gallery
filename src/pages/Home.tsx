import { useEffect, useState } from 'react';
import rawData from '../data/Images.json';
import SearchBar from '../components/SearchBar';
import ImageGrid from '../components/ImageGrid';
import SideBar from '../components/SideBar';
import type { ImageItem } from '../types/Image';

const imagesData = rawData as ImageItem[];

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);

  useEffect(() => {
    setFilteredImages(imagesData);
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      setFilteredImages(imagesData);
      return;
    }

    const lowerQuery = query.toLowerCase();

    const matchedSuggestions = imagesData
      .map((img) => img.title)
      .filter((title) => title.toLowerCase().includes(lowerQuery));

    setSuggestions([...new Set(matchedSuggestions)]);

    const matchedImages = imagesData.filter(
      (img) =>
        img.title.toLowerCase().includes(lowerQuery) ||
        img.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredImages(matchedImages);
  }, [query]);

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        Image Gallery
      </header>
      <div className="app-body">
        <SideBar />
        <main className="app-main">
          <div className="search-container">
            <SearchBar query={query} onChange={setQuery} />
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSuggestionClick(s)}
                    className="suggestion-item"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="content-area">
            {filteredImages.length === 0 && query.trim() !== '' ? (
              <div className="no-results">
                No results found.
              </div>
            ) : (
              <ImageGrid images={filteredImages} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;