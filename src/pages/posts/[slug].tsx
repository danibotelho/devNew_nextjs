import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import SEO from '../../components/SEO';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
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
  data: {
    title: PrismicDocumentTitle[];
    content: PrismicDocumentContent[];
  };
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SEO title="Post" />

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('post', String(slug), {});
  const document = response as PrismicDocument;

  const post = {
    slug,
    title: RichText.asText(document.data.title),
    content: RichText.asHtml(document.data.content),
    updatedAt: format(
      new Date(response.last_publication_date),
      "d 'de' MMMM 'de' yyyy",
      { locale: ptBR },
    ),
  };

  return {
    props: { post },
    revalidate: 60 * 60 * 12, // 12 horas
  };
};
