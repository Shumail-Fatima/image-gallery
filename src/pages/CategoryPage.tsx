import { useParams } from "react-router-dom";
import rawData from "../data/Images.json";
import SideBar from "../components/SideBar";
import ImageGrid from "../components/ImageGrid";
import { useMemo } from "react";

const CategoryPage = () => {
    const { category } = useParams<{ category: string }>();
    const imagesData = rawData as Array<{
        id: number;
        title: string;
        category: string;
        url: string;
    }>;

    const filteredImages = useMemo(
        () => imagesData.filter(
                (img) => img.category.toLowerCase() === (category || "").toLowerCase()
            ),
            [category,imagesData]
        );
        
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
          <ImageGrid images={filteredImages} />
        </main>
      </div>
    </div>
  );
    
};
export default CategoryPage;
