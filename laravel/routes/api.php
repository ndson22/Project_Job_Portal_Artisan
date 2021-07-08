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

        Route::apiResource('jobs', Backend\JobController::class);
        Route::put('/jobs/{job}/active', [Backend\JobController::class, 'isActive']);
        Route::put('/jobs/{job}/promote', [Backend\JobController::class, 'isPromote']);
    });

    Route::prefix('emails')->group(function () {
        Route::post('/contact-us', [Backend\EmailController::class, 'contactUs']);
        Route::post('/forward-job-detail', [Backend\EmailController::class, 'forwardJobDetail']);
    });
});

Route::prefix('/jobs')->group(function () {
    Route::get('', [Frontend\JobController::class, 'getAll'])->name('jobs.list');
    Route::get('/info', [Frontend\JobController::class, 'getJobInfo'])->name('jobs.getJobInfo');
    Route::get('/salary', [Frontend\JobController::class, 'getSalary']);

    Route::get('/jobsider', [Frontend\JobController::class, 'getJobSider']);
    Route::post('/store', [Frontend\JobController::class, 'store'])->name('jobs.store')->middleware('auth:sanctum');
    Route::put('/edit/{id}', [Frontend\JobController::class, 'edit'])->middleware('auth:sanctum');
    Route::delete('/delete/{id}', [Frontend\JobController::class, 'delete'])->middleware('auth:sanctum');
    Route::post('/search', [Frontend\JobController::class, 'search']);
    Route::get('/experiences', [Frontend\JobController::class, 'getExperiences']);
    Route::get('/types', [Frontend\JobTypeController::class, 'getJobTypes']);
    // Route::post('/search-filter', [Frontend\JobController::class, 'filter']);

    Route::get('/provinces', [Frontend\ProvinceController::class, 'index']);
    Route::get('/search-provinces', [Frontend\ProvinceController::class, 'getProvin']);

    Route::get('/{id}', [Frontend\JobController::class, 'getDetail'])->name('jobs.get');

});

Route::prefix('/contact')->group(function (){
    Route::post('/store', [Frontend\ContactController::class, 'store']);
});

Route::prefix('/dashboard')->group(function() {
    Route::get('/jobs/{page}/{size?}', [Frontend\JobController::class, 'getJobByCompany'])->middleware('auth:sanctum');
    Route::put('/jobs/active', [Frontend\JobController::class, 'changeStatus'])->middleware('auth:sanctum');
});

Route::prefix('companies')->middleware('auth:sanctum')->group(function () {
    Route::put('/{company}/verify', [Frontend\CompanyController::class, 'verify']);
    Route::put('/{company}/lock', [Frontend\CompanyController::class, 'lock']);
    Route::put('/{company}/sponsor', [Frontend\CompanyController::class, 'sponsor']);
    Route::post('/{company}/image', [Frontend\CompanyController::class, 'uploadImage']);
});

Route::get('/companies/top', [Frontend\CompanyController::class, 'getCompany']);

Route::apiResource('company-contacts', Frontend\CompanyCvController::class)->middleware('auth:sanctum');
Route::post('/company-contacts/contacts/{company}/store/{seeker}', [Frontend\CompanyCvController::class, 'storeSeekerContact'])->middleware('auth:sanctum');
Route::get('/company-contacts/contacts/{company}', [Frontend\CompanyCvController::class, 'getContactByCompany'])->middleware('auth:sanctum');
Route::get('/company-contacts/contacts/seekers/{seeker}', [Frontend\CompanyCvController::class, 'getSeekerContact'])->middleware('auth:sanctum');
Route::get('/company-contacts/contacts/anonymous/{anonymous}', [Frontend\CompanyCvController::class, 'getAnonymousContact'])->middleware('auth:sanctum');

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
    Route::post('/{user}/image', [Frontend\UserController::class, 'uploadImage']);
});
