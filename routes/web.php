<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\SmeSolutionController;
use App\Models\Post;
use App\Models\Service;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'services'     => Service::orderBy('order')->get(),
        'latestPosts'  => Post::published()->latest('published_at')->limit(3)->get(),
    ]);
});

Route::get('/sme-solutions', [SmeSolutionController::class, 'index'])->name('sme-solutions');
Route::inertia('/automatisation', 'Automation')->name('automatisation');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::post('/leads', [LeadController::class, 'store'])->name('leads.store');

Route::post('/newsletter', [SubscriberController::class, 'store'])->name('newsletter.store');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/confidentialite', [PageController::class, 'confidentialite'])->name('confidentialite');
Route::get('/conditions', [PageController::class, 'conditions'])->name('conditions');
Route::get('/mentions-legales', [PageController::class, 'mentionsLegales'])->name('mentions-legales');

Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
Route::patch('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('services.destroy');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/services', [ServiceController::class, 'index'])->name('services.index');
});

Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('posts', Admin\PostController::class)->except(['show']);
        Route::get('/images/search', [ImageController::class, 'search'])->name('images.search');
        Route::post('/images', [ImageController::class, 'store'])->name('images.store');
        Route::get('/contacts', [Admin\ContactController::class, 'index'])->name('contacts.index');
        Route::patch('/contacts/{contact}/read', [Admin\ContactController::class, 'markAsRead'])->name('contacts.read');
        Route::delete('/contacts/{contact}', [Admin\ContactController::class, 'destroy'])->name('contacts.destroy');
        Route::get('/subscribers', [Admin\SubscriberController::class, 'index'])->name('subscribers.index');
        Route::get('/subscribers/export', [Admin\SubscriberController::class, 'export'])->name('subscribers.export');
    });

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
