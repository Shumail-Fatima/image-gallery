import ImageCard from "./ImageCard";

type ImageItem = {
  id: number;
  title: string;
  type: string;
  category: string;
  url: string;
};

type Props = {
  images: ImageItem[];
};

const ImageGrid = ({ images }: Props) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        width: '100%',
      }}
    >
      {images.map((img) => (
        <ImageCard key={img.id} image={img} />
      ))}
    </div>
  );
};

export default ImageGrid;