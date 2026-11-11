<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewLeadNotificationMail extends Mailable
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
            ? "[Portfolio Alert] New Consultation Booking from {$this->lead->name} ({$this->lead->project_type})"
            : "[Portfolio Alert] New Contact Inquiry from {$this->lead->name}: \"{$this->lead->subject}\"";

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
            view: 'emails.admin-new-lead',
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
