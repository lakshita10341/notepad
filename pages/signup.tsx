import React from 'react'
import Layout from '../components/layout'
import type { NextPageWithLayout } from './_app'
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/react";
import Link from 'next/link'
import { FormEvent } from 'react'
import { useRouter } from 'next/router'
import { useState} from 'react';
import { encryptData } from '../utils/crypto';

const signup: NextPageWithLayout=()=> {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [Name, setName]= useState('')

  
    const [password, setPassword] = useState('')
    // const [count,setCount] = useState(0)




    const setImage = async()=>{
      try{
        const randomNum = Math.floor(Math.random()*10000 + 1);
        const fetchImage =  await fetch(`https://api.multiavatar.com/${randomNum}.png`,{
          method: 'GET',
        })
        const imageBlob:Blob = await fetchImage.blob();
      
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
        
          handleFormSubmission(base64data)
          
        }
        reader.readAsDataURL(imageBlob);
     
      }catch(err){

      }
    
    }
    
    const validateEmail = (email:string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  
    const isInvalidEmail = React.useMemo(() => {
      if (email === "") return true;
  
      return validateEmail(email) ? false : true;
    }, [email]);

const validateName = (Name:string)=> Name.match(/^[A-Za-z0-9_]+$/);
const isInvalidName = React.useMemo(()=>{
    if(Name ==='' ) return true;

    return validateName(Name) ? false : true;
},[Name])



const validatePwd =(password: string)=>password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);

const isInvalidPwd= React.useMemo(()=>{
  if(password==='') return true;

  return validatePwd(password)?false : true;
},[password])

const handleFormSubmission = async(base64data: string)=>{
 
if(!(isInvalidEmail || isInvalidName || isInvalidPwd)){
  const response = await fetch('/api/auth/signup',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, Name, password, base64data}),
})
if(response.ok){
const encryptedUsername = encryptData(Name)
  const user={
username : encryptedUsername,
  
    avatar: base64data,
  }

 localStorage.setItem("userlog",JSON.stringify(user));
    router.push('/')
}else{
  
  console.log("error");

}
}else{
  console.log("not valid")
}

}


    async function handleSubmit(event:FormEvent<HTMLFormElement>) {
        event.preventDefault();
 
      await setImage();

     
        }

  return (
    <>

              <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                Sign Up
              </h2>
           <form onSubmit={handleSubmit}>  
<div className='gap-4 mb-4'>
<Input
     
      value={email}
      type="email"
      label="Email"
      isInvalid={isInvalidEmail}
      color={isInvalidEmail ? "danger" : "success"}
      errorMessage="Please enter a valid email"
      onValueChange={setEmail}
    />
</div>
<div className='gap-4 mb-4'>
<Input

      value={Name}
      type="Name"
      label="Name" 
      isInvalid={isInvalidName}
      color={isInvalidName  ? "danger" : "success"}
      errorMessage="Name must contain only letters, digits and _"
      onValueChange={setName}
    
    />
</div>          

            
            <div className='gap=4 mb-4'>
          <Input  
         
            value ={password}       
            type="Password"
            label="Password"
            color={isInvalidPwd? "danger" : "success"}
            errorMessage="Password must be 8 characters long"
            onValueChange={setPassword}  
          />
          
             </div>
            <Button type='submit' color='default'>
                SignUp
            </Button>
            </form >
              <p className="text-xs text-gray-500 mt-3">
                Already have an account?  <Link href="/login">Login here</Link>
              </p>    
            
              

    </>
  )
}

signup.getLayout = function getLayout(signup) {
    return (
      <Layout>
        {signup}
      </Layout>
      
    )
  }
export default signup