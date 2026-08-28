import { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { blogPosts } from '@/data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://palletgoviet.vn';

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/san-pham/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogPosts.map((b) => ({
    url: `${baseUrl}/tin-tuc/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/san-pham`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/bang-gia`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...productUrls,
    ...blogUrls,
  ];
}
