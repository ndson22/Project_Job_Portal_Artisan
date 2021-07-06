<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Backend;
use App\Http\Controllers\Frontend;
use App\Http\Controllers\Frontend\JobController;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::prefix('backend')->group(function () {
    Route::put('/verify-email', [AuthController::class, 'verifyEmail'])->name('verify.email');
    Route::post('/register-company', [AuthController::class, 'registerCompany']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/is-authenticated', [AuthController::class, 'isAuthenticated']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/users/current', [AuthController::class, 'getCurrentUser']);
    });
});

Route::prefix('/jobs')->group(function () {
    Route::get('', [Frontend\JobController::class, 'getAll'])->name('jobs.list');
    Route::get('/info', [Frontend\JobController::class, 'getJobInfo'])->name('jobs.getJobInfo');
    Route::post('/store', [Frontend\JobController::class, 'store'])->name('jobs.store')->middleware('auth:sanctum');
    Route::put('/edit/{id}', [Frontend\JobController::class, 'edit'])->middleware('auth:sanctum');
    Route::delete('/delete/{id}', [Frontend\JobController::class, 'delete'])->middleware('auth:sanctum');
    Route::post('/search', [Frontend\JobController::class, 'search'])->name('jobs.search');
    Route::get('/types', [Frontend\JobTypeController::class, 'getJobTypes']);
    Route::get('/provinces', [Frontend\ProvinceController::class, 'index']);
    Route::get('/{id}', [Frontend\JobController::class, 'getDetail'])->name('jobs.get');
});

Route::prefix('/contact')->group(function (){
    Route::post('/store', [Frontend\ContactController::class, 'store']);
});

Route::prefix('/dashboard')->group(function() {
    Route::get('/jobs/{page}/{size?}', [JobController::class, 'getJobByCompany'])->middleware('auth:sanctum');
    Route::put('/jobs/active', [JobController::class, 'changeStatus'])->middleware('auth:sanctum');
});

Route::apiResource('companies', Frontend\CompanyController::class);
Route::apiResource('provinces', Frontend\ProvincesController::class)->only('index');
