<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class RestaurantLocationCreated extends Notification implements ShouldQueue
{
    use Queueable;

    private $restaurantLocation;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($restaurantLocation)
    {
        $this->restaurantLocation = $restaurantLocation;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('A new restaurant location has been created.')
                    ->action('View Restaurant Location', url('/restaurant-locations/'.$this->restaurantLocation->id))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the broadcast representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'restaurantLocation' => $this->restaurantLocation
        ]);
    }
}
