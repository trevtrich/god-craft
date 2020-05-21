import {getAllPostIds, getPostData} from '../../lib/posts'

export default function Post({ postData }) {
  return (
    <p>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </p>
  )
}

export async function getStaticProps({params}) {
  const postData = getPostData(params.id)
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
