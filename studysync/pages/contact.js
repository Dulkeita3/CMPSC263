import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <main style={{ display: 'grid', placeItems: 'center', height: '100vh', textAlign: 'center' }}>
        <div>
          <h1>Contact Page</h1>
          <p>Contact us at example@email.com.</p>
        </div>
      </main>
    </>
  );
}
