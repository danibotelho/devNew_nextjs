import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface Comment {
  id: string;
  body: string;
}

interface CommentsProps {
  comments: Comment[];
}
export default function Post({ comments }: CommentsProps) {
  const router = useRouter();
  return (
    <div>
      <h1>Post {router.query.id}</h1>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:8080/posts');
  const posts = await res.json();

  const paths = posts.map(post => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CommentsProps> = async context => {
  const { id } = context.params;
  const response = await fetch(`http://localhost:8080/comments?postId=${id}`);
  const comments = await response.json();

  return {
    props: {
      comments,
    },
    revalidate: 5, // In seconds
  };
};
