<?php

namespace App\Providers;

use App\Events\LeadRegistered;
use App\Listeners\SendNewLeadNotification;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Event::listen(LeadRegistered::class, SendNewLeadNotification::class);
    }
}
