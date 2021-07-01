<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            EmployeePositionSeeder::class,
            GenderSeeder::class,
            JobTypeSeeder::class,
            TypeOfEmploymentSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            CompanySeeder::class
        ]);
        \App\Models\JobPost::factory(30)->create();
    }
}
