<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\CreatePostAction;
use App\Actions\UpdatePostAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
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
        $action->handle($request->validated());

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
        $action->handle($post, $request->validated());

        return redirect()->route('admin.posts.index')
            ->with('success', 'Article mis à jour.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('admin.posts.index')
            ->with('success', 'Article supprimé.');
    }
}
