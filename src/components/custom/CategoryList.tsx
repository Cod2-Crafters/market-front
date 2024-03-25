'use client';

import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

type TCategoryList = {
    name?: string;
    className?: string;
    setCategory?: Dispatch<SetStateAction<CategoryState | undefined>>;
    selectedCategory: CategoryState | undefined;
};

function getIPFromServer() {
    const FALLBACK_IP_ADDRESS = '0.0.0.0';
    // const forwardedFor = headers().get('x-forwarded-for');

    // if (forwardedFor) {
    //     return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS;
    // }

    // return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS;
    return FALLBACK_IP_ADDRESS;
}

async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/list`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
            'x-forwarded-for': getIPFromServer(),
        },
    });
    console.log('categories');
    return res.json();
}

const CategoryList = ({ name, className, selectedCategory }: TCategoryList) => {
    const [selectMainCateogry, setSelectMainCategory] = useState<CategoryState>();
    const [selectSubCategory, setSelectSubCategory] = useState<CategoryState>();

    const [categories, setCategories] = useState<CategoryState[]>();

    const { setValue } = useFormContext();

    const fetchCategories = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category/list`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'x-forwarded-for': getIPFromServer(),
            },
        });
        setCategories(await res.json());
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            {/* 카테고리 선택 */}
            <div className={cn('flex flex-1 flex-row flex-nowrap border-2 border-gray-10', className)}>
                <ul className="h-[100px] w-full overflow-y-scroll">
                    {categories &&
                        categories.map((mainCategoryItem) => {
                            return (
                                <li
                                    key={mainCategoryItem.id}
                                    data-id={mainCategoryItem.id}
                                    className={cn('w-full cursor-pointer py-4 hover:bg-gray-80', {
                                        'bg-primary text-white hover:bg-primary':
                                            selectMainCateogry?.id == mainCategoryItem.id,
                                    })}
                                    onClick={(event) => {
                                        if (event.currentTarget != null) {
                                            if (mainCategoryItem.id == Number(event.currentTarget.dataset.id)) {
                                                // console.log('categoryList SelectedID:', event.currentTarget.dataset.id);
                                                setSelectMainCategory({ ...mainCategoryItem });
                                                setSelectSubCategory(undefined);
                                                name && setValue(name, mainCategoryItem);
                                            }
                                        }
                                    }}
                                >
                                    {mainCategoryItem.name}
                                    {/* {mainCategoryItem.name} */}
                                </li>
                            );
                        })}
                </ul>
                {/* 중분류 */}
                {selectMainCateogry?.child == undefined && (
                    <p className="flex w-full items-center justify-center">중분류 선택</p>
                )}

                {selectMainCateogry?.child != undefined && (
                    <ul className="h-[100px] w-full overflow-y-scroll">
                        {selectMainCateogry?.child?.map((subCategoryItem) => {
                            return (
                                <li
                                    key={subCategoryItem.id}
                                    className={cn('w-full cursor-pointer py-4 hover:bg-gray-80', {
                                        'bg-primary text-white hover:bg-primary':
                                            selectSubCategory?.id == subCategoryItem.id,
                                    })}
                                    data-id={subCategoryItem.id}
                                    onClick={(event) => {
                                        setSelectSubCategory({ ...subCategoryItem });
                                        name && setValue(name, subCategoryItem);
                                    }}
                                >
                                    {subCategoryItem.name}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <p className="text-primary">
                <span>선택한 카테고리:</span>
                <b>{selectedCategory && selectedCategory.name}</b>
            </p>
            {/* 
            <div>
                선택값: {selectMainCateogry?.name}
                {selectSubCategory != undefined && '>'}
                {selectSubCategory?.name}{' '} 
                {selectedCategory && selectedCategory.name}
            </div>
                */}
        </>
    );
};

export default CategoryList;
