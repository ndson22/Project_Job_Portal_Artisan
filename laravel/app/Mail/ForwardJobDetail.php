<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForwardJobDetail extends Mailable
{
    use Queueable, SerializesModels;

    public $jobPost, $company;

    public function __construct($jobPost)
    {
        $this->jobPost = $jobPost;
        $this->company = $jobPost->company;
    }

    public function build()
    {
        $subject = '[Artisans] ' . $this->company->name . ' - ' . $this->jobPost->title;
        return $this->subject($subject)->view('emails.forward-job-post');
    }
}
