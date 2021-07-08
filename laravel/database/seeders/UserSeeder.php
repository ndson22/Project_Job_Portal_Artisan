<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 1,
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'company',
            'email' => 'company@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'seeker',
            'email' => 'seeker@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 3,
            'email_verified_at' => now(),
        ]);

        // Company Extra
        User::create([
            'name' => 'FPT MTV',
            'email' => 'fpt.mtv@fpt.vn',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);

        User::create([
            'name' => 'Double VN',
            'email' => 'doublevn@double.vn',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
    }
}
