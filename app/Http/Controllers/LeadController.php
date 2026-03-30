<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\RegisterLeadAction;
use App\Http\Requests\StoreLeadRequest;
use Illuminate\Http\RedirectResponse;

class LeadController extends Controller
{
    public function store(StoreLeadRequest $request, RegisterLeadAction $action): RedirectResponse
    {
        $action->execute(
            email:     $request->validated('email'),
            ipAddress: $request->ip(),
        );

        return redirect()->back()->with('lead_success', true);
    }
}
