export interface IProduct {
    id?: string;
    slug?: string;
    title?: string;
    description?: string;
    dimensions?: string;
    price?: number;
    categoryId?: string;
    imagePrimary?: ImagePrimary;
    images?: Image[];
}

interface ImagePrimary {
    altText?: string;
    mediaItemUrl: string;
    thumbnailUrl?: string;
}

interface Image {
    mediaItemUrl: string;
    thumbnailUrl?: string;
    id?: string;
}