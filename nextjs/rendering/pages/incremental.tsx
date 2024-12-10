export async function getStaticProps() {
    const data = await fetch('https://jsonplaceholder.typicode.com/posts/1').then((res) => res.json());
  
    return {
      props: { post: data, timestamp: new Date().toLocaleString() },
      revalidate: 10, // Revalidate the page every 10 seconds
    };
  }
  
  export default function ISRPage({ post, timestamp }) {
    return (
      <div>
        <h1>Incremental Static Regeneration (ISR)</h1>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <small>Last regenerated at: {timestamp}</small>
      </div>
    );
  }
  