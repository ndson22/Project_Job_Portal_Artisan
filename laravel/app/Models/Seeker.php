<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\SeekerExperience;
use App\Models\Gender;

class Seeker extends Model
{
    use HasFactory;

    protected $table = 'seekers';

    protected $fillable = ['name', 'gender_id', 'birthday', 'email', 'phone_number', 'facebook', 'address', 'user_id'];

    public function seekerExperience()
    {
        return $this->hasOne(SeekerExperience::class);
    }

    public function gender()
    {
        return $this->belongsTo(Gender::class);
    }

    public static function withRelationships($id)
    {
        return Seeker::with(['gender', 'seekerExperience'])->findOrFail($id);
    }
}
