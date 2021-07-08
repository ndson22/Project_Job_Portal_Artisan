<?php

namespace App\Policies;

use App\Models\Company;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Response;

class CompanyPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user)
    {
        //
    }

    public function view(User $user, Company $company)
    {
        //
    }

    public function create(User $user)
    {
        //
    }

    public function update(User $user, Company $company)
    {
        //
    }

    public function delete(User $user, Company $company)
    {
        //
    }

    public function restore(User $user, Company $company)
    {
        //
    }

    public function forceDelete(User $user, Company $company)
    {
        //
    }

    public function verify(User $user, Company $company)
    {
        return $user->role->slug === 'admin';
    }
}
