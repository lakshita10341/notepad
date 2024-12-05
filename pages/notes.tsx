import React, { FormEvent, useEffect, useState } from 'react'
import Header from '../components/header'
import { Card,  CardBody, Button, Input, Textarea} from "@nextui-org/react";
import {Accordion, AccordionItem} from "@nextui-org/react";
import { decryptData } from '@/utils/crypto';

interface Post {
  id: number;
  user_id: number;
  title: string;
  note: string;
}

interface PostsObject {
  notes: Post[];
}

function notes() {
const [title, settitle]= useState('');
const [content, setContent] = useState('')
const [error,setError] = useState('')
const [username, setUsername] = useState<string | null>(null);
const [posts, setPosts] = useState<Post[]>([]);

useEffect(() => {
  const user = localStorage.getItem('userlog');
 if (user) {
 const userData = JSON.parse(user);
 const decryptedUsername = decryptData(userData.username)
 setUsername(decryptedUsername);
 getPosts(decryptedUsername)
  }
  }, []);

 
  // }, [username]);
  const getPosts = async(username: string)=>{
    const response = await fetch('/api/notes/getNote',{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({username}),
    })
  if(response.ok){
    const fetchedPosts: PostsObject = await response.json();
    console.log('Fetched posts:', fetchedPosts);
  
    setPosts(fetchedPosts.notes);
  
  }
  }




 async function saveNote(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
        if (title===''){
        setError('please enter title');
}else if(content === ''){
  setError('please enter content')
}else{
  const post = await fetch('/api/notes/note',{
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({username, title, content}),
  })

  if(post.ok){
    setContent('');
    settitle('');
  if(username){
    getPosts(username);
  }
  }
}
  }


  return (
    <>
    <Header/>
    <Card className="min-h-screen m-auto">
      <CardBody>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
            <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
              
 {posts.length>0 ?(

  <Accordion variant='splitted'>
 {Object.entries(posts).map(([id, post]) => (
      
         <AccordionItem key={id} title={post.title}>
         {post.note}
         </AccordionItem>
        
    
     ))}
  </Accordion>


    ):
      (
        <div>
          <h1 className="title-font font-medium text-3xl text-white">
                Welcome to Notepad!
              </h1>
              <p className="leading-relaxed mt-4 text-white">
               Save your Important notes here
              </p> 
        </div>
      )}
    

            </div>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
               Add your notes here
              </h2>
           <form onSubmit={saveNote}>  
<div className='gap-4 mb-4'>
<Input           
              label="Title"
              value={title}
              onValueChange={settitle}
            
            />
</div>
<div className='mb-4'>
                    <Textarea
                      label="Note"
                      type='text'
                      value={content}
                      placeholder="Enter your note here"
                      minRows={4}
                      maxRows={8}
                      onValueChange={setContent}
                    />
                  </div>
          

            <Button color='default' type='submit'>
                SaveNote
            </Button>
            <div>{error}</div>
            </form >
            </div>
          </div>
        </section>
      </CardBody>
    </Card>

    </>
  )
}

export default notes