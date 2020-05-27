import {getAllPostIds, getPostData} from '../../lib/posts';
import Date from '../../components/date';

export default function Post({ postData }) {
  return (
    <>
      <h1>{postData.title}</h1>
      <Date dateString={postData.date} />
      <br />
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
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
