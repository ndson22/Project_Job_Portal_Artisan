<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\JobLocation;
use App\Models\JobType;
use App\Models\EmployeePosition;
use App\Models\TypeOfEmployment;
use App\Models\Gender;

class JobPost extends Model
{
    use HasFactory;

    protected $table = 'job_posts';

    protected $fillable = [
        'title', 'company_id', 'job_type_id',
        'from_salary', 'to_salary', 'employee_position_id',
        'experience', 'type_of_employment_id', 'expire',
        'description', 'employee_quantity', 'gender_id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function jobType()
    {
        return $this->belongsTo(JobType::class);
    }

    public function employeePosition()
    {
        return $this->belongsTo(EmployeePosition::class);
    }

    public function typeOfEmployment()
    {
        return $this->belongsTo(TypeOfEmployment::class);
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }
}
