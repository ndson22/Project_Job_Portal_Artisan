<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\JobPost;

class JobAddress extends Model
{
    use HasFactory;

    protected $table = 'job_addresses';

    protected $fillable = ['city', 'address_detail'];

    public function jobPost()
    {
        return $this->belongsTo(JobPost::class);
    }
}
