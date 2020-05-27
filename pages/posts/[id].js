import Head from 'next/head';
import {getAllPostIds, getPostData} from '../../lib/posts';
import Date from '../../components/date';

export default function Post({postData}) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{postData.title}</h1>
        <Date dateString={postData.date} />
        <br />
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
      </main>
    </>
  )
}

export async function getStaticProps({params}) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
