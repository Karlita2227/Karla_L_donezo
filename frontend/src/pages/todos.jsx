import { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import getAxiosClient from "../axios-instance";

export default function Todos() {
  const modalRef = useRef();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  // 🔁 Fetch todos from backend
  const { data: todos, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const axiosInstance = await getAxiosClient();
      const { data } = await axiosInstance.get("http://localhost:8080/todos");
      return data;
    },
  });

  // ➕ Add new todo to backend
  const { mutate: createNewTodo } = useMutation({
    mutationKey: ["newTodo"],
    mutationFn: async (newTodo) => {
      const axiosInstance = await getAxiosClient();
      const { data } = await axiosInstance.post("http://localhost:8080/todos", newTodo);
      return data;
    },
    onSuccess: () => {
      refetch(); // refresh todo list
      modalRef.current.close(); // close modal
      reset(); // clear form
    },
    onError: (error) => {
      console.error("❌ Error creating todo:", error);
    },
  });

  // 📤 Submit form handler
  const onSubmit = (data) => {
    console.log("Creating todo:", data);
    createNewTodo(data);
  };

  // 🧩 Toggle modal open/close
  const toggleNewTodoModal = () => {
    if (modalRef.current.open) {
      modalRef.current.close();
    } else {
      modalRef.current.showModal();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Todos Dashboard</h2>

      {/* ➕ New Todo Button */}
      <button className="btn btn-primary mb-4" onClick={toggleNewTodoModal}>
        New Todo
      </button>

      {/* 📋 Todo List */}
      <ul className="space-y-2">
        {todos?.map((todo) => (
          <li key={todo.id} className="border p-4 rounded">
            <h4 className="font-bold">{todo.name}</h4>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>

      {/* 📝 Modal Form */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">New Todo</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="form-control w-full">
              <span className="label-text">Name of Todo</span>
              <input
                {...register("name")}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text">Description</span>
              <input
                {...register("description")}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </label>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Create Todo
              </button>
              <button type="button" className="btn btn-ghost" onClick={toggleNewTodoModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}
