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
});

Route::prefix('/jobs')->group(function () {
    Route::get('', [Frontend\JobController::class, 'getAll'])->name('jobs.list');
    Route::get('/info', [Frontend\JobController::class, 'getJobInfo'])->name('jobs.getJobInfo');
    Route::get('/salary', [Frontend\JobController::class, 'getSalary']);

    Route::post('/store', [Frontend\JobController::class, 'store'])->name('jobs.store')->middleware('auth:sanctum');
    Route::put('/edit/{id}', [Frontend\JobController::class, 'edit'])->middleware('auth:sanctum');
    Route::delete('/delete/{id}', [Frontend\JobController::class, 'delete'])->middleware('auth:sanctum');
    Route::post('/search', [Frontend\JobController::class, 'search'])->name('jobs.search');

    Route::get('/types', [Frontend\JobTypeController::class, 'getJobTypes']);
    Route::post('/search-filter', [Frontend\JobController::class, 'filter']);

    Route::get('/provinces', [Frontend\ProvinceController::class, 'index']);
    Route::get('/{id}', [Frontend\JobController::class, 'getDetail'])->name('jobs.get');
});

Route::prefix('/dashboard')->group(function () {
    Route::get('/jobs/{page}/{size?}', [Frontend\JobController::class, 'getJobByCompany'])->middleware('auth:sanctum');
    Route::put('/jobs/active', [Frontend\JobController::class, 'changeStatus'])->middleware('auth:sanctum');
});

Route::put('/companies/{company}/verify/', [Frontend\CompanyController::class, 'verify'])->middleware('auth:sanctum');
Route::apiResource('companies', Frontend\CompanyController::class);
Route::apiResource('provinces', Frontend\ProvinceController::class)->only('index');
Route::prefix('/users')->middleware('auth:sanctum')->group(function () {
    Route::get('/{id?}', [Frontend\UserController::class, 'show']);
    Route::put('/update/info', [Frontend\UserController::class, 'updateInfo']);
    Route::put('/update/password', [Frontend\UserController::class, 'updatePassword']);
});
