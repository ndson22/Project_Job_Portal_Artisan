<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\JobPost;

class Gender extends Model
{
    use HasFactory;

    protected $table = 'genders';

    protected $fillable = ['name'];

    public function jobPosts()
    {
        return $this->hasMany(JobPost::class);
    }
}
