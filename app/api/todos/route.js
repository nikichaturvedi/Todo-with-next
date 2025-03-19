import { connectToDatabase } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const todos = await Todo.find({});
  return NextResponse.json(todos);
}

export async function POST(req) {
  await connectToDatabase();
  const { task } = await req.json();
  const newTodo = await Todo.create({ task });
  return NextResponse.json(newTodo, { status: 201 });
}

export async function PUT(req) {
  await connectToDatabase();
  const { id, task, isdone } = await req.json();
  const updatedTodo = await Todo.findByIdAndUpdate(id, { task, isdone }, { new: true });
  return NextResponse.json(updatedTodo);
}

export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();
  await Todo.findByIdAndDelete(id);
  return NextResponse.json({ message: "Todo deleted" });
}
