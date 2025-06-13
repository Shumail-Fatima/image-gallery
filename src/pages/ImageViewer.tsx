import { useParams, useNavigate } from "react-router-dom";
import rawData from "../data/Images.json";
import type { ImageItem } from "../types/Image";

const ImageViewer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const imagesData = rawData as ImageItem[];

    const image = imagesData.find((img) => img.id.toString() === id);
    if (!image) {
        return <div style={{ padding: 40 }}>Image not found.</div>;
    }

    return(
        <div style={{ minHeight: "100vh", background: "#fafbfc" }}>
            <button onClick={() => navigate(-1)} style={{ margin: 20 }}>← Back</button>
            <div onClick={() => navigate(`/image/${image.id}`)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img src={image.url} alt={image.title} style={{ maxWidth: "90vw", maxHeight: "70vh", borderRadius: 8 }}/>
                <h2>{image.title}</h2>
                <p>category: {image.category}</p>
            </div>
        </div>
    );
};

export default ImageViewer;

/*
import { useParams, useNavigate } from "react-router-dom";
import rawData from "../data/Images.json";
import type { ImageItem } from "../types/Image";

const ImageViewer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const imagesData = rawData as ImageItem[];

    const image = imagesData.find((img) => img.id.toString() === id);
    if (!image) {
        return (
            <div style={{ 
                minHeight: "100vh", 
                background: "#fafbfc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px"
            }}>
                <div style={{ textAlign: "center" }}>
                    <h2>Image not found</h2>
                    <button onClick={() => navigate(-1)} style={{ marginTop: "20px" }}>
                        ← Go Back
                    </button>
                </div>
            </div>
        );
    }

    return(
        <div style={{ 
            minHeight: "100vh", 
            background: "#fafbfc",
            display: "flex",
            flexDirection: "column"
        }}>
            <div style={{ 
                padding: "20px",
                borderBottom: "1px solid #eee",
                background: "#fff"
            }}>
                <button 
                    onClick={() => navigate(-1)} 
                    style={{ 
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500"
                    }}
                >
                    ← Back
                </button>
            </div>
            <div style={{ 
                flex: 1,
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
                gap: "20px"
            }}>
                <img 
                    src={image.url} 
                    alt={image.title} 
                    style={{ 
                        maxWidth: "90vw", 
                        maxHeight: "70vh", 
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        objectFit: "contain"
                    }}
                />
                <div style={{ textAlign: "center" }}>
                    <h2 style={{ 
                        margin: "0 0 10px 0",
                        fontSize: "2rem",
                        color: "#333"
                    }}>
                        {image.title}
                    </h2>
                    <p style={{ 
                        margin: 0,
                        fontSize: "1.1rem",
                        color: "#666",
                        textTransform: "capitalize"
                    }}>
                        Category: {image.category}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImageViewer;
*/