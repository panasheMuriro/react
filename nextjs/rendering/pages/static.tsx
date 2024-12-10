export async function getStaticProps() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.json());
  
    return {
      props: { post: data },
    };
  }
  
  export default function StaticPage({ post }) {
    return (
      <div>
        <h1>Static Site Generation (SSG)</h1>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    );
  }
  