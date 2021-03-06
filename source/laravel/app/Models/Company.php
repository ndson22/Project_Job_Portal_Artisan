<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Province;

class Company extends Model
{
    use HasFactory;
    protected $table = 'companies';

    protected $fillable = ['user_id', 'name', 'short_name', 'email', 'description', 'address', 'province_id', 'phone_number', 'facebook', 'website', 'map_link', 'branch', 'scale'];

    public function jobPost()
    {
        return $this->hasMany(JobPost::class);
    }

    public function contact()
    {
        return $this->hasMany(Contact::class);
    }

    public function province()
    {
        return $this->belongsTo(Province::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function seeker()
    {
        return $this->belongsToMany(Seeker::class)->withTimestamps();
    }

    public function withRelationships(Company $company)
    {
        return $this->with(['user', 'province'])->findOrFail($company->id);
    }
}
