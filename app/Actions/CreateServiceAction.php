<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Service;

class CreateServiceAction
{
    /** @param array<string, mixed> $data */
    public function execute(array $data): Service
    {
        return Service::create($data);
    }
}
