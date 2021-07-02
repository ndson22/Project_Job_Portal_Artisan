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
        ]);
        User::create([
            'name' => 'seeker',
            'email' => 'seeker@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
        ]);
        User::create([
            'name' => 'company',
            'email' => 'company@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 3,
        ]);
    }
}
