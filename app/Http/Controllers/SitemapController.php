<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $base = rtrim(config('app.url'), '/');

        $staticPages = [
            ['loc' => $base . '/',                  'priority' => '1.0', 'changefreq' => 'weekly'],
            ['loc' => $base . '/blog',              'priority' => '0.9', 'changefreq' => 'daily'],
            ['loc' => $base . '/automatisation',    'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => $base . '/sme-solutions',     'priority' => '0.8', 'changefreq' => 'monthly'],
            ['loc' => $base . '/contact',           'priority' => '0.7', 'changefreq' => 'monthly'],
        ];

        $posts = Post::published()
            ->latest('published_at')
            ->get(['slug', 'published_at', 'updated_at']);

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

        foreach ($staticPages as $page) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$page['loc']}</loc>\n";
            $xml .= "    <changefreq>{$page['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$page['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }

        foreach ($posts as $post) {
            $loc      = $base . '/blog/' . e($post->slug);
            $lastmod  = ($post->updated_at ?? $post->published_at)->toAtomString();

            $xml .= "  <url>\n";
            $xml .= "    <loc>{$loc}</loc>\n";
            $xml .= "    <lastmod>{$lastmod}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type'  => 'application/xml; charset=UTF-8',
            'X-Robots-Tag'  => 'noindex',
        ]);
    }
}
