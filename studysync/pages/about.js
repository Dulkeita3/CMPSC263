import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <main style={{ display: 'grid', placeItems: 'center', height: '100vh', textAlign: 'center' }}>
        <div>
          <h1>About Page</h1>
          <p>Welcome to the About page. More content coming soon!</p>
        </div>
      </main>
    </>
  );
}
