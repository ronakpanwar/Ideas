
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface profile{
  bio?:string,
    img?:string ,
    linkdinId?:string,
    instaId?:string ,
    twitterId?:string ,
    gitId?:string ,
}

interface user {
    id:string,
    name:string,
    userName:string,
    email:string , 
    profile:profile
  }

  interface userState {
    loading:boolean,
    user:user | null,
  }

  const initialState :userState = {
    loading: false,
    user: null,
  };

  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      // Actions
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setUser: (state, action: PayloadAction<user | null>) => {
        state.user = action.payload;
      },
    },
  });
  
  export const { setLoading, setUser } = userSlice.actions;
  export default userSlice.reducer;