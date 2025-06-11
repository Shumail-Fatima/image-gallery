export interface Image {
  id: string;
  alt_description: string;
  description: string | null;
  urls: {
    thumb: string;
    full: string;
  };
}

export interface ApiResponse {
  results: Image[];
  total_pages: number;
}
