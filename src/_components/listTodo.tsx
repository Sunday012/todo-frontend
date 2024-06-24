import { useEffect, useState, Suspense, useContext } from "react";
import { TodoCard } from "./todocard";
import { EmptyTodo } from "./emptytodo";
import { AuthContext } from "@/context/authContext";
import { CreateTodo } from "./create-todo";

export default function Todo() {
    const { auth } = useContext(AuthContext);
    const { token } = auth;

    useEffect(() => {
        if (!token) {
            window.location.href = "/login";
        }
    }, [token]);

    return (
        <div>
            <ListTodo />
        </div>
    );
}

function ListTodo() {
    const [todos, setTodos] = useState<any>([]);
    const { getTodo, todo, auth } = useContext(AuthContext);
    const { loading} = auth;

    useEffect(() => {
        getTodo();
    }, []);

    useEffect(() => {
        if (todo) {
            setTodos(todo);
        }
    }, [todo]);

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center mt-10">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2 w-[80%]">
                    <TodoCard.Skeleton />
                    <TodoCard.Skeleton />
                    <TodoCard.Skeleton />
                    <TodoCard.Skeleton />
                    <TodoCard.Skeleton />
                    <TodoCard.Skeleton />
                </div>
            </div>
        );
    }

    const { rows } = todos;

    if (rows && rows.length > 0) {
        return (
            <div className="w-full flex items-center justify-center mt-10">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2 w-[80%]">
                    {rows.map((todo: any) => (
                        <div key={todo.todo_id}>
                            <Suspense fallback={<TodoCard.Skeleton />}>
                                <TodoCard
                                    description={todo.description}
                                    id={todo.todo_id}
                                    title={todo.title}
                                    deadline={todo.deadline}
                                    start_date={todo.start_date}
                                    deadline_time={todo.deadline_time}
                                    todos={todos}
                                />
                            </Suspense>
                        </div>
                    ))}
                    <CreateTodo />
                </div>
            </div>
        );
    }

    if (rows && rows.length === 0) {
        return <EmptyTodo />;
    }
}
