<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\Backend;
use App\Http\Controllers\Frontend;
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

Route::prefix('backend')->group(function () {
    Route::put('/verify-email', [Auth\AuthController::class, 'verifyEmail'])->name('verify.email');
    Route::post('/register-company', [Auth\AuthController::class, 'registerCompany']);
    Route::post('/register', [Auth\AuthController::class, 'register']);
    Route::post('/login', [Auth\AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/is-authenticated', [Auth\AuthController::class, 'checkAuthenticated']);
        Route::post('/logout', [Auth\AuthController::class, 'logout']);
    });

    Route::apiResource('jobs', Backend\JobController::class)->middleware('auth:sanctum');
    Route::put('/jobs/{job}/active', [Backend\JobController::class, 'isActive'])->middleware('auth:sanctum');
    Route::put('/jobs/{job}/promote', [Backend\JobController::class, 'isPromote'])->middleware('auth:sanctum');
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

Route::put('/companies/{company}/verify', [Frontend\CompanyController::class, 'verify'])->middleware('auth:sanctum');
Route::put('/companies/{company}/lock', [Frontend\CompanyController::class, 'lock'])->middleware('auth:sanctum');
Route::put('/companies/{company}/sponsor', [Frontend\CompanyController::class, 'sponsor'])->middleware('auth:sanctum');
Route::post('/companies/{company}/image', [Frontend\CompanyController::class, 'uploadImage'])->middleware('auth:sanctum');
Route::get('/companies/top', [Frontend\CompanyController::class, 'getCompany']);

Route::apiResource('companies', Frontend\CompanyController::class);
Route::apiResource('provinces', Frontend\ProvinceController::class)->only('index');

Route::apiResource('experiences', Frontend\SeekerExperienceController::class)->middleware('auth:sanctum');
Route::apiResource('seekers', Frontend\SeekerController::class)->middleware('auth:sanctum');
Route::post('/seekers/{seeker}/avatar', [Frontend\SeekerController::class, 'changeAvatar'])->middleware('auth:sanctum');
Route::apiResource('genders', Frontend\GenderController::class)->only('index');
Route::prefix('/users')->middleware('auth:sanctum')->group(function () {
    Route::get('/{id?}', [Frontend\UserController::class, 'show']);
    Route::put('/update/info', [Frontend\UserController::class, 'updateInfo']);
    Route::put('/update/password', [Frontend\UserController::class, 'updatePassword']);
});
