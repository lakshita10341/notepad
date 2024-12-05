import React, { useState } from 'react'
import Header from '../components/header'
import { Input } from '@nextui-org/react'
import { Button } from '@nextui-org/react'

export default function CF() {
  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [maxRating, setMaxRating] = useState<number |null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.trim() === '') {
      setError('Please enter username');
      return;
    }
    fetchRating(username);
  };
 

  const fetchRating = async (username: string) => {
    try {
      setError('');
      setRating(null);
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`);
      const data = await response.json();
      

      if (data.status === 'OK'){
        const userRating = data.result[0].rating;
        const maxmRating = data.result[0].maxRating;
        setRating(userRating);
        setMaxRating(maxmRating)
      } else {
        setError('User not found');
      }
    } catch (err) {
     setError("Unexpected error occured");
    }

  }
// header

  return (
    <>
    <Header/> 

    <div className='min-h-screen w-full flex justify-center items-center'> 
      <div className='w-full max-w-md flex flex-col items-center'> 
        <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'> 
          <div className='w-full mb-4'> 
            <Input 
                  name='name' 
                  label='Enter your Codeforces username' 
                  value={username} 
                  isInvalid={error !== ''} 
                  onValueChange={(value) => { 
                  setUsername(value); 
                  setError(''); 
                  setRating(null); 
              }}
              errorMessage={error}
            />
          </div>
          <Button type='submit' className='mt-4'>Get rating</Button>
        </form>
        <div className='mt-4 text-center'>
          {rating !== null ? `Your Codeforces rating is ${rating}` : ''}
        </div>
        <div className='mt-2 text-center'>
          {maxRating !== null ? `Your maximum rating is ${maxRating}` : ''}
        </div>
      </div>
    </div>
  </>
  )
}


// 


