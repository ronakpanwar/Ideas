'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import axios from 'axios';
import { setLoading, setSelectedPost } from '@/redux/userSlice';
import Image from 'next/image';
import temp from '../../../components/temp.jpg'
import { Card, CardTitle } from '@/components/ui/card';
import userImg from '../../profile.png'
import { SiGmail } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface data {
    email: string,
    msg: string
}


const Page = () => {

    const loading = useSelector((store: RootState) => store.user.loading);

    const { id } = useParams();
    const post = useSelector((store: RootState) => store.user.selectedPost);
    const dispatch = useDispatch<AppDispatch>()

    const [sendData, setSendData] = useState<data>({
        email: '',
        msg: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSendData({
            ...sendData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
           dispatch(setLoading(true));
            const res = await axios.post(`http://localhost:4000/api/message/send/${post?.userId?._id}` , sendData , {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if(res.data.success){
                toast.success(res.data.message);
            }

        } catch (error:any) {
            toast.error(error?.response?.data?.message || "somthing is Wrong")
        }finally{
            dispatch(setLoading(false));
        }
        setSendData({
            email:'',
            msg:''
        })
    }

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
    }, [id, dispatch])

    return (
        <div className='flex items-center justify-center px-5 md:px-10'>
            <div className='w-[90%] md:w-3/4'>
                <div>
                    <Image
                        className='w-full'
                        src={post?.img ? post?.img : temp}
                        width={800}
                        height={400}
                        alt='image'
                    />
                </div>
                <div className='flex flex-col gap-10 my-10'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>{post?.title}</h1>
                    <div className='' >
                        <h2 className='test-md sm:text-lg md:text-xl font-bold' >About Start Up -</h2>
                        <p className='text-sm md:text-md mt-2 text-slate-700'>{post?.description}</p>
                    </div>
                    <div>
                        <h2 className='test-md sm:text-lg md:text-xl font-bold'>Problem Area</h2>
                        <p className='text-sm md:text-md mt-2 text-slate-700'>{post?.problem}</p>
                    </div>
                    <div>
                        <h2 className='test-md sm:text-lg md:text-xl font-bold' >Solution </h2>
                        <p className='text-sm md:text-md mt-2 text-slate-700'>{post?.solution}</p>
                    </div>
                    <div>
                        <h2 className='test-md sm:text-lg md:text-xl font-bold'>Target Audience</h2>
                        <ol className='text-sm md:text-md my-2 text-slate-700'>
                            {
                                post?.targetAudience.map((p, index) => (
                                    <li key={index} >-{p}</li>
                                ))
                            }

                        </ol>

                    </div>

                </div>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold my-6'>Founder - </h1>
                    <div className='flex flex-col items-center sm:flex-row sm:items-start gap-10 md:gap-20'>
                        <div className='w-[75%] sm:w-1/2 md:w-1/3'>
                            <Card className='flex flex-col justify-center items-center p-8 gap-2 bg-orange-500'>
                                <Image
                                    className='rounded-full border-2 object-cover h-22 md:aspect-square border-black w-full shadow-xl '
                                    src={post?.userId?.profile?.img ? post?.userId?.profile?.img : userImg}
                                    width={150}
                                    height={30}
                                    alt='profile image'
                                />
                                <CardTitle className='text-lg '>{post?.userId?.userName}</CardTitle>
                            </Card>
                        </div>
                        <div>
                            <div className='flex flex-col gap-1 items-start my-4'>
                                <h1 className='text-xl sm:text-3xl font-bold'>{post?.userId?.name}</h1>
                                <p className='text-sm sm:text-md text-slate-700'> {post?.userId?.profile?.bio}</p>
                                <div className='flex items-center justify-center gap-1 mt-4'>
                                    <SiGmail />-
                                    <p className='cursor-pointer font-semibold text-md'>
                                        {post?.userId?.email} </p>
                                </div>
                            </div>
                            <div className='mt-6 md:mt-12'>
                                <h1 className='font-bold'>Follow on -</h1>
                                <div className='flex gap-8 text-3xl mt-4 '>
                                    <Link href={post?.userId?.profile?.gitId ? post?.userId?.profile?.gitId : '/#'}> <FaGithub /></Link>

                                    <Link href={post?.userId?.profile?.linkdinId ? post?.userId?.profile?.linkdinId : '/#'}><FaLinkedin /></Link>

                                    <Link href={post?.userId?.profile?.twitterId ? post?.userId?.profile?.twitterId : '/#'} ><FaSquareXTwitter /></Link>

                                    <Link href={post?.userId?.profile?.instaId ? post?.userId?.profile?.instaId : '/#'}><FaInstagramSquare /></Link>
                                </div>


                            </div>
                        </div>

                    </div>
                </div>

                <div className='mt-14 mb-20'>
                    <h1 className='text-xl md:text-2xl font-bold '>To Contect With Founder -</h1>


                    <div className=' flex flex-col sm:flex-row items-center sm:items-start py-4 gap-10'>

                        <p className='text-sm md:text-md text-slate-700 py-3 w-full sm:w-1/2 md:w-1/3'>If you like start Up idea and you wanna join with in , So sent message to the founder with your active email Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur fuga magni molestiae neque nihil debitis! </p>

                        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-3 mt-4 w-full sm:w-3/4 md:w-1/2' >

                            <Input
                                className='border-zinc-800 rounded-md border-2  w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                                placeholder='Enter Active Email...'
                                name='email'
                                value={sendData.email}
                                onChange={handleChange}
                            />
                            <Textarea
                                className='border-black border-2 w-full shadow-md'
                                placeholder='Enter Your Message...'
                                name='msg'
                                value={sendData.msg}
                                onChange={handleChange}
                            />

                            <Button className='' type='submit'>
                                {
                                    loading ? (<Loader2 className="animate-spin" />) : (' Send Message')
                                }

                            </Button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
