'use client'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeDrawer, openDrawer } from '@/features/drawer/drawerSlice';
import { Drawer as DrawerUI, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerClose, DrawerTitle, DrawerDescription, Drawer } from "@/components/ui/drawer";
import { Button } from '../ui/button';
import { useAppSelector, useAppStore } from '@/hooks/rtkHooks';
import ReactDOM from 'react-dom';

const DrawerComponent = () => {
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    const isOpen = useAppSelector((state: any) => state.drawer.isOpen);
    const target = document.getElementById('drawer-root');
    console.log(isOpen);
    if (!target) return null;

    // 조건부 렌더링을 위해 `createPortal` 호출을 `return` 문과 같은 줄에 배치
    return ReactDOM.createPortal(
        <Drawer open={isOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        {/* <Button variant="outline">Cancel</Button> */}
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>,
        target
    );
}

export default DrawerComponent;
