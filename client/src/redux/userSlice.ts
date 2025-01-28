
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
    _id:string,
    name:string,
    userName:string,
    email:string , 
    profile:profile,
    password?:string,
    createdAt?:Date,  
    updatedAt?:Date
  }

  interface post {
     _id:string
      userId:user,
      title:string,
      img:string,
      description:string,
      problem:string,
      solution:string,
      targetAudience:[],
      createdAt?:Date,  
      updatedAt?:Date
  }
  interface userPost {
    _id:string
     userId:string,
     title:string,
     img:string,
     description:string,
     problem:string,
     solution:string,
     targetAudience:[],
     createdAt?:Date,  
     updatedAt?:Date
 }

 interface msg{
  _id:string,
  userId:string,
  email:string,
  msg:string,
  createdAt?:Date,  
  updatedAt?:Date 
 }

  interface userState {
    loading:boolean,
    user:user | null,
    posts:post[] ,
    selectedPost:post | null,
    userPost:userPost[] ,
    userMsg:msg[]
  }

  const initialState :userState = {
    loading: false,
    user: null,
    posts:[],
    selectedPost:null,
    userPost:[],
    userMsg:[]
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
      setPosts: (state , action: PayloadAction<post[]>) => {
        state.posts = action.payload ;
      },
      setSelectedPost: (state , action :PayloadAction<post>)=>{
        state.selectedPost = action.payload;
      },
      setUserPost:(state , action :PayloadAction<userPost[]>)=>{
        state.userPost = action.payload;
      },
      setUserMsg :(state , action :PayloadAction<msg[]>)=>{
        state.userMsg = action.payload;
      }
    },
  });
  
  export const { setLoading, setUser , setPosts , setSelectedPost , setUserPost , setUserMsg} = userSlice.actions;
  export default userSlice.reducer;