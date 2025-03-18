import { NextResponse } from 'next/server';
import { getTodos, addTodo, updateTodo, deleteTodo } from './helpers';


export async function GET() {
  const todos = await getTodos();
  return NextResponse.json(todos);
}


export async function POST(req) {
  const { task } = await req.json();
  const newTodo = await addTodo(task);
  return NextResponse.json(newTodo, { status: 201 });
}


export async function PUT(req) {
  const { id, task, isdone } = await req.json();
  const updatedTodo = await updateTodo(id, task, isdone);
  return NextResponse.json(updatedTodo);
}


export async function DELETE(req) {
  const { id } = await req.json();
  await deleteTodo(id);
  return NextResponse.json({ message: 'Todo deleted' });
}
