<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyUser extends Mailable
{
    use Queueable, SerializesModels;

    public $request, $userId;

    public function __construct($request, $user)
    {
        $this->request = $request;
        $this->userId = $user->id;
    }

    public function build()
    {
        return $this->subject("[Artisans] Confirmation instructions for account")->view('emails.verify-user-light');
    }
}
