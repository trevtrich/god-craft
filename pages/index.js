import Head from 'next/head';
import Link from 'next/link';
import {getSortedPostsData} from '../lib/posts';
import Date from '../components/date';

export default function Home({allPosts}) {
  return (
    <div className="container">
      <Head>
        <title>God-Craft</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to God-Craft
        </h1>

        <p className="description">
          Here will eventually be an indicator as to what this is.
        </p>

        <section>
          <h2>Recent Posts</h2>
          <ul>
            {allPosts.map(({id, date, title}) => (
              <li key={id}>
                <article>
                  <Link href="/posts/[id]" as={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <Date dateString={date} />
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export async function getStaticProps() {
  const allPosts = getSortedPostsData()
  return {
    props: {
      allPosts
    }
  }
}
