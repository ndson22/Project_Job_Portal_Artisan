<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TypeOfEmployment;

class TypeOfEmploymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $typeOfEmployments = ['Full time', 'Part time'];
        foreach ($typeOfEmployments as $typeOfEmployment) {
            TypeOfEmployment::create([
                'name' => $typeOfEmployment,
            ]);
        }
    }
}
