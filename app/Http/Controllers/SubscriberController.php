<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\SubscribeUserAction;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    public function store(Request $request, SubscribeUserAction $action): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'max:255'],
        ], [
            'email.required' => 'Veuillez saisir votre adresse email.',
            'email.email'    => 'Cette adresse email n\'est pas valide.',
        ]);

        $subscriber = $action->handle($request->string('email')->lower()->toString());

        $message = $subscriber->wasRecentlyCreated
            ? 'Inscription confirmée ! Vérifiez votre boîte email.'
            : 'Vous êtes déjà inscrit(e) à notre newsletter.';

        return back()->with('newsletter_success', $message);
    }
}
