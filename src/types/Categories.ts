interface CategoryState {
    id: number;
    name: string;
    count: number;
    parentId: number;
    selected?: boolean;
    child?: Array<CategoryState>;
}
