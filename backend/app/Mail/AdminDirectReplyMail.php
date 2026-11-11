<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AdminDirectReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $recipientName;
    public string $recipientEmail;
    public string $mailSubject;
    public string $mailMessage;
    public $lead;

    /**
     * Create a new message instance.
     */
    public function __construct(
        string $recipientName,
        string $recipientEmail,
        string $mailSubject,
        string $mailMessage,
        $lead = null
    ) {
        $this->recipientName = $recipientName;
        $this->recipientEmail = $recipientEmail;
        $this->mailSubject = $mailSubject;
        $this->mailMessage = $mailMessage;
        $this->lead = $lead;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->mailSubject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.admin-direct-reply',
        );
    }

    /**
     * Get the attachments for the message.
     */
    public function attachments(): array
    {
        return [];
    }
}
