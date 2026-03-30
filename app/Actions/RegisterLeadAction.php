<?php

declare(strict_types=1);

namespace App\Actions;

use App\Events\LeadRegistered;
use App\Models\Lead;

class RegisterLeadAction
{
    public function execute(string $email, ?string $ipAddress): Lead
    {
        $lead = Lead::create([
            'email'      => $email,
            'status'     => 'new',
            'ip_address' => $ipAddress,
        ]);

        LeadRegistered::dispatch($lead);

        return $lead;
    }
}
