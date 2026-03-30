<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Actions\CreateServiceAction;
use App\Actions\UpdateServiceAction;
use App\Http\Requests\ServiceRequest;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Services/Index', [
            'services' => Service::orderBy('order')->get(),
        ]);
    }

    public function store(ServiceRequest $request, CreateServiceAction $action): RedirectResponse
    {
        $action->execute($request->validated());

        return redirect()->back();
    }

    public function update(ServiceRequest $request, Service $service, UpdateServiceAction $action): RedirectResponse
    {
        $action->execute($service, $request->validated());

        return redirect()->back();
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();

        return redirect()->back();
    }
}
