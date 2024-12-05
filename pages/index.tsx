import React from 'react'
import {Card, CardBody, Button} from "@nextui-org/react";
import { useRouter } from 'next/router';
import Header from '@/components/header';


function Home() {
  // require('dotenv').config();
  const router = useRouter();
  // console.log(process.env.NEXT_PUBLIC_SECRET_KEY)
  return (
    <>
    <Header />
<div className='min-h-screen flex  items-center justify-center'>
      <Card className='w-1/3 m-auto'>
        <CardBody className='gap-4 p-6 flex  items-center justify-center'>
          
          <Button type='button' onClick ={()=>{router.push('/cf')}} className='p-5 w-full'>
            See your codeforces rating here
          </Button>
          <Button type='button' onClick ={()=>{router.push('/notes')}} className='p-5 w-full'>
            Add Notes here
          </Button>
       
        </CardBody> 
      </Card>
      

      </div>
    </>
  )
}

export default Home

