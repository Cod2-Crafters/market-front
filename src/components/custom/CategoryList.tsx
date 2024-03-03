'use client';

import { ICategory } from './CategoryData';

import { cn } from '@/lib/utils';
import { useState } from 'react';

type TCategoryList = {
    categories: ICategory[];
    className?: string;
};

const CategoryList = ({ categories, className }: TCategoryList) => {
    const [selectMainCateogry, setSelectMainCategory] = useState<ICategory>();
    const [selectSubCategory, setSelectSubCategory] = useState<ICategory>();
    return (
        <>
            {/* 카테고리 선택 */}
            <div className={cn('flex flex-1 flex-row flex-nowrap border-2 border-gray-10', className)}>
                <ul className="h-[100px] w-full overflow-y-scroll">
                    {categories.map((mainCategoryItem) => {
                        return (
                            <li
                                key={mainCategoryItem.id}
                                data-id={mainCategoryItem.id}
                                className={cn('w-full cursor-pointer py-4 hover:bg-gray-80', {
                                    'bg-secondary hover:bg-secondary': selectMainCateogry?.id == mainCategoryItem.id,
                                })}
                                onClick={(event) => {
                                    if (event.currentTarget != null) {
                                        if (mainCategoryItem.id == Number(event.currentTarget.dataset.id)) {
                                            console.log(event.currentTarget.dataset.id);
                                            setSelectMainCategory(() => {
                                                return { ...mainCategoryItem };
                                            });
                                            setSelectSubCategory(() => {
                                                return undefined;
                                            });
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
                                        'bg-secondary hover:bg-secondary': selectSubCategory?.id == subCategoryItem.id,
                                    })}
                                    data-id={subCategoryItem.id}
                                    onClick={(event) => {
                                        setSelectSubCategory(() => {
                                            return { ...subCategoryItem };
                                        });
                                    }}
                                >
                                    {subCategoryItem.name}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div>
                선택값: {selectMainCateogry?.name}
                {selectSubCategory != undefined && '>'}
                {selectSubCategory?.name}{' '}
            </div>
        </>
    );
};

export default CategoryList;
