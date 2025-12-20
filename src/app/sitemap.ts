import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.diocesededoumeabong-mbang.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return [
        {
            url: `${BASE_URL}/`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/diocese`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/zones-pastorales`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/ouvriers-apostoliques`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/activites-pastorales`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contacts`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.7,
        },
    ];
}
