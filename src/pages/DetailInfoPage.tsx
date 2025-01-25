import { useParams } from 'react-router-dom';

export default function DetailInfoPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <section>
      <h1>Detail Info Page</h1>
      <p>Art ID: {id}</p>
    </section>
  );
}
