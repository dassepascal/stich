<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use function Pest\Laravel\{get, actingAs};

uses(RefreshDatabase::class);

// ── Public ────────────────────────────────────────────────────────────────────

it('renders the blog index page', function () {
    get('/blog')->assertStatus(200);
});

it('passes published posts to the blog index', function () {
    Post::factory()->published()->count(3)->create();
    Post::factory()->create(['is_published' => false]);

    get('/blog')->assertInertia(fn (Assert $page) => $page
        ->component('Blog/Index')
        ->has('posts', 3)
    );
});

it('renders a published post page', function () {
    $post = Post::factory()->published()->create(['slug' => 'mon-article-test']);

    get('/blog/mon-article-test')->assertStatus(200)->assertInertia(fn (Assert $page) => $page
        ->component('Blog/Show')
        ->where('post.slug', 'mon-article-test')
    );
});

it('returns 404 for an unpublished post', function () {
    Post::factory()->create(['slug' => 'brouillon', 'is_published' => false]);

    get('/blog/brouillon')->assertStatus(404);
});

// ── Admin security ────────────────────────────────────────────────────────────

it('guests cannot access admin posts', function () {
    get('/admin/posts')->assertRedirect('/login');
});

it('non-admin users cannot access admin posts', function () {
    $user = User::factory()->create();

    actingAs($user)->get('/admin/posts')->assertStatus(403);
});

// ── Admin CRUD ────────────────────────────────────────────────────────────────

it('admin can view the posts list', function () {
    $admin = User::factory()->admin()->create();
    Post::factory()->count(2)->create();

    actingAs($admin)->get('/admin/posts')->assertStatus(200)->assertInertia(fn (Assert $page) => $page
        ->component('Admin/Posts/Index')
        ->has('posts', 2)
    );
});

it('admin can create a post', function () {
    $admin = User::factory()->admin()->create();

    actingAs($admin)->post('/admin/posts', [
        'title'        => 'Mon Premier Article',
        'content'      => '<p>Contenu riche en HTML.</p>',
        'excerpt'      => 'Un bref résumé.',
        'cover_image'  => null,
        'is_published' => false,
    ])->assertRedirect();

    $this->assertDatabaseHas('posts', [
        'title' => 'Mon Premier Article',
        'slug'  => 'mon-premier-article',
    ]);
});

it('auto-generates slug from title if not provided', function () {
    $admin = User::factory()->admin()->create();

    actingAs($admin)->post('/admin/posts', [
        'title'        => 'Automatisation & IA pour PME',
        'content'      => '<p>Corps du texte.</p>',
        'is_published' => false,
    ]);

    $this->assertDatabaseHas('posts', ['slug' => 'automatisation-ia-pour-pme']);
});

it('admin can update a post', function () {
    $admin = User::factory()->admin()->create();
    $post  = Post::factory()->create(['title' => 'Titre initial']);

    actingAs($admin)->patch("/admin/posts/{$post->id}", [
        'title'        => 'Titre mis à jour',
        'content'      => '<p>Nouveau contenu.</p>',
        'is_published' => true,
    ])->assertRedirect();

    $this->assertDatabaseHas('posts', ['title' => 'Titre mis à jour']);
});

it('admin can delete a post', function () {
    $admin = User::factory()->admin()->create();
    $post  = Post::factory()->create();

    actingAs($admin)->delete("/admin/posts/{$post->id}")->assertRedirect();

    $this->assertDatabaseMissing('posts', ['id' => $post->id]);
});

it('admin can upload a cover image when creating a post', function () {
    Storage::fake('public');
    $admin = User::factory()->admin()->create();
    $file  = UploadedFile::fake()->image('cover.jpg', 800, 450);

    actingAs($admin)->post('/admin/posts', [
        'title'        => 'Article avec image',
        'content'      => '<p>Contenu.</p>',
        'is_published' => false,
        'cover_image'  => $file,
    ])->assertRedirect();

    $post = Post::where('title', 'Article avec image')->first();
    expect($post->cover_image)->not->toBeNull();
    Storage::disk('public')->assertExists($post->cover_image);
});

it('deletes old image when a new one is uploaded', function () {
    Storage::fake('public');
    $admin   = User::factory()->admin()->create();
    $oldFile = UploadedFile::fake()->image('old.jpg');
    $oldPath = $oldFile->store('blog', 'public');
    $post    = Post::factory()->create(['cover_image' => $oldPath]);

    $newFile = UploadedFile::fake()->image('new.jpg');
    actingAs($admin)->patch("/admin/posts/{$post->id}", [
        'title'       => $post->title,
        'content'     => $post->content,
        'cover_image' => $newFile,
    ]);

    Storage::disk('public')->assertMissing($oldPath);
    Storage::disk('public')->assertExists(Post::find($post->id)->cover_image);
});

it('deletes image when post is destroyed', function () {
    Storage::fake('public');
    $admin   = User::factory()->admin()->create();
    $file    = UploadedFile::fake()->image('cover.jpg');
    $path    = $file->store('blog', 'public');
    $post    = Post::factory()->create(['cover_image' => $path]);

    actingAs($admin)->delete("/admin/posts/{$post->id}");

    Storage::disk('public')->assertMissing($path);
});

it('rejects a cover image over 2MB', function () {
    Storage::fake('public');
    $admin   = User::factory()->admin()->create();
    $bigFile = UploadedFile::fake()->image('big.jpg')->size(3000);

    actingAs($admin)->post('/admin/posts', [
        'title'       => 'Test',
        'content'     => '<p>.</p>',
        'cover_image' => $bigFile,
    ])->assertSessionHasErrors('cover_image');
});

it('store rejects a post without title', function () {
    $admin = User::factory()->admin()->create();

    actingAs($admin)->post('/admin/posts', [
        'content' => '<p>Contenu sans titre.</p>',
    ])->assertSessionHasErrors('title');
});
