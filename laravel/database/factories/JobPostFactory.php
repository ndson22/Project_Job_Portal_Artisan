<?php

namespace Database\Factories;

use App\Models\JobPost;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobPostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = JobPost::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(),
            'company_id' => 1,
            'job_type_id' => 1,
            'from_salary' => 100,
            'to_salary' => 1000,
            'employee_position_id' => 1,
            'experience' => 1,
            'type_of_employment_id' => 1,
            'expire' => '2021-07-10',
            'description' => implode(" ", $this->faker->paragraphs(10)),
            'employee_quantity' => 10,
            'gender_id' => 3,
            'job_code' => 'CODE12',
        ];
    }
}
