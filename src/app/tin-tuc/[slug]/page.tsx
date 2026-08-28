'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '@/data/blogs';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import styles from './post.module.css';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const post = blogPosts.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="container" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <h2>Không Tìm Thấy Bài Viết</h2>
        <Link href="/tin-tuc" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Quay Lại Danh Sách
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <div className={styles.breadcrumb}>
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/tin-tuc">Tin tức & Kiến thức</Link>
          <span>/</span>
          <span className={styles.activeCrumb}>{post.title}</span>
        </div>

        <article className={styles.articleCard}>
          <div className={styles.header}>
            <span className="section-tag">{post.category}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.meta}>
              <span><Calendar size={14} /> Ngày đăng: {post.publishedAt}</span>
              <span><Clock size={14} /> Thời gian: {post.readTime}</span>
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
              <ArrowLeft size={16} /> Xem Các Bài Viết Khác
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
