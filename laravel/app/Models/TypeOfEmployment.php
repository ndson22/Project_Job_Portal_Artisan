<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\JobPost;

class TypeOfEmployment extends Model
{
    use HasFactory;

    protected $table = 'type_of_employments';

    protected $fillable = ['name'];

    public function jobPosts()
    {
        return $this->hasMany(JobPost::class);
    }
}
