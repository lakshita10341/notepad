import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function note(req: NextApiRequest, res: NextApiResponse) {
    const {username,title, content} = req.body;
    
try{
    const existingUser = await prisma.users.findUnique({
        where: {username}
    })

    if(existingUser){
        await prisma.notes.create({
data:{
    user_id: existingUser.id,
    title: title,
    note: content,
}
        })
        return res.status(201).json({message: 'Note added successfully'})
    }else{
        return res.status(400).json({message: 'Error in fetching details'})
    }
}catch(error){
    return res.status(500).json({message:'some unexpected error occured'})
}finally{
    await prisma.$disconnect()
}


}
