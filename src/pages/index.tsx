import { GetServerSideProps } from 'next';

interface Post {
  id: string;
  title: string;
}
interface HomeProps {
  posts: Post[];
}

export default function Home({ posts }: HomeProps) {
  //ClientSide
  // const [posts, setPosts] = useState<Post[]>([]);
  // useEffect(() => {
  //   fetch('http://localhost:8080/posts').then(response => {
  //     response.json().then(data => {
  //       setPosts(data);
  //     });
  //   });
  // }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title} </li>
        ))}
      </ul>
    </div>
  );
}

//ServerSide
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch('http://localhost:8080/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};
