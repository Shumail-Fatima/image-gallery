import { useParams, useNavigate } from "react-router-dom";
import rawData from "../data/Images.json";

const ImageViewer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const imagesData = rawData as Array<{
        id: number;
        title: string;
        category: string;
        url: string;
    }>;

    const image = imagesData.find((img) => img.id.toString() === id);
    if (!image) {
        return <div style={{ padding: 40 }}>Image not found.</div>;
    }

    return(
        <div style={{ minHeight: "100vh", background: "#fafbfc" }}>
            <button onClick={() => navigate(-1)} style={{ margin: 20 }}>← Back</button>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src={image.url} alt={image.title} style={{ maxWidth: "90vw", maxHeight: "70vh", borderRadius: 8 }}/>
                <h2>{image.title}</h2>
                <p>category: {image.category}</p>
            </div>
        </div>
    );
};

export default ImageViewer;