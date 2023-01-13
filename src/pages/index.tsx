import SEO from '../components/SEO';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <>
      <SEO title="Dev News!" excludeTitleSuffix />
      <main className={styles.content}>
        <section className={styles.section}>
          <span>Olá Dev!</span>
          <h1>
            Bem-vindo e bem-vinda <br />
            ao <span>Dev</span>News!
          </h1>
          <p>
            Um blog com conteúdos extremamente <br />
            <span>relevantes para o seu aprendizado.</span>
          </p>
        </section>
        <img src="/home.svg" alt="Home image" />
      </main>
    </>
  );
}

//ClientSide
// const [posts, setPosts] = useState<Post[]>([]);
// useEffect(() => {
//   fetch('http://localhost:8080/posts').then(response => {
//     response.json().then(data => {
//       setPosts(data);
//     });
//   });
// }, []);

//ServerSide
// export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
//   const res = await fetch('http://localhost:8080/posts');
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// };
