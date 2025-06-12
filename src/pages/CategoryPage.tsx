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
    const [catQuery, setCatQuery] = useState('');
    const [catSuggestions, setCatSuggestions] = useState<string[]>([]);
    const [catFilteredImages, setCatFilteredImages] = useState<ImageItem[]>([]);

    const filteredImages = useMemo(
        () => imagesData.filter(
                (img) => img.category.toLowerCase() === (category || "").toLowerCase()
            ),
            [category, imagesData]
        );

    useEffect(() => {
        if (catQuery.trim() === '') {
          setCatSuggestions([]);
          setCatFilteredImages(filteredImages);
          return;
        }
    
        const lowerQuery = catQuery.toLowerCase();
        
        const categoryImages = filteredImages.filter(
          (img) => img.category.toLowerCase() === (category || "").toLowerCase()
        );  

        const matchedSuggestions = categoryImages
          .map((img) => img.title)
          .filter((title) => title.toLowerCase().includes(lowerQuery)); 

        setCatSuggestions([...new Set(matchedSuggestions)]);

        const matchedImages = categoryImages.filter(
          (img) =>
            img.title.toLowerCase().includes(lowerQuery) ||
            img.category.toLowerCase().includes(lowerQuery)
        );

         setCatFilteredImages(matchedImages);
    }, [catQuery, filteredImages, category]);
      
    const handleSuggestionClick = (text: string) => {
        setCatQuery(text);
    };
    
    return (
        <div className="app-container">
            <header className="app-header">
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Images` : "Category"}
            </header>
            <div className="app-body">
                <SideBar />
                <main className="app-main">
                    <div className="search-container">
                        <SearchBar query={catQuery} onChange={setCatQuery} />
                        {catSuggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {catSuggestions.map((s, idx) => (
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
                        {catFilteredImages.length === 0 && catQuery.trim() !== '' ? (
                            <div className="no-results">
                                No results found in this category.
                            </div>
                        ) : (
                            <ImageGrid images={catFilteredImages} />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CategoryPage;