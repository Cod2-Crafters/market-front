import { ProductMember } from './Product';

export interface ShopDetail {
    content: ShopContent[];
    pageable: ShopPageInfo;
    size: number;
    number: number;
    sort: SortInfo;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

export interface ShopContent {
    id: number;
    simpleMemberResponse: ProductMember;
    title: string;
    price: number;
    content: string;
    postStatus: string;
    isDeleted: boolean;
    thumbnailPath: string;
    createdAt: string;
}

export interface ShopPageInfo {
    pageNumber: number;
    pageSize: number;
    sort: SortInfo;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface SortInfo {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}
