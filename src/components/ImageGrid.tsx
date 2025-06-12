type ImageItem = {
  id: number;
  title: string;
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        padding: '20px',
      }}
    >
      {images.map((img) => (
        <div key={img.id}>
          <img src={img.url} alt={img.title} style={{ width: '100%', borderRadius: '8px' }} />
          <p style={{ textAlign: 'center' }}>{img.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
