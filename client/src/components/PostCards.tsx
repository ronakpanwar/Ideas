import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import temp from './temp.jpg'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const PostCard = ({post}) => {

  const router = useRouter();

  return (
    <div>
      <Card className='flex flex-col items-center gap-2 shadow-lg hover:shadow-xl ' >
        <CardHeader className='rounded-t-lg '>
          <Image
          className='w-full rounded-t-md'
           width={500}
            height={200}
            src={ post?.img ? post.img :temp}
            alt='postImage' />
        </CardHeader>
        <CardContent className='flex flex-col gap-4 '>
           <CardTitle>{post?.title}</CardTitle>
           <CardDescription>{post?.description.substring(0,200)}...</CardDescription>
         
        </CardContent>
        <CardFooter className=''>
            <Button onClick={()=>{
             router.push(`/about/${post._id}`)
            }}>Show More</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PostCard
