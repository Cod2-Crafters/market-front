'use client';

import { useAppDispatch, useAppSelector } from '../rtkHooks';

import { RootState } from '@/store/store';

function userLoginMember() {
    const loginUserInfo = useAppSelector((state: RootState) => state.memeberinfo) || undefined;
    const dispatchLoginUserInfo = useAppDispatch();
    const isLoginMember = () => {
        if (loginUserInfo == undefined || loginUserInfo.id == 0) {
            return false;
        }
        return true;
    };
    return { loginUserInfo, dispatchLoginUserInfo, isLoginMember };
}

export default userLoginMember;
