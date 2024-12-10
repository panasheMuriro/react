export async function getServerSideProps() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts/2').then((res) => res.json());
  
    return {
      props: { post: data },
    };
  }
  
  export default function DynamicPage({ post }) {
    return (
      <div>
        <h1>Server-Side Rendering (SSR)</h1>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    );
  }
  