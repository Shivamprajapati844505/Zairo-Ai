import connectDB from '@/config/db';
import Chat from '@/models/Chat';
import { getAuth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    const {chatId} = await req.json();

      
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "User not authenticated",
      });
    }

    if (!chatId) {
      return NextResponse.json({
        success: false,
        message: "chatId is required",
      });
    }

    await connectDB();

    const deletedChat = await Chat.findOneAndDelete({ _id: chatId, userId });

    if (!deletedChat) {
      return NextResponse.json({
        success: false,
        message: "Chat not found or not authorized",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Chat Deleted successfully"
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
