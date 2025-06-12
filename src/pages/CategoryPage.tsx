import { useParams } from "react-router-dom";
import rawData from "../data/Images.json";
import SideBar from "../components/SideBar";
import ImageGrid from "../components/ImageGrid";
import { useEffect, useMemo, useState } from "react";
import type { ImageItem } from "../types/Image";
import SearchBar from "../components/SearchBar";

const CategoryPage = () => {
    const { category } = useParams<{ category: string }>();
    const imagesData = rawData as ImageItem[];
    const [catQuery,setCatQuery] = useState('');
    const [catSuggestions, setCatSuggestions] = useState<string[]>([]);
    const [catFilteredImages, setCatFilteredImages] = useState<ImageItem[]>([]);

    const filteredImages = useMemo(
        () => imagesData.filter(
                (img) => img.category.toLowerCase() === (category || "").toLowerCase()
            ),
            [category,imagesData]
        );

    useEffect(() => {
        if (catQuery.trim() === '') {
          setCatSuggestions([]);
          setCatFilteredImages(filteredImages);
          return;
        }
    
        const lowerQuery = catQuery.toLowerCase();
    
        const matchedSuggestions = imagesData
          .map((img) => img.title)
          .filter((title) => title.toLowerCase().includes(lowerQuery));
    
        setCatSuggestions([...new Set(matchedSuggestions)]);
    
        const matchedImages = imagesData.filter(
          (img) =>
            img.title.toLowerCase().includes(lowerQuery) ||
            img.category.toLowerCase().includes(lowerQuery)
        );
        setCatFilteredImages(matchedImages);
      }, [catQuery]);
    
      const handleSuggestionClick = (text: string) => {
        setCatQuery(text);
      };

        return (
    <div style={{ minHeight: "100vh", background: "#fafbfc" }}>
      <header
        style={{
          width: "100%",
          padding: "24px 0",
          background: "#222",
          color: "#fff",
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          letterSpacing: "2px",
        }}
      >
        {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Images` : "Category"}
      </header>
      <div style={{ display: "flex", minHeight: "calc(100vh - 80px)" }}>
        <SideBar />
        <main style={{ flex: 1, padding: "40px" }}>
           <div style={{ width: '100%', maxWidth: 400, margin: '30px auto 10px auto' }}>
              <SearchBar query={catQuery} onChange={setCatQuery} />
              {catSuggestions.length > 0 && (
              <ul style={{ listStyleType: 'none', margin: '5px 0 0 0', padding: 0, background: '#fff', border: '1px solid #eee', borderRadius: 4 }}>
                {catSuggestions.map((s, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSuggestionClick(s)}
                    style={{
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderBottom: idx !== catSuggestions.length - 1 ? '1px solid #eee' : undefined,
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
           </div>
          <ImageGrid images={catFilteredImages} />
        </main>
      </div>
    </div>
  );
    
};
export default CategoryPage;
