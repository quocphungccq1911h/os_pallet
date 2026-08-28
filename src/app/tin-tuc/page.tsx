'use client';

import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blogs';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import styles from './tintuc.module.css';

export default function BlogListPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="section-tag" style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#ffffff' }}>
            <BookOpen size={14} /> TƯ VẤN KỸ THUẬT PALLET
          </span>
          <h1 className={styles.pageTitle}>Kiến Thức Pallet & Tiêu Chuẩn Xuất Khẩu</h1>
          <p className={styles.pageDesc}>
            Tổng hợp kinh nghiệm lựa chọn pallet gỗ tràm, keo, thông và các hướng dẫn bảo quản, quy trình khử trùng ISPM 15 chuẩn quốc tế.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <div key={post.id} className={`card ${styles.card}`}>
              <div className={styles.imgWrapper}>
                <img src={post.imageUrl} alt={post.title} className={styles.img} />
                <span className={styles.badge}>{post.category}</span>
              </div>
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span><Calendar size={12} /> {post.publishedAt}</span>
                  <span><Clock size={12} /> {post.readTime}</span>
                </div>
                <h2 className={styles.title}>
                  <Link href={`/tin-tuc/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className={styles.summary}>{post.summary}</p>
                <Link href={`/tin-tuc/${post.slug}`} className={styles.readMore}>
                  <span>Xem Chi Tiết Bài Viết</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
