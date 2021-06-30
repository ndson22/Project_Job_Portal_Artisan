<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Province;

class Company extends Model
{
    use HasFactory;
    protected $table = 'companies';

    protected $fillable = ['user_id', 'name', 'short_name', 'email', 'description', 'address', 'province_id'];

    public function jobPost()
    {
        return $this->hasMany(JobPost::class);
    }

    public function province()
    {
        return $this->belongsTo(Province::class);
    }
}
