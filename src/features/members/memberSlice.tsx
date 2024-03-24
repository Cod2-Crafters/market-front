import { createSlice } from '@reduxjs/toolkit';

const initialState: LoginUserState = {
    id: 0,
    email: '',
    realName: '',
    shopName: '',
    loginType: 'BASIC',
    // name: '',
};

const memberSlice = createSlice({
    name: 'memberinfo',
    initialState,
    reducers: {
        setMember: (state, action) => {
            console.log('userSliceInfo-setMember', { ...action.payload });
            return { ...action.payload };
        },
        // setName: (state, action) => {
        //     console.log('userSliceInfo-setName', action);
        //     return { ...state, name: action.payload };
        // },

        // setMemberLogout: (state, action) => {
        //     state = initialState;
        // },
    },
});

export default memberSlice.reducer;
type MemberInfoAction = ReturnType<typeof memberSlice.actions.setMember>;
export type { MemberInfoAction };

export const { setMember } = memberSlice.actions;
export { initialState as memberinitialState };
