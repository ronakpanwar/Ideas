import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Image from 'next/image'
import temp from './temp.jpg'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
// import { Badge } from './ui/badge'


  interface post {
     _id:string
      userId:string,
      title:string,
      field:string,
      img:string,
      description:string,
      problem:string,
      solution:string,
      targetAudience:[],
      createdAt?:Date,  
      updatedAt?:Date
  }

  
type PostCardProps = {
  post: post;
  check: boolean;
};



const UserPostCard = ({post , check}:PostCardProps) => {
   
  const router = useRouter();

  return (
    <div>
      <Card className='flex flex-col items-center gap-2 shadow-lg hover:shadow-xl ' >
        <CardHeader className='rounded-t-lg '>
          { check === true ? (
   <Image
          className='w-full rounded-t-md object-cover h-auto'
           width={500}
            height={200}
            src={ post?.img ? post.img :temp}
            alt='postImage' />
          ):(
            <div></div>
          )
             

          }
      
        </CardHeader>
        <CardContent className='flex flex-col gap-4 '>
           <CardTitle>{post?.title.substring(0,40)}...</CardTitle>
           <CardDescription>{post?.description.substring(0,200)}...</CardDescription>
         
        </CardContent>
        <CardFooter className=' flex '>
            <Button className='text-sm' variant={"outline"} onClick={()=>{
             router.push(`/about/${post._id}`)
            }}>See More</Button>
           
          
        </CardFooter>
      </Card>
    </div>
  )
}

export default UserPostCard