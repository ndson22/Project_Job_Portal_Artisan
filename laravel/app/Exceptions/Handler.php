<?php

namespace App\Exceptions;

use Throwable;
use ErrorException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
        $this->renderable(function (NotFoundHttpException $e, $request) {
            return response()->json($e->getMessage(), 404);
        });
        $this->renderable(function (MethodNotAllowedHttpException $e, $request) {
            return response()->json($e->getMessage(), 405);
        });
        $this->renderable(function (ErrorException $e, $request) {
            return response()->json($e->getMessage(), 404);
        });
        $this->renderable(function (QueryException $e, $request) {
            return response()->json($e->getMessage(), 404);
        });
    }
}
