<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VertifyUser extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct()
    {
        $this->data = 'test';
    }

    public function build()
    {
        return $this->subject("[Artisans] Xác nhận email")->view('emails.vertify-user');
    }
}
