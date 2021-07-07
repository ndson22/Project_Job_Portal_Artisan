<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\JobPost;

class EmployeePosition extends Model
{
    use HasFactory;

    protected $table = 'employee_positions';

    protected $fillable = ['name'];

    public function jobPosts()
    {
        return $this->hasMany(JobPost::class);
    }
}
