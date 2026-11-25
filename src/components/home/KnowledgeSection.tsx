'use client';

import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blogs';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { localizeBlogPost } from '@/i18n/productLocalizer';
import styles from './KnowledgeSection.module.css';

export const KnowledgeSection: React.FC = () => {
  const { locale, t } = useLanguage();

  return (
    <section className={styles.section} id="tin-tuc">
      <div className="container">
        <div className={styles.headerFlex}>
          <div>
            <span className="section-tag">
              <BookOpen size={14} /> {t.knowledge.tag}
            </span>
            <h2 className={styles.title}>{t.knowledge.title}</h2>
          </div>
          <Link href="/tin-tuc" className="btn btn-outline">
            <span>{t.knowledge.viewAll}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.grid}>
          {blogPosts.map((rawPost) => {
            const post = localizeBlogPost(rawPost, locale);
            return (
              <div key={post.id} className={`card ${styles.blogCard}`}>
                <div className={styles.imgWrapper}>
                  <img src={post.imageUrl} alt={post.title} className={styles.img} loading="lazy" />
                  <span className={styles.categoryBadge}>{post.category}</span>
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
                  <h3 className={styles.postTitle}>
                    <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className={styles.summary}>{post.summary}</p>
                  <Link href={`/tin-tuc/${post.slug}`} className={styles.readMore}>
                    <span>{t.knowledge.readMore}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
