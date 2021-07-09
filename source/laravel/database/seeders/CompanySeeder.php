<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'company',
            'email' => 'company@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        Company::create([
            'user_id' => '2',
            'name' => 'Công Ty TNHH Company Test',
            'email' => 'cpmpany@gmail.com',
            'description' => 'Just a test.',
            'address' => 'Hà Gòn Test',
            'short_name' => 'ACO',
            'code' => 'ACO1' . str_pad(rand(0, 9999),  6, '0', STR_PAD_LEFT),
            'province_id' => 1,
            'verified_at' => now(),
            'sponsored_at' => now()
        ]);

        User::create([
            'name' => 'geekup',
            'email' => 'geekup@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        Company::create([
            'user_id' => '3',
            'name' => 'Geek Up',
            'email' => 'geekup@gmail.com',
            'address' => '244 Huynh Van Banh, Phu Nhuan',
            'description' => 'GEEK Up is the home of passionate Geeks, who share the same passion for building disruptive digital products that win Hearts, Minds and Markets. With expertise in all aspects of Product Development, we have built and launched impactful digital products for enterprises and startups around the world.',
            'short_name' => 'GEK2',
            'code' => 'GEK2' . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT),
            'province_id' => 79,
            'verified_at' => now(),
            'sponsored_at' => now()
        ]);

        User::create([
            'name' => 'smartosc',
            'email' => 'smartosc@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        Company::create([
            'user_id' => '4',
            'name' => 'SmartOSC',
            'email' => 'smartosc@gmail.com',
            'address' => 'Handico Tower, Pham Hung, Nam Tu Liem',
            'description' => "Established in 2006, SmartOSC is a premium, full-service e-commerce agency. The company's portfolio includes more than 500 clients around the world, including many premium brands: Lotte, Courts, PayPal, Boozt, SpaceX, Smartbox, eWAY, Priceline Pharmacy, Club 21, Delta Apparel. As of January 2017, SmartOSC acquired a global presence with 500+ employees and offices in Vietnam, Australia, Singapore, the US, and the UK.",
            'short_name' => 'SMO',
            'code' => 'SMO3' . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT),
            'province_id' => 1,
            'verified_at' => now(),
            'sponsored_at' => now()
        ]);

        User::create([
            'name' => 'nimble',
            'email' => 'nimble@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        Company::create([
            'user_id' => '5',
            'name' => 'Nimble',
            'email' => 'nimble@gmail.com',
            'address' => 'Seahorse Office, 5th Floor, 29 Yên Bái, Hai Chau',
            'description' => "Millions of people use our apps. We work for companies of all sizes; from 1-person startups to Fortune 500 enterprises. We take a collaborative and product development approach, creating custom software that people will love to use and solving our clients' problems so that they can focus on what they do best - better.",
            'short_name' => 'NIM',
            'code' => 'NIM4' . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT),
            'province_id' => 48,
            'verified_at' => now(),
            'sponsored_at' => now()
        ]);

        User::create([
            'name' => 'island',
            'email' => 'island@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        Company::create([
            'user_id' => '6',
            'name' => 'Island Peak Cloud',
            'email' => 'island@gmail.com',
            'address' => 'Second floor, number 14 Nguyen Ba Tuyen, Tan Binh',
            'description' => "Island Peak Cloud Pte Ltd is a Singapore based company specialized in IT solutions, consultancy and management. We provide customized IT based cloud solutions to our customers, including ERP, CRM & Crypto Currency Exchange Platform. Now, we are expanding into building more Fintech products with A.I. Engine & Cloud Security to support fast growing cryptocurrency industry. We are looking for talented individuals to join us!",
            'short_name' => 'IPC',
            'code' => 'IPC5' . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT),
            'province_id' => 79,
            'verified_at' => now(),
            'sponsored_at' => now()
        ]);

        User::create([
            'name' => 'persolkelly',
            'email' => 'persolkelly@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        Company::create([
            'user_id' => '7',
            'name' => 'Persolkelly',
            'email' => 'persolkelly@gmail.com',
            'address' => '37 Ton Duc Thang, Ben Nghe',
            'description' => "PERSOLKELLY is one of the largest recruitment companies in Asia Pacific providing comprehensive end-to-end workforce solutions to clients. Headquartered in Singapore, the company was established in 2016 and is a joint venture between Kelly Services, Inc. and affiliates of PERSOL HOLDINGS Co. Ltd. Today, PERSOLKELLY operates more than 45 offices across 13 markets including Australia, China, Hong Kong, India, Indonesia, Korea, Malaysia, New Zealand, Philippines, Singapore, Taiwan, Thailand, and Vietnam.",
            'short_name' => 'PER',
            'code' => 'PER7' . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT),
            'province_id' => 79,
            'verified_at' => now(),
            'sponsored_at' => now()
        ]);

        User::create([
            'name' => 'cocacola',
            'email' => 'cocacola@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        Company::create([
            'user_id' => '8',
            'name' => 'COCA-COLA',
            'email' => 'cocacola@gmail.com',
            'address' => '37 Ton Duc Thang, Ben Nghe',
            'description' => "Coca Cola Beverages Vietnam Ltd. is a 100% foreign-invested company. It is a subsidiary of the Bottling Investments Group (BIG) which is 100% owned and operated within The Coca Cola Company. BIG was established in 2004 with the purpose of building sustainable bottling businesses around the world. Today, BIG operates on four continents with one of the largest and most geographically diverse footprints, operating bottlers in countries around the world including Germany, China, Brazil and India.",
            'short_name' => 'COC',
            'code' => 'COC8' . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT),
            'province_id' => 79,
            'verified_at' => now(),
            'sponsored_at' => now()
        ]);

        User::create([
            'name' => 'huyndai',
            'email' => 'huyndai@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        Company::create([
            'user_id' => '9',
            'name' => 'Hyundai Engineering Company',
            'email' => 'huyndai@gmail.com',
            'address' => 'Long Son, Vung Tau',
            'description' => "Hyundai Engineering Co., Ltd Korea is the main Contractor of Package G - utility installation of Long Son Petrochemical Complex Project.",
            'short_name' => 'HUY',
            'code' => 'HUY9' . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT),
            'province_id' => 77,
            'verified_at' => now(),
            'sponsored_at' => now()
        ]);

        User::create([
            'name' => 'Anheuser',
            'email' => 'anheuser@gmail.com',
            'password' => bcrypt('password'),
            'role_id' => 2,
            'email_verified_at' => now(),
        ]);
        Company::create([
            'user_id' => '10',
            'name' => 'Anheuser-busch Inbev Vietnam Brewery Co.ltd',
            'email' => 'anheuser@gmail.com',
            'address' => '09th Floor, Agrex Building, No.58, Vo Van Tan Street, District 03',
            'description' => "Fueling our ambition for the future. Building common ground. Strengthening connections. And achieving more together. Our company culture not only defines who we are, but also provides the energy and the focus to drive us towards our Dream.",
            'short_name' => 'ANH',
            'code' => 'ANH10' . str_pad(rand(0, 9999), 6, '0', STR_PAD_LEFT),
            'province_id' => 77,
            'verified_at' => now(),
            'sponsored_at' => now()
        ]);
    }
}
