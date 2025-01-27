'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import axios from 'axios';
import { setSelectedPost } from '@/redux/userSlice';

const Page = () => {


    const {id} =  useParams();
    const post = useSelector((store: RootState) => store.user.selectedPost);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/post/${id}`);
                if (res.data.success) {
                    dispatch(setSelectedPost(res.data.post));
                }
            } catch (error: any) {
                console.log(error)
            }

        }
        getPost();
    }, [id , dispatch])

    return (
        <div>
            

        </div>
    )
}

export default Page
