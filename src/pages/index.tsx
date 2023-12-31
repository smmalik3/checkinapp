import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify, API, withSSRContext } from 'aws-amplify'
import Head from 'next/head'
import awsExports from '../aws-exports'
import { createTodo } from '../graphql/mutations'
import { listTodos } from '../graphql/queries'
import {
  CreateTodoInput,
  CreateTodoMutation,
  ListTodosQuery,
  Todo,
} from '../API'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import styles from '../styles/Home.module.css'
// Place this at the top of your entry file, e.g., _app.js or index.js
// global.Headers = global.Headers || require('node-fetch').Headers;

Amplify.configure({ ...awsExports, ssr: true })

export default function Home({ todos = [] }: { todos: Todo[] }) {
  const router = useRouter()

  async function handleCreateTodo(event) {
    event.preventDefault()

    const form = new FormData(event.target)

    try {
      const createInput: CreateTodoInput = {
        name: form.get('title').toString(),
        description: form.get('content').toString(),
      }

      const request = (await API.graphql({
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        query: createTodo,
        variables: {
          input: createInput,
        },
      })) as { data: CreateTodoMutation; errors: any[] }

      router.push(`/todo/${request.data.createTodo.id}`)
    } catch ({ errors }) {
      console.error(...errors)
      throw new Error(errors[0].message)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Check In App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Check In App</h1>

        <p className={styles.description}>
          <code className={styles.code}>{todos.length}</code>
          Todos
        </p>

        <div className={styles.grid}>
          {todos.map((todo) => (
            <a href={`/todo/${todo.id}`} key={todo.id}>
              <h3>{todo.name}</h3>
              <p>{todo.description}</p>
            </a>
          ))}

          <div className={styles.card}>
            <h3 className={styles.title}>New Todo</h3>

            <Authenticator>
              {({ signOut }) => (
                <form onSubmit={handleCreateTodo}>
                  <fieldset>
                    <legend>Title</legend>
                    <input
                      defaultValue={`Today, ${new Date().toLocaleTimeString()}`}
                      name="title"
                    />
                  </fieldset>

                  <fieldset>
                    <legend>Content</legend>
                    <textarea
                      defaultValue="I built an Amplify app with Next.js!"
                      name="content"
                    />
                  </fieldset>

                  <button>Create Todo</button>
                  <button type="button" onClick={signOut}>
                    Sign out
                  </button>
                </form>
              )}
            </Authenticator>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const SSR = withSSRContext({ req })

  const response = (await SSR.API.graphql({ query: listTodos })) as {
    data: ListTodosQuery
  }

  return {
    props: {
      todos: response.data.listTodos.items,
    },
  }
}
