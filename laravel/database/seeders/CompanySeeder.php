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
            'user_id' => '2',
            'name' => 'Công Ty TNHH MTV Viễn Thông Quốc Tế FPT',
            'email' => 'fpt.mtv@fpt.vn',
            'image' => 'https://static.topcv.vn/company_logos/cong-ty-tnhh-mtv-vien-thong-quoc-te-fpt-5d898f99a34de.jpg',
            'description' => 'Công ty TNHH MTV Viễn Thông Quốc Tế FPT (FPT Telecom International) là một trong những nhà cung cấp dịch vụ Viễn thông hàng đầu Việt Nam.',
            'address' => 'Tầng 1, tòa nhà FPT, đường Tân Thuận, Khu chế xuất Tân Thuận, phường Tân Thuận Đông, Quận 7, TPHCM.',
            'short_name' => 'FPT',
            'code' => 'FPT3',
            'province_id' => 79
        ]);

        Company::create([
            'user_id' => '4',
            'name' => 'Công ty cổ phần công nghệ Double Việt Nam',
            'email' => 'doublevn@double.vn',
            'image' => 'https://static.topcv.vn/company_logos/cong-ty-co-phan-cong-nghe-double-viet-nam-5d761d926a718.jpg',
            'description' => 'Double là studio chuyên sản xuất game cho thiết bị di động: iOS, Android, Windows…đang có nhu cầu tuyển dụng lập trình viên làm việc tại văn phòng tại Tòa Nhà Vân Nam 26 Đường Láng-Hà Nội',
            'address' => '19 Tố Hữu Hà Nội',
            'short_name' => 'DOU',
            'code' => 'DOU5',
            'province_id' => 1
        ]);

        for ($i = 0; $i < 100; $i++) {
            Company::create([
                'user_id' => '5',
                'name' => 'Công ty cổ phần công nghệ Double Việt Nam',
                'email' => 'doublevn@double.vn',
                'image' => 'https://static.topcv.vn/company_logos/cong-ty-co-phan-cong-nghe-double-viet-nam-5d761d926a718.jpg',
                'description' => 'Double là studio chuyên sản xuất game cho thiết bị di động: iOS, Android, Windows…đang có nhu cầu tuyển dụng lập trình viên làm việc tại văn phòng tại Tòa Nhà Vân Nam 26 Đường Láng-Hà Nội',
                'address' => '19 Tố Hữu Hà Nội',
                'short_name' => 'DOU',
                'code' => 'DOU5',
                'province_id' => 1
            ]);
        }
    }
}
