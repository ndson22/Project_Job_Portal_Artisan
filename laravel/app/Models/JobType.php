<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\JobPost;

class JobType extends Model
{
    use HasFactory;

    protected $table = 'job_types';

    protected $fillable = ['name'];

    public function jobPosts()
    {
        return $this->hasMany(JobPost::class);
    }
}
