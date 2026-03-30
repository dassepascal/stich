<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Contact;

class MarkContactAsReadAction
{
    public function execute(Contact $contact): Contact
    {
        if ($contact->status !== 'read') {
            $contact->update(['status' => 'read']);
        }

        return $contact;
    }
}
