'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AppDispatch, RootState } from '@/redux/store'
import { setLoading } from '@/redux/userSlice'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

interface post {
    title: string,
    description: string,
    problem: string,
    solution: string,
    targetAudience:string,
    img?: File

}

const CreatePost = () => {

    const loading = useSelector((store: RootState) => store.user.loading);
    const dispatch = useDispatch<AppDispatch>();

    const [data, setData] = useState<post>({
        title: '',
        description: '',
        problem: '',
        solution: '',
        targetAudience: ''
    })
    const [image, setImage] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({
            ...data,
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
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("problem", data.problem);
        formData.append("solution", data.solution);
        formData.append("targetAudience", data.targetAudience);
        if(image) formData.append("img", image);
        

        try {
            dispatch(setLoading(true));

            const res = await axios.post('http://localhost:4000/api/post/add-post', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);

            }

        } catch (error: any) {
            toast.error(error?.response?.data?.message || "somthing is Wrong")
        } finally {
            dispatch(setLoading(false));
        }
        setData({
            title: '',
            description: '',
            problem: '',
            solution: '',
            targetAudience: ''
        })

    }
   



    return (
        <div className='flex  justify-center mt-10'>
            <div className='w-1/2'>
                <h1 className='text-4xl text-center mb-6'>Share your ideas with us...</h1>
                <form action="" onSubmit={handleSubmit} className='text-3xl'>
                    <div className='py-2'>
                        <Label htmlFor='title' className='font-bold text-lg ' > Title </Label>
                        <Input
                            className='border-zinc-800 rounded-md border-2  w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                            type='text'
                            name='title'
                            value={data.title}
                            onChange={handleChange}
                            placeholder='Enter title'
                        />
                    </div>
                    <div className='py-2'>
                        <Label htmlFor='description' className='font-bold text-lg '>Description </Label>
                        <Textarea
                            className='border-black border-2 w-full shadow-md'
                            rows={5}
                            name='description'
                            value={data.description}
                            onChange={handleChange}
                            placeholder='Describe your idea...'
                        />
                    </div>
                    <div className='py-2'>
                        <Label htmlFor='problem' className='font-bold text-lg '>problems</Label>
                        <Textarea
                            className='border-black border-2 w-full  shadow-md'
                            rows={5}
                            name='problem'
                            value={data.problem}
                            onChange={handleChange}
                            placeholder='Describe why need this idea '
                        />
                    </div>
                    <div className='py-2'>
                        <Label htmlFor='solution' className='font-bold text-lg '>Solution </Label>
                        <Textarea
                            className='border-black border-2 w-full shadow-md'
                            rows={5}
                            name='solution'
                            value={data.solution}
                            onChange={handleChange}
                            placeholder='Describe how to solve the problem'
                        />
                    </div>
                    <div className='py-2'>
                        <Label htmlFor='targetAudience' className='font-bold text-lg '> Target Audience </Label>
                        <Textarea
                            className='border-black border-2 w-full shadow-md'
                            rows={5}
                            name='targetAudience'
                            value={data.targetAudience}
                            onChange={handleChange}
                            placeholder='students , Busness man'
                        />
                    </div>
                    <div className='py-2'>
                        <Label htmlFor='img' className='font-bold text-lg '>Uplode Image</Label>
                        <Input
                            className='border-black border-2 w-full focus-visible:ring-1 focus-visible:ring-ring shadow-md'
                            type='file'
                            onChange={handleFileChange}

                        />

                    </div>

                    <div className='text-center mb-10 mt-5'>
                        <Button className='w-1/4' type='submit'>
                            {
                                loading ? (<Loader2 className="animate-spin" />) : (' Submit')
                            }

                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default CreatePost
