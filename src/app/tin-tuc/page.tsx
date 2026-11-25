'use client';

import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blogs';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeBlogPost } from '@/i18n/productLocalizer';
import styles from './tintuc.module.css';

export default function BlogListPage() {
  const { locale, t } = useLanguage();

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <span
            className="section-tag"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}
          >
            <BookOpen size={14} /> {t.blogPage.tag}
          </span>
          <h1 className={styles.pageTitle}>{t.blogPage.title}</h1>
          <p className={styles.pageDesc}>{t.blogPage.desc}</p>
        </div>
      </div>

      <div className="container">
        <div className={styles.blogGrid}>
          {blogPosts.map((rawPost) => {
            const post = localizeBlogPost(rawPost, locale);
            return (
              <div key={post.id} className={`card ${styles.card}`}>
                <div className={styles.imgWrapper}>
                  <img src={post.imageUrl} alt={post.title} className={styles.img} />
                  <span className={styles.badge}>{post.category}</span>
                </div>
                <div className={styles.body}>
                  <div className={styles.meta}>
                    <span>
                      <Calendar size={12} /> {post.publishedAt}
                    </span>
                    <span>
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <h2 className={styles.title}>
                    <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className={styles.summary}>{post.summary}</p>
                  <Link href={`/tin-tuc/${post.slug}`} className={styles.readMore}>
                    <span>{t.blogPage.readMore}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
