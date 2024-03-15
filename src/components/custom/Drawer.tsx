'use client'
import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer, openDrawer } from '@/features/drawer/drawerSlice';
import { Drawer as DrawerUI, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose, DrawerTitle, DrawerDescription, Drawer } from "@/components/ui/drawer";
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector, useAppStore } from '@/hooks/rtkHooks';
import ReactDOM from 'react-dom';

const DrawerComponent = () => {
    const isOpen = useAppSelector((state: any) => state.drawer.isOpen);
    const content = useAppSelector((state: any) => state.drawer.content);
    const dispatch = useAppDispatch();

    // 모달 닫기 함수
    const handleClose = () => {
        dispatch(closeDrawer());
    };

    // 배경 클릭 시 모달 닫기
    const handleBackdropClick = (event: any) => {
        event.stopPropagation(); // 모달 컨텐츠 클릭 시 이벤트 버블링 중단
        handleClose();
    };

    return isOpen ? (<> <div className="fixed inset-0 z-40 bg-gray-10 bg-opacity-40 flex justify-end items-center" style={{ width: '100%', height: '100%' }} onClick={handleBackdropClick}>
        <div className="w-1/2 h-full bg-white rounded-lg shadow-xl z-50" onClick={(e) => e.stopPropagation()}>
            <div className="p-5">
                <button className="absolute top-0 right-0 mt-2 mr-2 text-xl font-semibold right-10" onClick={handleClose}>&times;</button>
                {content}
            </div>
        </div>
    </div>
    </>) : (<></>)



}

export default DrawerComponent;
