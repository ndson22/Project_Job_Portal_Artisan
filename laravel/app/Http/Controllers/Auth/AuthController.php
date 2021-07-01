<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRegisterFormRequest;
use App\Http\Requests\RegisterFormRequest;
use App\Mail\VertifyUser;
use App\Models\Company;
use App\Models\User;
use App\Traits\ArrayTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
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

        Mail::to($user->email)->queue(new VertifyUser());

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ], 201);
    }

    public function registerCompany(CompanyRegisterFormRequest $request)
    {
        $user = User::create(array_merge(
            $request->only('name', 'email', 'password', 'password_confirmation'),
            ['password' => bcrypt($request->password)]
        ));

        // Tao tai khoan company
        $data = array_merge(
            $request->except('name', 'password', 'agree', 'password_confirmation'),
            ['user_id' => $user->id]
        );
        $this->changeKey($data, 'company_name', 'name');
        $company = new Company();
        $company->fill($data);
        $company->save();
        $company->code = $company->short_name . $company->id;
        $company->save();

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

    public function getCurrentUser()
    {
        $userID = auth()->user();
        return response()->json($userID);
    }

    public function isAuthenticated()
    {
        return auth('sanctum')->check();
    }
}
