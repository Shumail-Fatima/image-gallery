import { useNavigate } from "react-router-dom";
import type { ImageItem } from "../types/Image";

type Props= {
    image: ImageItem;
};

const ImageCard = ({image}: Props) => {
    const navigate = useNavigate();

    return(
        <div 
            onClick={() => navigate(`/image/${image.id}`)} 
            className="cursor-pointer"
            style={{
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            }}
        >
            <img 
                src={image.url} 
                alt={image.title} 
                style={{ 
                    width: '100%', 
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block'
                }} 
            />
            <div style={{ padding: '12px' }}>
                <p style={{ 
                    margin: 0, 
                    fontWeight: '500',
                    color: '#333',
                    fontSize: '14px'
                }}>
                    {image.title}
                </p>
            </div>
        </div>
    )
}

export default ImageCard;


