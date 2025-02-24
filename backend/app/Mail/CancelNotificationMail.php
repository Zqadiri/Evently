<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CancelNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public $event;

    /**
     * Create a new message instance.
     * @return void
     */
    public function __construct($user, $event)
    {
        $this->user = $user;
        $this->event = $event;
    }

    public function build()
    {
        return $this->view('emails.cancel')
            ->with([
                'full name' => $this->user->full_name,
                'event title' => $this->event->title,
                'date' => $this->event->date,
            ]);
    }
}
