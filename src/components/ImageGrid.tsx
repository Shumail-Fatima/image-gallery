import ImageCard from "./ImageCard";
import type { ImageItem } from "../types/Image";

type Props = {
    images: ImageItem[];
}

const ImageGrid = ({images}: Props) => {
    return(
        <div className="grid grid-cols-2 gap-4 p-4">
            {images.map((img) => (
                <ImageCard key={img.id} image={img} />
            ))}
        </div>
    );
};

export default ImageGrid