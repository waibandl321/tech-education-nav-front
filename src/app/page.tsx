import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import * as mutations from "@/graphql/mutations";
import * as queries from "@/graphql/queries";
import config from "@/amplifyconfiguration.json";
import { Button, TextField } from "@mui/material";

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
    <div>
      <form action={createTodo}>
        <div className="mt-2">
          <TextField label="Todo" name="name" />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Add
          </Button>
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
  );
}
