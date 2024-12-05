import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/db';

export default async function getNote(
    req: NextApiRequest,
     res: NextApiResponse
){
    const {username} =  req.body;

try{
    const existingUser = await prisma.users.findUnique({
        where: {username}
    })

    if(existingUser){
      const notes = await prisma.notes.findMany({
    where:{
        user_id: existingUser.id,
    }
      })
        return res.status(201).json({notes})
    }else{
        return res.status(400).json({message: 'Error in fetching details'})
    }
}catch(error){
    return res.status(500).json({message:'some unexpected error occured'})
}finally{
    await prisma.$disconnect()
}


}