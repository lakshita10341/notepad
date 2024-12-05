// import { PrismaClient } from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import bcrypt from 'bcrypt'
import prisma from '../../../lib/db';
// const prisma = new PrismaClient();
export default async function signup(req: NextApiRequest, res: NextApiResponse){

    const { email, Name:username, password, base64data: avatar}= req.body;


    try {
    
        const existingUserEmail = await prisma.users.findUnique({
          where: { email }
        })
     
   
        if (existingUserEmail) {
          return res.status(400).json({ message: 'Email already exists' })
        }
     

        const existingUserName = await prisma.users.findUnique({
          where: { username }
        })
  
        if (existingUserName) {
            return res.status(400).json({ message: 'Email already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)


        await prisma.users.create({
          data: {
            username,
            email,
            password: hashedPassword,
            avatar
          }
        })
 
        return res.status(201).json({ message: 'Registration successful' })
      } catch (error) {
        console.error('Signup error:', error)
        return res.status(500).json({ message: 'Error occured during registration' })
      } finally {
        await prisma.$disconnect()
      }
    }