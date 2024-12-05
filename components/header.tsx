import React,{useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image';
import { decryptData } from '@/utils/crypto';


interface IUser {
  username: string;

  avatar: string;
}

export default function Header() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [img,setImg] = useState('')


  useEffect(() => {
    const getUser = () => {
      const user = localStorage.getItem('userlog');
      if (user) {
        const userData: IUser = JSON.parse(user);
        const decryptedUsername = decryptData(userData.username);
        setUsername(decryptedUsername);
        setImg(userData.avatar)
       
      }else{
        router.push('/login')
      }
    };

    getUser();
  }, []);

  return (
    <header className="w-full">
      <div className='flex justify-end items-center p-5 space-x-4'>
        <div>{username}</div>
        <div>
          <Image src={img} alt='avatar' width='40' height='40'></Image>
        </div>
      </div>
    </header>
  );
}