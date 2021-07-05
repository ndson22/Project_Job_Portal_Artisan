<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gender;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genders = ['Male', 'Female', 'All gender'];
        foreach ($genders as $gender) {
            Gender::create([
                'name' => $gender,
            ]);
        }
    }
}
