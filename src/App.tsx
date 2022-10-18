import * as React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchTodo = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  await sleep(1000);
  return response.json();
};

const Todo = () => {
  const query = useQuery(["todo"], fetchTodo);

  console.log(query.data);
  return (
    <div>
      {query.data.id}: {query.data.title}
    </div>
  );
};

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <React.Suspense fallback={<div>loading...</div>}>
          <Todo />
        </React.Suspense>
      </QueryClientProvider>
    </div>
  );
}
