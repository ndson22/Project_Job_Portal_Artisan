<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->only('email', 'password'), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->tokens()->delete();
        $token = $user->createToken($request->email)->plainTextToken;
        $cookie = cookie('sanctum_token', $token, 30);

        return response()->json([
            'message' => 'User successfully logged in',
            'user' => $user,
            'access' => [
                'token' => $token,
                'token_type' => 'bearer',
            ],
        ])->withCookie($cookie);
    }

    public function logout()
    {
        $cookie = Cookie::forget('sanctum_token');
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'User successfully logged out'
        ])->withCookie($cookie);
    }

    public function profile()
    {
        return response()->json(auth()->user());
    }
}
