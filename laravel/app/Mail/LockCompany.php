<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyCompany extends Mailable
{
    use Queueable, SerializesModels;

    public $company;

    public function __construct($company)
    {
        $this->company = $company;
    }

    public function build()
    {
        $subject = $this->company->locked_at ? "[Artisans] Your company's profile is locked" : "[Artisans] Your company's profile is unlocked";
        return $this->subject($subject)->view('emails.verify-company-light');
    }
}
