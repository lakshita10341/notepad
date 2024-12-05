import {NextApiRequest, NextApiResponse} from 'next'
import bcrypt from 'bcrypt'
import prisma from '../../../lib/db';

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse
){
    const { username,password}= req.body;
try{
    const existingUserName = await prisma.users.findUnique({
        where: { username }
      })
  
      if (!existingUserName) {
          return res.status(400).json({ message: 'username or password is incorrect' })
      }

      const isPasswordValid = await bcrypt.compare(password, existingUserName.password);
      if(!isPasswordValid){
        return res.status(400).json({ message: 'username or password is incorrect' })
      }
   
      return res.status(201).json({existingUserName})

}catch(err){
    return res.status(500).json({message:"error occured"})
}finally{
    await prisma.$disconnect();
}
   
}
