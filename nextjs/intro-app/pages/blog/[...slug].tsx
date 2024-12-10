import { useRouter } from 'next/router';

export default function CatchAllRoute() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Catch-All Route</h1>
      <p>Slug: {(slug as string[]).join('/')}</p>
    </div>
  );
}
