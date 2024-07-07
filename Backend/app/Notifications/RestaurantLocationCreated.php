<?php

namespace App\Notifications;

use App\Models\RestaurantLocation;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class RestaurantLocationCreated extends Notification implements ShouldQueue
{
    use Queueable;

    protected $restaurantLocation;

    public function __construct(RestaurantLocation $restaurantLocation)
    {
        $this->restaurantLocation = $restaurantLocation;
    }

    public function via($notifiable)
    {
        return ['broadcast'];
    }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage([
            'message' => 'A new restaurant location has been created!',
            'location' => $this->restaurantLocation,
        ]);
    }
}
