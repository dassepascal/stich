<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\MarkContactAsReadAction;
use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => Contact::latest()->get(),
        ]);
    }

    public function markAsRead(Contact $contact, MarkContactAsReadAction $action): RedirectResponse
    {
        $action->execute($contact);

        return redirect()->back();
    }

    public function destroy(Contact $contact): RedirectResponse
    {
        $contact->delete();

        return redirect()->back()->with('success', 'Message supprimé.');
    }
}
