<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\Service;

class UpdateServiceAction
{
    /** @param array<string, mixed> $data */
    public function execute(Service $service, array $data): Service
    {
        $service->update($data);

        return $service->fresh();
    }
}
