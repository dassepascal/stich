<?php

declare(strict_types=1);

namespace App\Actions;

use App\Events\ContactMessageReceived;
use App\Models\Contact;
use Illuminate\Support\Facades\Log;

class ProcessContactMessageAction
{
    /** @param array<string, mixed> $data */
    public function execute(array $data): Contact
    {
        $contact = Contact::create($data);

        Log::info('New contact message received', [
            'name'    => $contact->name,
            'email'   => $contact->email,
            'company' => $contact->company,
        ]);

        ContactMessageReceived::dispatch($contact);

        return $contact;
    }
}
