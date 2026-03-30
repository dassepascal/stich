<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\LeadRegistered;
use App\Notifications\NewLeadNotification;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class SendNewLeadNotification
{
    public function handle(LeadRegistered $event): void
    {
        Log::info('New lead registered', [
            'email'      => $event->lead->email,
            'ip_address' => $event->lead->ip_address,
        ]);

        // Envoie une notification mail à l'admin (configuré via ADMIN_EMAIL dans .env)
        $adminEmail = config('app.admin_email');
        if ($adminEmail) {
            Notification::route('mail', $adminEmail)
                ->notify(new NewLeadNotification($event->lead));
        }
    }
}
