<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\JobPost;

class JobLocation extends Model
{
    use HasFactory;

    protected $table = 'job_locations';

    protected $fillable = ['province_id', 'address'];

    public function jobPost()
    {
        return $this->belongsTo(JobPost::class, 'id');
    }
}
