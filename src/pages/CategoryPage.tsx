import { useParams } from "react-router-dom";
import rawData from "../data/Images.json";
import SideBar from "../components/SideBar";
import ImageGrid from "../components/ImageGrid";
import { useEffect, useMemo, useState } from "react";
import type { ImageItem } from "../types/Image";
import SearchBar from "../components/SearchBar";
import SideMenu from "../components/SideMenu";


const CategoryPage = () => {
    const { category } = useParams<{ category: string }>();
    const imagesData = rawData as ImageItem[];
    const [catQuery,setCatQuery] = useState('');
    const [catSuggestions, setCatSuggestions] = useState<string[]>([]);
    const [catFilteredImages, setCatFilteredImages] = useState<ImageItem[]>([]);
    const [catPage, catSetPage] = useState(1);
    const catPageSize = 6;
    const catTotalPages = Math.ceil(catFilteredImages.length / catPageSize);
    const [catSidebarVisible, setCatSidebarVisible] = useState(false);

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
    
        /*
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
        */
      const handleSuggestionClick = (text: string) => {
        setCatQuery(text);
      };

    useEffect(() => {
        catSetPage(1); // Reset to first page on search/filter change
    }, [catQuery]);

    const paginatedImages = catFilteredImages.slice((catPage - 1) * catPageSize, catPage * catPageSize);
      
    const catToggleSidebar = () => {
        setCatSidebarVisible(!catSidebarVisible);
    }
    
     return (
        <div className="app-container">
            <header className="app-header">
                <SideMenu onClick={catToggleSidebar} />
                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Images` : "Category"}
            </header>
            <div className="app-body">
                <SideBar isVisible={catSidebarVisible} />
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
                            <>
                                <ImageGrid images={paginatedImages} />
                                <div style={{ marginTop: 20 }}>
                                <button disabled={catPage === 1} onClick={() => catSetPage(catPage - 1)}>Previous</button>
                                <span style={{ margin: '0 10px' }}>{catPage} / {catTotalPages}</span>
                                <button disabled={catPage === catTotalPages} onClick={() => catSetPage(catPage + 1)}>Next</button>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};
export default CategoryPage;
