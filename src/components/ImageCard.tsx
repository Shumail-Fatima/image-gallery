import { useNavigate } from "react-router-dom";
import type { ImageItem } from "../types/Image";

type Props= {
    image: ImageItem;
};

const ImageCard = ({image}: Props) => {
    const navigate = useNavigate();

    return(
        <div onClick={() => navigate(`/image/${image.id}`)} className="cursor-pointer">
            <img src={image.url} alt={image.title} className="w-full h-auto rounded shadow" />
        </div>
    )
}

export default ImageCard;