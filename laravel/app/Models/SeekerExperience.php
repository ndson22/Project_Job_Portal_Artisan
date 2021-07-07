<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Seeker;

class SeekerExperience extends Model
{
    use HasFactory;

    protected $table = 'seeker_experiences';

    protected $fillable = ['description', 'seeker_id'];

    public function seeker()
    {
        return $this->belongsTo(Seeker::class);
    }
}
