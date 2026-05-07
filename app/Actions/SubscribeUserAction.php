<?php

declare(strict_types=1);

namespace App\Actions;

use App\Mail\SubscriptionConfirmation;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Mail;

class SubscribeUserAction
{
    public function handle(string $email): Subscriber
    {
        $subscriber = Subscriber::firstOrCreate(
            ['email' => $email],
            ['subscribed_at' => now()]
        );

        if ($subscriber->wasRecentlyCreated) {
            Mail::to($email)->send(new SubscriptionConfirmation($subscriber));
        }

        return $subscriber;
    }
}
