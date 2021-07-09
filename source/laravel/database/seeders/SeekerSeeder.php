<?php

namespace Database\Seeders;

use App\Models\Seeker;
use App\Models\User;
use Illuminate\Database\Seeder;

class SeekerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'seeker',
            'email' => 'seeker@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 3,
            'email_verified_at' => now(),
        ]);
        Seeker::create([
            'name' => 'Seeker Test',
            'email' => 'seeker@gmail.com',
            'user_id' => 3
        ]);
    }
}
