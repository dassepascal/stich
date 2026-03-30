<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\Lead;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewLeadNotification extends Notification
{
    public function __construct(
        private readonly Lead $lead,
    ) {}

    /** @return list<string> */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Nouveau lead — Kinetic AI')
            ->greeting('Nouveau prospect !')
            ->line("Email : **{$this->lead->email}**")
            ->line("IP : {$this->lead->ip_address}")
            ->line("Inscrit le : {$this->lead->created_at->format('d/m/Y à H:i')}");
    }
}
