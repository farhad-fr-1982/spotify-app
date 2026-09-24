import type { Request, Response } from "express";

export const registerUser = async(req:Request,res:Response)=>{
    res.json('Server Is Running 👍')
}