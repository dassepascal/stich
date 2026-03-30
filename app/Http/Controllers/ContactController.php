<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\ProcessContactMessageAction;
use App\Http\Requests\ContactRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Contact');
    }

    public function store(ContactRequest $request, ProcessContactMessageAction $action): RedirectResponse
    {
        $action->execute($request->validated());

        return redirect()->back()->with('contact_success', true);
    }
}
