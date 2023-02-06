export interface IProduct {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    categoryId: string;
    imagePrimary: ImagePrimary;
    images: Image[];
}

interface ImagePrimary {
    altText: string;
    mediaItemUrl: string;
}

interface Image {
    mediaItemUrl: string;
    id: string;
}