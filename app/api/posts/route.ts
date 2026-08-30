import post from '@/app/data/post.json'
import { NextResponse } from 'next/server'
import { z } from "zod"

// GET ALL
export async function GET() {
    return NextResponse.json({
        data: post
    },{status:200}
    )
}
// POST
export async function POST(request: Request) {
    const PostSchema = z.object({
        task: z.string().min(1),
        completed: z.boolean()
    })
    const body = await request.json();
    const parsed = PostSchema.safeParse(body)

    if (!parsed.success) {
        return Response.json(
            { error: "Invalid input" },
            { status: 400 }
        )
    }
    const newPost = {

        id: post.length + 1,
        ...parsed.data
    }
    
    post.push(newPost);
    return NextResponse.json(newPost, { status: 201 });

}