'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blogs';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeBlogPost } from '@/i18n/productLocalizer';
import styles from './post.module.css';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { locale, t } = useLanguage();

  const rawPost = blogPosts.find((b) => b.slug === slug);

  if (!rawPost) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>{t.blogPage.notFound}</h2>
        <Link href="/tin-tuc" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          {t.blogPage.backList}
        </Link>
      </div>
    );
  }

  const post = localizeBlogPost(rawPost, locale);

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/">{t.common.home}</Link>
          <span>/</span>
          <Link href="/tin-tuc">{t.blogPage.crumbList}</Link>
          <span>/</span>
          <span className={styles.activeCrumb}>{post.title}</span>
        </div>

        <article className={styles.articleCard}>
          <div className={styles.header}>
            <span className="section-tag">{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span>
                <Calendar size={14} /> {t.blogPage.publishedAt} {post.publishedAt}
              </span>
              <span>
                <Clock size={14} /> {t.blogPage.readTime} {post.readTime}
              </span>
            </div>
          </div>

          <div className={styles.featuredImgWrapper}>
            <img src={post.imageUrl} alt={post.title} className={styles.featuredImg} />
          </div>

          <div
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.footerBar}>
            <Link href="/tin-tuc" className="btn btn-outline">
              <ArrowLeft size={16} /> {t.blogPage.otherPosts}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
