'use client'
import { Card, CardTitle } from '@/components/ui/card'

import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { setLoading, setUser, setUserMsg, setUserPost } from '@/redux/userSlice'
import axios from 'axios'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import UserPosts from './UserPosts'


interface data {
    userName: string,
    bio: string,
    instaId: string,
    gitId: string,
    twitterId: string,
    linkdinId: string,
    img?: File
}

const UserProfile = () => {

    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((store: RootState) => store.user.user)
    const loading = useSelector((store: RootState) => store.user.loading);

    const [userData, setUserData] = useState<data>({
        userName: '',
        bio: '',
        instaId: '',
        gitId: '',
        linkdinId: '',
        twitterId: ''
    })
    const [image, setImage] = useState<File | null>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userName", userData.userName);
        formData.append("bio", userData.bio);
        formData.append("instaId", userData.instaId);
        formData.append("gitId", userData.gitId);
        formData.append("linkdinId", userData.linkdinId);
        formData.append("twitter", userData.twitterId)
        if (image) formData.append("img", image);

        try {
            dispatch(setLoading(true));

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile/update`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                dispatch(setUser(res.data.user));
            }

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "somthing is Wrong")
        } finally {
            dispatch(setLoading(false));
        }

    }




    useEffect(() => {
        const getUserPost = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post/user-post`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setUserPost(res.data.posts));
                }
            } catch (error) {
                console.log(error)
            }
        }

        getUserPost();
    }, [dispatch])

    useEffect(() => {
        const getUserMsg = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/message/my`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setUserMsg(res.data.message));
                }
            } catch (error) {
                console.log(error)
            }
        }

        getUserMsg();
    }, [dispatch])




    return (
        <div className='flex items-center justify-center bg-slate-200'>
            <div className='w-full md:w-[80%] bg-white p-4 shadow-lg border-1 border-zinc-600 m-2 rounded-lg'>
                <div className='flex flex-col items-center sm:flex-row gap-5 md:gap-8 m-10'>
                    <div className='w-[75%] sm:w-1/2  md:w-1/3'>
                        <Card className='bg-orange-500 flex flex-col items-center gap-6 p-8 shadow-lg relative w-full'>
                            <Avatar className="h-20 w-20 my-4 border-2  border-black  md:h-40 md:w-40 rounded-full shadow-md">
                                <AvatarImage className='z-10 object-cover ' src={user?.profile?.img ? user?.profile?.img : '#'}
                                    alt="User Avatar" />
                            </Avatar>

                            <CardTitle className='text-sm  md:text-xl'>{user?.userName}</CardTitle>
                        </Card>
                    </div>
                    <div className='flex flex-col py-2 md:py-4 md:ml-20 items-start '>
                        <h1 className='text-xl md:text-3xl font-bold '>{user?.name}</h1>
                        <p className='text-sm md:text-md text-slate-800'>{user?.profile?.bio}</p>

                        <div className='flex items-center justify-center text-sm md:text-lg gap-1 mt-6 md:mt-8'>
                            <SiGmail />-
                            <p className='cursor-pointer font-semibold text-sm md:text-lg'>
                                {user?.email} </p>
                        </div>

                        <div className='flex gap-10 text-xl md:text-3xl mt-4 md:mt-8 '>
                            <Link href={user?.profile?.gitId ? user?.profile?.gitId : '/#'}> <FaGithub /></Link>

                            <Link href={user?.profile?.linkdinId ? user?.profile?.linkdinId : '/#'}><FaLinkedin /></Link>

                            <Link href={user?.profile?.twitterId ? user?.profile?.twitterId : '/#'} ><FaSquareXTwitter /></Link>

                            <Link href={user?.profile?.instaId ? user?.profile?.instaId : '/#'}><FaInstagramSquare /></Link>
                        </div>
                        <div className=' mt-6   md:mt-12'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='w-full border-2 border-black' ><FiEdit2 /> Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[300px] md:max-w-[450px]">
                                    <DialogTitle className='text-md font-bold text-center'>Edit Profile </DialogTitle>
                                    <form action="" onSubmit={handleSubmit}>
                                        <div className='py-1'>
                                            <Label htmlFor='img' className='font-bold text-md ' > Profile Image</Label>
                                            <Input
                                                className='border-zinc-800 rounded-md border-2  w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                                                type='file'
                                                name='img'
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        <div className='py-2'>

                                            <Input
                                                className='border-zinc-800 rounded-md border-2  w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                                                type='text'
                                                name='userName'
                                                value={userData.userName}
                                                onChange={handleChange}
                                                placeholder='Enter user name'
                                            />
                                        </div>
                                        <div className='py-2'>

                                            <Input
                                                className='border-zinc-800 rounded-md border-2  w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                                                type='text'
                                                name='bio'
                                                value={userData.bio}
                                                onChange={handleChange}
                                                placeholder='Enter bio'
                                            />
                                        </div>
                                        <div className='py-2'>

                                            <Input
                                                className='border-zinc-800 rounded-md border-2  w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                                                type='text'
                                                name='instaId'
                                                value={userData.instaId}
                                                onChange={handleChange}
                                                placeholder='Enter insta url'
                                            />
                                        </div>
                                        <div className='py-2'>

                                            <Input
                                                className='border-zinc-800 rounded-md border-2  w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                                                type='text'
                                                name='gitId'
                                                value={userData.gitId}
                                                onChange={handleChange}
                                                placeholder='Enter github url'
                                            />
                                        </div>
                                        <div className='py-2'>

                                            <Input
                                                className='border-zinc-800 rounded-md border-2  w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                                                type='text'
                                                name='twitterId'
                                                value={userData.twitterId}
                                                onChange={handleChange}
                                                placeholder='Enter twitter url'
                                            />
                                        </div>
                                        <div className='py-2'>

                                            <Input
                                                className='border-zinc-800 rounded-md border-2  w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                                                type='text'
                                                name='linkdinId'
                                                value={userData.linkdinId}
                                                onChange={handleChange}
                                                placeholder='Enter linkdin url'
                                            />
                                        </div>
                                        <Button className='w-full mt-2' type='submit'>
                                            {
                                                loading ? (<Loader2 className="animate-spin" />) : (' Edit Profile')
                                            }

                                        </Button>
                                    </form>
                                </DialogContent>
                            </Dialog>

                        </div>
                    </div>
                </div>


                <div>
                    <UserPosts />
                </div>

            </div>
        </div>
    )
}

export default UserProfile
