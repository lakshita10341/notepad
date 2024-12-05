import React from 'react'
import Layout from '../components/layout'
import type { NextPageWithLayout } from './_app'
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import Link from 'next/link'
import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { encryptData } from '@/utils/crypto';

const login: NextPageWithLayout=()=> {
    const router = useRouter();

    async function handleSubmit (event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const username = formData.get('username')
     
        const password = formData.get('password')

        const response = await fetch('/api/auth/login',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({username,  password}),
        })

        if(response.ok){
    
          const data = await response.json();
            const encryptedUsername = encryptData(data.existingUserName.username)
         
          const user={
            username: encryptedUsername,
            avatar: data.existingUserName.avatar,
          }
          localStorage.setItem('userlog', JSON.stringify(user))

            router.push('/')
        }else{

        }
        }

  return (
    <>

              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                LogIn
              </h2>
           <form onSubmit={handleSubmit}>  
<div className='gap-4 mb-4'>
<Input
            name ='username'
              type="username"
              label="username"
            
            />
</div>

          

            <div className='gap=4 mb-4'>
          <Input
        
            name ='password'
            type="Password"
            label="Password"
          
          />
             </div>
            <Button color='default' type='submit'>
                LogIn
            </Button>
            </form >
              <p className="text-xs text-gray-500 mt-3">
                Don't have an account?  <Link href="/signup">SignUp here</Link>
              </p>           
    </>
  )
}


login.getLayout = function getLayout(login) {
    return (
      <Layout>
        {login}
      </Layout>
    ) 
  }
export default login
 

//  

// this is login page    