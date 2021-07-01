<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobType;

class JobTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $jobTypes = ['IT', 'Marketing', 'Business'];
        foreach ($jobTypes as $jobType) {
            JobType::create([
                'name' => $jobType,
            ]);
        }
    }
}
