<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ClientAcknowledgementMail extends Mailable
{
    use Queueable, SerializesModels;

    public $lead;
    public string $type;

    /**
     * Create a new message instance.
     */
    public function __construct($lead, string $type = 'contact')
    {
        $this->lead = $lead;
        $this->type = $type;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $subject = $this->type === 'consultation'
            ? "Thank you for your consultation request, {$this->lead->name}! — Someshwar Holkar"
            : "Received your message: \"{$this->lead->subject}\" — Someshwar Holkar";

        return new Envelope(
            subject: $subject,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.client-acknowledgement',
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
