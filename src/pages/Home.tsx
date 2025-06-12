import { useEffect, useState } from 'react';
import rawData from '../data/Images.json';
import SearchBar from '../components/SearchBar';
import ImageGrid from '../components/ImageGrid';
import SideBar from '../components/SideBar';
//import type { ImageItem } from '../types/Image';

type ImageItem = {
  id: number;
  title: string;
  category: string;
  url: string;
};

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
    <div style={{ minHeight: '100vh', background: '#fafbfc' }}>
      <header style={{ width: '100%', padding: '24px 0', background: '#222', color: '#fff', textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', letterSpacing: '2px' }}>
        Image Gallery
      </header>
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        <SideBar />
        <main style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: 400, margin: '30px auto 10px auto' }}>
            <SearchBar query={query} onChange={setQuery} />
            {suggestions.length > 0 && (
              <ul style={{ listStyleType: 'none', margin: '5px 0 0 0', padding: 0, background: '#fff', border: '1px solid #eee', borderRadius: 4 }}>
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSuggestionClick(s)}
                    style={{
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderBottom: idx !== suggestions.length - 1 ? '1px solid #eee' : undefined,
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div style={{ width: '100%' }}>
            <ImageGrid images={filteredImages} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;