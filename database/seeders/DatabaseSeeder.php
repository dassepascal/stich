<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'admin@kinetic.ai'],
            [
                'name'              => 'Admin Kinetic',
                'password'          => bcrypt('password'),
                'email_verified_at' => now(),
                'is_admin'          => true,
            ]
        );
    }
}
