import { generateClient } from "aws-amplify/api";
import { createTodo } from "@/graphql/mutations";
import { listTodos } from "@/graphql/queries";
import config from "@/amplifyconfiguration.json";
import { GetServerSideProps } from "next";
import { Button, Container, TextField } from "@mui/material";
import { Amplify } from "aws-amplify";
import React, { useState } from "react";
import Layout from "@/app/layout";
import MainVisual from "@/components/pages/home/MainVisual";
import Head from "next/head";

Amplify.configure(config);

interface TodoListType {
  __typename: "Todo";
  id: string;
  name: string;
  description?: string | null | undefined;
  createdAt: string;
  updatedAt: string;
}

const client = generateClient();

export default function Home({ todos }: { todos: Array<TodoListType> }) {
  const [inputValue, setInutValue] = useState<string>("");
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInutValue(event.target.value);
  };

  async function saveTodo() {
    const { data } = await client.graphql({
      query: createTodo,
      variables: {
        input: {
          name: inputValue,
        },
      },
    });
    console.log("Created Todo: ", data?.createTodo);
  }

  return (
    <>
      <Head>
        <title>ホーム | テック教育ナビ</title>
        <meta name="description" content="ページの説明" />
        {/* その他のメタタグ */}
      </Head>
      <Layout>
        <MainVisual />
        <Container sx={{ p: 4 }}>
          <div className="mt-2">
            <TextField
              label="Todo"
              name="name"
              value={inputValue}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <Button variant="contained" type="submit" onClick={saveTodo}>
              Add
            </Button>
          </div>

          {/* 3. Handle edge cases & zero state & error states*/}
          {(!todos || todos.length === 0) && (
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
        </Container>
      </Layout>
    </>
  );
}
/**
 * サーバーサイドでのデータ取得処理を行い、クライアントにpropsとして渡す
 * @returns
 */
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { data } = await client.graphql({
      query: listTodos,
    });
    return {
      props: {
        todos: data.listTodos.items,
      },
    };
  } catch (error) {
    console.error("Error fetching todos:", error);
    // エラーハンドリングをここに追加
    return {
      props: {
        todos: [],
        error: "Failed to fetch todos.",
      },
    };
  }
};
