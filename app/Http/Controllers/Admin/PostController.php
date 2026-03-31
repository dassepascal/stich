<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\CreatePostAction;
use App\Actions\UpdatePostAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Posts/Index', [
            'posts' => Post::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Posts/Create');
    }

    public function store(PostRequest $request, CreatePostAction $action): RedirectResponse
    {
        $data = $request->safe()->except(['cover_image', 'cover_image_path', 'remove_cover_image']);

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = $request->file('cover_image')->store('blog', 'public');
        } elseif ($request->filled('cover_image_path')) {
            $data['cover_image'] = $request->string('cover_image_path')->toString();
        }

        $action->handle($data);

        return redirect()->route('admin.posts.index')
            ->with('success', 'Article créé avec succès.');
    }

    public function edit(Post $post): Response
    {
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post,
        ]);
    }

    public function update(PostRequest $request, Post $post, UpdatePostAction $action): RedirectResponse
    {
        $data = $request->safe()->except(['cover_image', 'cover_image_path', 'remove_cover_image']);

        if ($request->hasFile('cover_image')) {
            $this->deleteImage($post->cover_image);
            $data['cover_image'] = $request->file('cover_image')->store('blog', 'public');
        } elseif ($request->filled('cover_image_path')) {
            $this->deleteImage($post->cover_image);
            $data['cover_image'] = $request->string('cover_image_path')->toString();
        } elseif ($request->boolean('remove_cover_image')) {
            $this->deleteImage($post->cover_image);
            $data['cover_image'] = null;
        }

        $action->handle($post, $data);

        return redirect()->route('admin.posts.index')
            ->with('success', 'Article mis à jour.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $this->deleteImage($post->cover_image);
        $post->delete();

        return redirect()->route('admin.posts.index')
            ->with('success', 'Article supprimé.');
    }

    private function deleteImage(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
