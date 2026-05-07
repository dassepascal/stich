<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SubscriptionConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Subscriber $subscriber) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Bienvenue dans la newsletter KINETIC AI ✦',
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.subscription-confirmation',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
