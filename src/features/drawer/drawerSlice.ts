import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type DrawerState = {
    isOpen: boolean;
    content: React.ReactNode | null; // ReactNode 타입을 사용하기 위해 React 타입 정의가 필요합니다.
};

export const drawerSlice = createSlice({
    name: 'drawer',
    initialState: {
        isOpen: false,
        content: null, // 초기 상태에 content 필드 추가
    } as DrawerState,
    reducers: {
        toggleDrawer: (state) => {
            state.isOpen = !state.isOpen;
        },
        openDrawer: (state, action: PayloadAction<React.ReactNode | null>) => {
            state.isOpen = true;
            state.content = action.payload; // openDrawer 액션 호출 시 content 설정
        },
        closeDrawer: (state) => {
            state.isOpen = false;
            state.content = null; // closeDrawer 호출 시 content 초기화
        },
        setContent: (state, action: PayloadAction<React.ReactNode | null>) => {
            state.content = action.payload;
        },
    },
});

export const { toggleDrawer, openDrawer, closeDrawer, setContent } = drawerSlice.actions;

export default drawerSlice.reducer;
