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
        $jobTypes = ['Accounting / Auditing', 'WareHouse', 'Printing', 'Education/Training', 'Insurance', 'Real Estate', 'Sales', 'Auto/Automotive', 'Civil/Construction', 'Export/Import', 'Freight/Logistics', 'Geology/Mineral', 'Banking', 'Fashion/Lifestyle', 'Finance/Investment', 'IT', 'Marketing', 'Business', 'Marketing', 'Oil/Gas'];
        sort($jobTypes);

        foreach ($jobTypes as $jobType) {
            JobType::create([
                'name' => $jobType,
            ]);
        }
    }
}
