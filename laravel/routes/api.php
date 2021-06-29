<?php

use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;
use App\Http\Controllers\Backend;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('backend')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/is-authenticated', [AuthController::class, 'isAuthenticated']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/users/current', [AuthController::class, 'getCurrentUser']);
    });
});

    Route::prefix('/jobs')->group(function() {
        Route::get('', [JobController::class, 'getAll'])->name('jobs.list');
        Route::get('/info', [JobController::class, 'getJobInfo'])->name('jobs.getJobInfo');
        Route::post('/store', [JobController::class, 'store'])->name('jobs.store');
        Route::get('/{id}', [JobController::class, 'getDetail'])->name('jobs.get');
});
