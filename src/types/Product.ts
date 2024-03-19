export interface ProductDetail {
    id: number;
    member: ProductMember;
    title: string;
    content: string;
    price: number;
    createdAt: Date;
    modifyedAt: string;
    status: string;
    hashtagList: string[];
    deleted: boolean;
    views: any;
    bookmarkCount: number;
    imageList: ProductImage[];
}

export interface ProductMember {
    id: number;
    email: string;
    shopName: string;
    logoPath: string | null;
    createdAt: string;
}

export interface ProductImage {
    id: number;
    imagePath: string;
    isThumbnail: boolean;
}
