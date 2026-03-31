<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function confidentialite(): Response
    {
        return Inertia::render('Legal/Confidentialite');
    }

    public function conditions(): Response
    {
        return Inertia::render('Legal/Conditions');
    }

    public function mentionsLegales(): Response
    {
        return Inertia::render('Legal/MentionsLegales');
    }
}
