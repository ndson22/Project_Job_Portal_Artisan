<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRegisterFormRequest;
use App\Http\Requests\RegisterFormRequest;
use App\Mail\VerifyUser;
use App\Models\Company;
use App\Models\User;
use App\Traits\ArrayTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    use ArrayTrait;

    public function register(RegisterFormRequest $request)
    {
        $user = User::create(array_merge(
            $request->validated(),
            ['password' => bcrypt($request->password)]
        ));

        Mail::to($user->email)->queue(new VerifyUser($request->validated(), $user));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ], 201);
    }

    public function registerCompany(CompanyRegisterFormRequest $request)
    {
        $user = User::create(array_merge(
            $request->only('name', 'email'),
            ['password' => bcrypt($request->password)]
        ));
        $user->role_id = 3;
        $user->save();

        // Tao tai khoan company
        $data = array_merge(
            $request->except('name', 'password', 'agree', 'password_confirmation'),
            ['user_id' => $user->id]
        );
        $this->changeKey($data, 'company_name', 'name');
        $company = new Company();
        $company->fill($data);
        $company->code = $company->short_name;
        $company->save();
        $company->code = $company->short_name . $company->id;
        $company->save();

        Mail::to($user->email)->queue(new VerifyUser($request->validated(), $user));

        // Tra response
        return response()->json([
            'message' => 'Company account successfully created',
            'user' => $user,
            'company' => $company,
        ], 201);
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->tokens()->delete();
        $tokenAbility = 'role: ' . $user->role->slug;
        $token = $user->createToken($request->email, [$tokenAbility])->plainTextToken;
        $cookie = cookie('sanctum_token', $token, 30);

        return response()->json([
            'message' => 'User successfully logged in',
            'user' => $user,
            'access' => [
                'token' => $token,
                'token_type' => 'bearer',
                'token_can' => $tokenAbility
            ],
        ])->withCookie($cookie);
    }

    public function logout()
    {
        $cookie = Cookie::forget('sanctum_token');
        auth('sanctum')->user()->tokens()->delete();

        return response()->json([
            'message' => 'User successfully logged out'
        ])->withCookie($cookie);
    }

    public function verifyEmail(Request $request)
    {
        $user = User::findOrFail($request->id);

        if (is_null($user->email_verified_at)) {
            $user->email_verified_at = now();
            $user->save();
            return response()->json(['message' => 'Your email is verified!']);
        }

        return response()->json(['message' => 'Your email is already verified!'], 409);
    }

    public function getCurrentUser()
    {
        $user = User::getWithRole();
        return response()->json($user);
    }

    public function isAuthenticated()
    {
        $user = User::getWithRole();
        return response()->json($user);
    }
}
