import { useEffect, useState } from 'react';
import rawData from '../data/Images.json';
import SearchBar from '../components/SearchBar';
import ImageGrid from '../components/ImageGrid';
import SideBar from '../components/SideBar';
import type { ImageItem } from '../types/Image';
import SideMenu from '../components/SideMenu';


const imagesData = rawData as ImageItem[];

const HomePage = () => {
  const [query, setQuery] = useState<string>(''); // set string type for this
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const totalPages = Math.ceil(filteredImages.length / pageSize);
  const [sidebarVisible, setSidebarVisible] = useState(false);

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

    const matchedImages = imagesData?.filter(
      (img) =>
        img.title.toLowerCase().includes(lowerQuery) ||
        img.category.toLowerCase().includes(lowerQuery)
    );
    setFilteredImages(matchedImages);
  }, [query]);

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
  };

  useEffect(() => {
    setPage(1); // Reset to first page on search/filter change
  }, [query]);

  const paginatedImages = filteredImages.slice((page - 1) * pageSize, page * pageSize);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }


  return (
    <div className="app-container">
      <header className="app-header">
        <SideMenu onClick={toggleSidebar} />
        Image Gallery
      </header>
      <SideBar isVisible={sidebarVisible}/>
      <div className="app-body">
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
              <>
                <ImageGrid images={paginatedImages} />
                <div style={{ marginTop: 20 }}>
                  <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
                  <span style={{ margin: '0 10px' }}>{page} / {totalPages}</span>
                  <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
                </div>
              </>
              )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;

