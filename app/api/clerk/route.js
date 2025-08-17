import {Webhook} from "svix";
import connectDB from "@/config/db";
import User from "@model/User";
import {headers} from "next/headers";
import {NextRequest} form 'next/server';

export async function POST(req){
   const wh = new Webhook(process.env.SIGNING_SECRET)
   const headerPayload = await headers()
   const svixHeaders = {
    "sxix-id": headerPayload.get("svix-id"),
    "sxix-signature": headerPayload.get("svix-signature"),
   };

   // GET the payload and verify 
   const payload = await req.json();
   const body = JSON.stringify(payload);
   const {data, type} = wh.verify(body, svixHeaders)

   //Prepare the user data to be saved in thw database
   const userData = {
    _id: data.id,
    email: data.email_addesses[0].email_addesse,
    name:`${data.first_name} ${data.last_name}`,
    image:data.image_url,
   };

   await connectDB();

   switch (type) {
    case 'user.created':
        await User.create(userData)
        break;
    case 'user.updated':
        await User.findByIdAndUpdate(data.id,userData)
        break;
    case 'user.deteted':
        await User.findByIdAndDelete(data.id)
        break;
   
    default:
        break;
   }
   return NextRequest.json({message:"Event received"});
}