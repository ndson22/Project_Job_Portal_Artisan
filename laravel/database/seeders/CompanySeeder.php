<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Company;
class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Company::create([
            'user_id' => '1',
            'name' => 'Cong ty CP Codegym',
            'email' => 'codegym@@codegym.vn',
            'image' => 'https://i1.wp.com/codegym.vn/wp-content/uploads/2021/05/dia-chi-cuc-so-huu-tri-tue-removebg-preview.png?w=442&ssl=1',
            'description' => 'Cong ty dao tao lap trinh hien dai',
            'address' => 'Toa nha MonCity Ha Noi',
            'code' => 'COD1',
            'short_name' => 'COD',
            'province_id' => 1
        ]);

        Company::create([
            'user_id' => '3',
            'name' => 'Cong ty CP Codegym',
            'email' => 'codegym@@codegym.vn',
            'image' => 'https://i1.wp.com/codegym.vn/wp-content/uploads/2021/05/dia-chi-cuc-so-huu-tri-tue-removebg-preview.png?w=442&ssl=1',
            'description' => 'Cong ty dao tao lap trinh hien dai',
            'address' => 'Toa nha MonCity Ha Noi',
            'code' => 'COD2',
            'short_name' => 'COD',
            'province_id' => 30
        ]);
    }
}
