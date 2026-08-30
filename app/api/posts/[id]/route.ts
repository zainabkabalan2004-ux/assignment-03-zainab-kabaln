import post from '@/app/data/post.json'
import { NextResponse } from 'next/server'
import { z } from "zod"
// PATCH
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> })
{
    const { id: idValid } = await params;
    const id = Number(idValid);

    if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json(
            { error: "Invalid task ID" },
            { status: 400 }
        );
    }
    const Post = post.find((p) => p.id === Number(id));
    const body = await request.json();
    if (!body) {
        return Response.json(
            { error: "Task not found" },
            { status: 404 }
        )
    }
    const PostSchema = z.object({
        task: z.string().min(1).optional(),
        completed: z.boolean().optional()
    })
    const parsed = PostSchema.safeParse(body)
    if (!parsed.success) {
        return Response.json(
            { error: "Invalid input" },
            { status: 400 }
        )
    }
    else if (!Post) {
        return Response.json(
            { error: "Task not found" },
            { status: 404 }
        )
    }
    if (parsed.data.task !== undefined) {
        Post.task = parsed.data.task;
    }
    if (parsed.data.completed !== undefined) {
        Post.completed = parsed.data.completed;
    }
    return NextResponse.json(Post, { status: 200 });
}
//GETID
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> })
{
    const { id: idValid } = await params;
    const id = Number(idValid);

    if (!Number.isInteger(id) || id <= 0) {
        return NextResponse.json(
            { error: "Invalid task ID" },
            { status: 400 }
        );
    }
    const Post = post.find((p)=>p.id === Number(id));
    if (!Post) {
        return Response.json({ error: "Task not found" }, { status: 404 })
    }
    return NextResponse.json(Post);
}
//DELETE

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const Post = post.find((p) => p.id === Number(id));

    const index = post.findIndex((p) => p.id === Number(id));

    if (index === -1) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    const deletedPost = post.splice(index, 1)[0];
    return NextResponse.json({ message: "Deleted", post: deletedPost }, { status: 200 });
}