<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Company;
class Province extends Model
{
    protected $fillable = ['name','slug','type', 'name_with_type'];
    use HasFactory;

    public function company()
    {
        return $this->hasMany(Company::class);
    }
}
