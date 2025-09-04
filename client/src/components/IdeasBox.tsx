'use client'
import { AppDispatch, RootState } from '@/redux/store'
import { setPosts } from '@/redux/userSlice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostCard from './PostCards'

const IdeasBox = () => {
    const dispatch = useDispatch<AppDispatch>();
    const post = useSelector((store: RootState) => store.user.posts);

    const [postData, setPostData] = useState(post);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/all-post`);
                if (res.data.success) {
                    dispatch(setPosts(res.data.posts));
                    setPostData(res.data.posts)
                }
            } catch (error: any) {
                console.log(error)
            }
        }
        getPosts();
    }, [dispatch]);

    return (
        <div>
            <h1></h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-5 md:mx-10 my-20'>


                {
                    postData.map((post) => (
                        <PostCard key={post._id} post={post} check={false} />
                    ))
                }


            </div>
        </div>
    )
}

export default IdeasBox
