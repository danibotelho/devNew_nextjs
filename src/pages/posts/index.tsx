import { GetStaticProps } from 'next';

interface Post {
  id: string;
  title: string;
}
interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <div>
      <h1>Listagem de Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const res = await fetch('http://localhost:8080/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 5, // In seconds
  };
};
