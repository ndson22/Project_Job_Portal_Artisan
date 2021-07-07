<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobPost;

class JobPostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'title' => 'NHÂN VIÊN KINH DOANH PHẦN MỀM (THU NHẬP 15-20 TRIỆU)',
                'company_id' => rand(1, 2),
                'job_type_id' => rand(1, 3),
                'from_salary' => 100,
                'to_salary' => 1000,
                'employee_position_id' => 1,
                'experience' => 1,
                'type_of_employment_id' => 1,
                'expire' => '2021-07-10',
                'description' => '<h2>M&Ocirc; TẢ C&Ocirc;NG VIỆC</h2>
                <div class="content-tab">
                <p>- T&igrave;m kiếm th&ocirc;ng tin về kh&aacute;ch h&agrave;ng doanh nghiệp tiềm năng</p>
                <p>- Tiếp cận v&agrave; t&igrave;m hiểu nhu cầu của kh&aacute;ch h&agrave;ng th&ocirc;ng qua: điện thoại, email,...</p>
                <p>- Tư vấn, giới thiệu sản phẩm cho kh&aacute;ch h&agrave;ng</p>
                <p>- Thiết lập c&aacute;c cuộc hẹn với kh&aacute;ch h&agrave;ng</p>
                </div>
                <h2>Y&Ecirc;U CẦU ỨNG VI&Ecirc;N</h2>
                <div class="content-tab">
                <p>- Tốt nghiệp CĐ/ĐH khối ng&agrave;nh kinh tế</p>
                <p>- Độ tuổi: 21-24</p>
                <p>- Y&ecirc;u th&iacute;ch kinh doanh, năng động, tự tin</p>
                <p>- C&oacute; kỹ năng giao tiếp tốt, khả năng xử l&yacute; t&igrave;nh huống linh hoạt</p>
                <p>- Th&aacute;i độ: Nhiệt t&igrave;nh, c&oacute; tr&aacute;ch nhiệm với c&ocirc;ng việc</p>
                </div>
                <h2>QUYỀN LỢI ĐƯỢC HƯỞNG</h2>
                <div class="content-tab">
                <ul>
                <li>L&agrave;m việc tại TOP 4 c&ocirc;ng ty ph&aacute;t triển phần mềm tại Việt Nam</li>
                <li>Thu nhập b&igrave;nh qu&acirc;n từ 15tr đến 20tr/th&aacute;ng trở l&ecirc;n (Thưởng doanh số kh&ocirc;ng giới hạn)</li>
                <li>Phụ cấp điện thoại: 400.000 đồng/th&aacute;ng</li>
                <li>M&ocirc;i trường l&agrave;m việc trẻ trung, năng động v&agrave; chuy&ecirc;n nghiệp</li>
                <li>Thu nhập cạnh tranh, thưởng doanh số, thưởng hiệu quả, thưởng xuất sắc th&aacute;ng...</li>
                <li>Được cung cấp m&aacute;y t&iacute;nh, điện thoại để b&agrave;n, sim điện thoại, phụ cấp điện thoại h&agrave;ng th&aacute;ng</li>
                <li>Được đ&agrave;o tạo n&acirc;ng cao năng lực v&agrave; c&oacute; cơ hội thăng tiến nhanh, r&otilde; r&agrave;ng</li>
                <li>Được k&yacute; hợp đồng lao động, đ&oacute;ng bảo hiểm v&agrave; c&aacute;c chế độ ph&uacute;c lợi: nghỉ m&aacute;t h&agrave;ng năm, kh&aacute;m sức khỏe định kỳ..</li>
                <li>Tham gia c&aacute;c hoạt động văn h&oacute;a thể thao như CLB B&oacute;ng đ&aacute; (nam, nữ), cầu l&ocirc;ng, tennis, MISA&rsquo;s Gotalent,&hellip;</li>
                </ul>
                </div>',
                'employee_quantity' => 10,
                'gender_id' => 3,
                'job_code' => 'CODE12',
            ],
            [
                'title' => 'TRƯỞNG NHÓM TRUYỀN THÔNG',
                'company_id' => rand(1, 2),
                'job_type_id' => rand(1, 3),
                'from_salary' => 100,
                'to_salary' => 1000,
                'employee_position_id' => 2,
                'experience' => 1,
                'type_of_employment_id' => 1,
                'expire' => '2021-07-10',
                'description' => '<div>
                <div>M&Ocirc; TẢ C&Ocirc;NG VIỆC</div>
                <div>X&acirc;y dựng kế hoạch v&agrave; dẫn dắt team triển khai kế hoạch/hoạt động truyền th&ocirc;ng, quảng b&aacute; sản phẩm đến với kh&aacute;ch h&agrave;ng mục ti&ecirc;u tr&ecirc;n đa k&ecirc;nh.</div>
                <div>Trực tiếp triển khai s&aacute;ng tạo nội dung tr&ecirc;n c&aacute;c nền tảng B&aacute;o ch&iacute;, Website, Youtube, Facebook,...</div>
                <div>Đề xuất, chủ tr&igrave; triển khai sự kiện online, offline; c&aacute;c hoạt động truyền th&ocirc;ng kh&aacute;c hướng đến mục ti&ecirc;u.</div>
                <div>Quản l&yacute;, kiểm duyệt nội dung, h&igrave;nh ảnh truyền th&ocirc;ng tr&ecirc;n c&aacute;c k&ecirc;nh.</div>
                <div>Quản l&yacute; nh&oacute;m nhằm thực hiện tốt c&aacute;c chiến dịch truyền th&ocirc;ng theo từng giai đoạn.</div>
                <div>Một số c&ocirc;ng việc kh&aacute;c được chỉ định trực tiếp từ Trưởng ph&ograve;ng.</div>
                <div>Y&Ecirc;U CẦU ỨNG VI&Ecirc;N</div>
                <div>Độ tuổi 22-28.</div>
                <div>Tốt nghiệp Đại học/Cao đẳng, ưu ti&ecirc;n c&aacute;c chuy&ecirc;n ng&agrave;nh Truyền th&ocirc;ng, Tiếp thị hoặc c&aacute;c chuy&ecirc;n ng&agrave;nh tương đương.</div>
                <div>C&oacute; kinh nghiệm từ 06 th&aacute;ng trở l&ecirc;n ở vị tr&iacute; tương đương.</div>
                <div>C&oacute; kỹ năng bi&ecirc;n tập, s&aacute;ng tạo th&ocirc;ng điệp truyền th&ocirc;ng.</div>
                <div>Kỹ năng viết tốt, logic, th&agrave;nh thạo c&aacute;c c&ocirc;ng cụ viết b&agrave;i.</div>
                <div>Nhanh nhẹn, năng động, th&iacute;ch thử th&aacute;ch v&agrave; t&igrave;m kiếm những thứ mới.</div>
                <div>Tư duy s&aacute;ng tạo, khả năng t&igrave;m kiếm, ph&acirc;n t&iacute;ch th&ocirc;ng tin tốt.</div>
                <div>Ham học hỏi, kh&ocirc;ng ngại thử th&aacute;ch bản th&acirc;n.</div>
                <div>C&oacute; khả năng l&agrave;m việc độc lập v&agrave; chịu được &aacute;p lực cao trong c&ocirc;ng việc.</div>
                <div>QUYỀN LỢI ĐƯỢC HƯỞNG</div>
                <div>Thu nhập cạnh tranh, thưởng đa dạng: Lương cứng 10-14 triệu c&ugrave;ng c&aacute;c mức thưởng hấp dẫn (thưởng năng suất, thưởng hiệu quả, thưởng s&aacute;ng kiến,...).</div>
                <div>Thỏa sức s&aacute;ng tạo, thể hiện bản th&acirc;n.</div>
                <div>Cơ hội review lương 02 lần/năm.</div>
                <div>Hỗ trợ m&aacute;y t&iacute;nh c&aacute; nh&acirc;n; Du lịch 02 lần/năm.</div>
                <div>M&ocirc;i trường trẻ, cởi mở, sẵn s&agrave;ng tiếp thu c&aacute;i mới, đồng thời ch&uacute; trọng v&agrave;o việc ph&aacute;t triển nh&acirc;n t&agrave;i.</div>
                <div>Được đảm bảo c&aacute;c quyền lợi cơ bản như đ&oacute;ng BHXH, BHYT, BHTN v&agrave; c&aacute;c ch&iacute;nh s&aacute;ch ph&uacute;c lợi kh&aacute;c của C&ocirc;ng ty.</div>
                </div>',
                'employee_quantity' => 3,
                'gender_id' => 3,
                'job_code' => 'CODE23',
            ],
            [
                'title' => 'NHÂN VIÊN SALE ONLINE FULL - TIME',
                'company_id' => rand(1, 2),
                'job_type_id' => rand(1, 3),
                'from_salary' => 100,
                'to_salary' => 1000,
                'employee_position_id' => 1,
                'experience' => 1,
                'type_of_employment_id' => 1,
                'expire' => '2021-07-10',
                'description' => '<div>
                <div>M&Ocirc; TẢ C&Ocirc;NG VIỆC</div>
                <div>Tư vấn v&agrave; thuyết phục c&aacute;c kh&aacute;ch h&agrave;ng mua sản phẩm/ dịch vụ của c&ocirc;ng ty qua inbox, comment từ c&aacute;c k&ecirc;nh được ph&acirc;n bổ như: Facebook, Zalo, Instagram, Shopee, Tiki...</div>
                <br />
                <div>Trả lời, tư vấn cho kh&aacute;ch h&agrave;ng về sản phẩm, c&aacute;ch sử dụng sản phẩm trước, trong v&agrave; sau b&aacute;n h&agrave;ng.</div>
                <br />
                <div>Nắm bắt c&aacute;c th&ocirc;ng tin khuyến m&atilde;i, chương tr&igrave;nh b&aacute;n h&agrave;ng để tư vấn cho kh&aacute;ch h&agrave;ng một c&aacute;ch ch&iacute;nh x&aacute;c nhất.</div>
                <br />
                <div>Nh&acirc;n vi&ecirc;n sale online Tiếng Anh</div>
                <br />
                <div>- Ca 8h-18h Lương cứng 350$ + Thưởng Hoa hồng</div>
                <br />
                <div>- Ca 18h-23h Lương cứng 300$ + Thưởng Hoa hồng</div>
                <br />
                <div>- Ca đ&ecirc;m 23h-4h Lương cứng 350$ + Thưởng Hoa hồng</div>
                <br />
                <div>Nh&acirc;n vi&ecirc;n CSKH online Tiếng Anh</div>
                <br />
                <div>- Ca 13h- 19h (6 tiếng) Lương cứng 350$ + Thưởng Hoa hồng</div>
                <br />
                <div>- Ca 18h -23h (5 tiếng) Lương cứng 350$ + Thưởng Hoa hồng</div>
                <br />
                <div>Y&Ecirc;U CẦU ỨNG VI&Ecirc;N</div>
                <div>Tiếng Anh Kh&aacute;: C&oacute; thể nghe/n&oacute;i/đọc/viết tốt.</div>
                <br />
                <div>C&oacute; laptop c&aacute; nh&acirc;n.</div>
                <br />
                <div>Tinh thần trung thực v&agrave; cầu tiến, biết lắng nghe v&agrave; tr&agrave;n đầy năng lượng.</div>
                <br />
                <div>C&oacute; tinh thần tr&aacute;ch nhiệm cao v&agrave; nghi&ecirc;m t&uacute;c trong c&ocirc;ng việc.</div>
                <br />
                <div>Kh&ocirc;ng y&ecirc;u cầu kinh nghiệm b&aacute;n h&agrave;ng, sẽ được đ&agrave;o tạo cụ thể khi nhận việc</div>
                <br />
                <div>QUYỀN LỢI ĐƯỢC HƯỞNG</div>
                <div>THU NHẬP = LƯƠNG CỨNG + HOA HỒNG DOANH SỐ ( Kh&ocirc;ng giới hạn ) + THƯỞNG TH&Agrave;NH T&Iacute;CH. ( Tuần, Th&aacute;ng , Năm )</div>
                <br />
                <div>Thu nhập hấp dẫn : 12.000.000 VNĐ - 18.000.000 VNĐ</div>
                <br />
                <div>Được đ&agrave;o tạo chuy&ecirc;n s&acirc;u về Marketing, B&aacute;n h&agrave;ng online, Phương ph&aacute;p chốt Sale hiệu quả</div>
                <br />
                <div>Được hưởng c&aacute;c chế độ của người lao động theo quy định của nh&agrave; nước</div>
                <br />
                <div>L&agrave;m việc trong m&ocirc;i trường chuy&ecirc;n nghiệp, tiếp x&uacute;c với kh&aacute;ch h&agrave;ng nước ngo&agrave;i thường xuy&ecirc;n</div>
                <br />
                <div>Chế độ nghỉ lễ tết theo quy định của c&ocirc;ng ty</div>
                <br />
                <div>Lu&ocirc;n c&oacute; cơ hội thăng tiến trong c&ocirc;ng việc nghề nghiệp</div>
                <br />
                <div>L&agrave;m việc từ thứ 2 tới Chủ Nhật , được OFF 1 ng&agrave;y bất k&igrave; trong tuần</div>
                </div>',
                'employee_quantity' => 3,
                'gender_id' => 3,
                'job_code' => 'CODE23',
            ]
        ];
        for ($i = 0; $i < 50; $i++) {
            JobPost::create($data[array_rand($data)]);
        }
    }
}
