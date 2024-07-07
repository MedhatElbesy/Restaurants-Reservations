<?php

namespace App\Events;

use App\Models\RestaurantLocation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ReservationCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $restaurantLocation;

    /**
     * Create a new event instance.
     *
     * @param RestaurantLocation $restaurantLocation
     */
    public function __construct(RestaurantLocation $restaurantLocation)
    {
        $this->restaurantLocation = $restaurantLocation;
    }


    public function broadcastOn()
    {
        return new Channel('notifications');
    }

    public function broadcastAs()
    {
        return 'ReservationCreated';
    }
}
