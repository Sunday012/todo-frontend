import { useEffect, useState, Suspense, useContext } from "react";
import { TodoCard } from "./todocard";
import { EmptyTodo } from "./emptytodo";
import { AuthContext } from "@/context/authContext";
import { CreateTodo } from "./create-todo";
type TodoProps = {
  todo_id: number;
  todo_name?: string;
  description: string;
  title: string;
  deadline: string;
  start_date: string;
  deadline_time: string;
};

export default function Todo(){
  const {auth} = useContext(AuthContext)
  const {token} = auth;
  if(!token){
    window.location.href = "/login"
  }

  return(
    <div>
      <ListTodo />
    </div>
  )
}

function ListTodo() {
  const [todos, setTodos] = useState<any>([]);
//   const setTodosWithType: React.Dispatch<SetStateAction<any[] | never[]>> = setTodos;
  const {rows} = todos;
  const {getTodo, todo, auth} = useContext(AuthContext)
  const {loading} = auth;
  const getTodos = async () => {
    try {
        await getTodo();
      // console.log(data)
      if(todo){
        setTodos(todo);
      }
      
    //   console.log([data]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, [getTodo, todo]);

if(loading){
  return(
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
  )
}

  if (rows && rows.length > 0) {
    console.log(todos)
    return (
      <div className="w-full flex items-center justify-center mt-10">
        {/* <EmptyTodo /> */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-2 w-[80%]">
          {rows
            ? rows.map((todo: TodoProps) => (
                <div key={todo.todo_id}>
                  <Suspense fallback={<TodoCard.Skeleton />}>
                    <TodoCard
                      description={todo.description}
                      id={todo.todo_id}
                      title={todo.title}
                      deadline={todo.deadline}
                      start_date={todo.start_date}
                      deadline_time={todo.deadline_time}
                    //   setTodos={setTodos}
                      todos={todos}
                    />
                  </Suspense>
                </div>
              ))
            : null}
            <CreateTodo />
        </div>
      </div>
    );
  }

  if(rows && rows.length == 0){
    return (
        <EmptyTodo />
    );
  }
}


