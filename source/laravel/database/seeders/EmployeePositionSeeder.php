<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmployeePosition;

class EmployeePositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $employeePositions = ['Director and above', 'Manager', 'Intern/Student', 'Fresher/Entry-level', 'Experienced (non-manager)'];
        sort($employeePositions);

        foreach ($employeePositions as $employeePosition) {
            EmployeePosition::create([
                'name' => $employeePosition,
            ]);
        }
    }
}
