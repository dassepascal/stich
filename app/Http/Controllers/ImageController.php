<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $key = config('services.unsplash.access_key');

        if (! $key) {
            return response()->json(['error' => 'UNSPLASH_ACCESS_KEY non configurée dans .env'], 503);
        }

        $query = $request->string('q', 'technology business');

        $response = Http::withHeaders(['Authorization' => "Client-ID {$key}"])
            ->get('https://api.unsplash.com/search/photos', [
                'query'       => $query,
                'per_page'    => 12,
                'orientation' => 'landscape',
            ]);

        if ($response->failed()) {
            return response()->json(['error' => 'Erreur Unsplash : ' . $response->status()], $response->status());
        }

        $photos = collect($response->json('results'))->map(fn ($p) => [
            'id'          => $p['id'],
            'thumb'       => $p['urls']['thumb'],
            'regular'     => $p['urls']['regular'],
            'download'    => $p['links']['download_location'],
            'author'      => $p['user']['name'],
            'author_link' => $p['user']['links']['html'],
            'alt'         => $p['alt_description'] ?? $p['description'] ?? '',
        ]);

        return response()->json(['photos' => $photos]);
    }

    public function store(Request $request): JsonResponse
    {
        $request->validate(['url' => ['required', 'url']]);

        $response = Http::timeout(15)->get($request->string('url'));

        if ($response->failed()) {
            return response()->json(['error' => "Impossible de télécharger l'image."], 422);
        }

        $ext      = 'jpg';
        $mimeMap  = ['image/png' => 'png', 'image/webp' => 'webp', 'image/jpeg' => 'jpg'];
        $mime     = $response->header('Content-Type');

        if ($mime && isset($mimeMap[explode(';', $mime)[0]])) {
            $ext = $mimeMap[explode(';', $mime)[0]];
        }

        $filename = 'blog/' . Str::random(20) . ".{$ext}";
        Storage::disk('public')->put($filename, $response->body());

        return response()->json([
            'path'    => $filename,
            'url'     => "/storage/{$filename}",
        ]);
    }
}
