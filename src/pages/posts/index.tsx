import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import Link from 'next/link';
import SEO from '../../components/SEO';
import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import styles from './posts.module.scss';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}

interface PrismicDocumentTitle {
  type: string;
  text: string;
}

interface PrismicDocumentContent {
  type: string;
  text: string;
}

interface PrismicDocument {
  uid: string;
  last_publication_date: string;
  data: {
    title: PrismicDocumentTitle[];
    content: PrismicDocumentContent[];
  };
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <SEO title="Posts" />
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.predicates.at('document.type', 'post')],
    {
      fetch: ['post.title', 'post.content'],
    },
  );

  const posts = response.results.map(post => {
    const document = post as PrismicDocument;
    return {
      slug: post.uid,
      title: RichText.asText(document.data.title),
      excerpt:
        document.data.content.find(content => content.type === 'paragraph')
          ?.text ?? '',
      updatedAt: format(
        new Date(post.last_publication_date),
        "d 'de' MMMM 'de' yyyy",
        { locale: ptBR },
      ),
    };
  });

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 12, // 12 HORAS
  };
};
