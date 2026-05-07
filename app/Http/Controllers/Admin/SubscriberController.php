<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class SubscriberController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('Admin/Subscribers/Index', [
            'subscribers' => Subscriber::latest('subscribed_at')->get(),
        ]);
    }

    public function export(): Response
    {
        $subscribers = Subscriber::latest('subscribed_at')
            ->get(['email', 'subscribed_at']);

        $lines   = ["email,subscribed_at\n"];

        foreach ($subscribers as $sub) {
            $lines[] = "\"{$sub->email}\",\"{$sub->subscribed_at->toDateTimeString()}\"\n";
        }

        return response(implode('', $lines), 200, [
            'Content-Type'        => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="subscribers_' . now()->format('Y-m-d') . '.csv"',
        ]);
    }
}
