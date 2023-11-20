import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import * as mutations from "@/graphql/mutations";
import * as queries from "@/graphql/queries";
import config from "@/amplifyconfiguration.json";

export const cookiesClient = generateServerClientUsingCookies({
  config,
  cookies,
});

async function createTodo(formData: FormData) {
  "use server";
  const { data } = await cookiesClient.graphql({
    query: mutations.createTodo,
    variables: {
      input: {
        name: formData.get("name")?.toString() ?? "",
      },
    },
  });
  console.log("Created Todo: ", data?.createTodo);
  revalidatePath("/");
}

export default async function Home() {
  // fetch data
  const { data, errors } = await cookiesClient.graphql({
    query: queries.listTodos,
  });
  const todos = data.listTodos.items;

  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <form action={createTodo}>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add
            </button>
          </div>
        </form>
        {/* 3. Handle edge cases & zero state & error states*/}
        {(!todos || todos.length === 0 || errors) && (
          <div>
            <p>No todos, please add one.</p>
          </div>
        )}

        {/* 4. Display todos*/}
        <ul>
          {todos.map((todo) => {
            return <li key={todo.id}>{todo.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
