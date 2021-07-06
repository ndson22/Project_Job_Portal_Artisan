<?php

namespace App\Models;

use App\Models\Role;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    function role()
    {
        return $this->belongsTo(Role::class);
    }

    function seeker()
    {
        return $this->hasOne(Seeker::class);
    }

    function company()
    {
        return $this->hasOne(Company::class);
    }

    public static function withRelationships($id = null)
    {
        $id = $id ?? auth('sanctum')->id();
        return User::with(['role', 'seeker', 'company'])->findOrFail($id);
    }
}
