import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Blog Post: {id}</h1>
      <p>This is the blog post content for ID: {id}.</p>
    </div>
  );
}
