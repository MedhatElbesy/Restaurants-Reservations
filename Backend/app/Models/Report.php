<?php

namespace App\Models;

use App\Enums\ItemStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

        protected $fillable = ['restaurant_location_id', 'user_id', 'report', 'status'];

        public static function updateRestaurantLocationStatus($restaurantLocationId)
        {
            $reportedCount = self::where('restaurant_location_id', $restaurantLocationId)
                ->whereIn('status', ["1"])
                ->count();

            if ($reportedCount >= 3) {
                $restaurantLocation = RestaurantLocation::find($restaurantLocationId);
                if ($restaurantLocation) {
                    $restaurantLocation->status = ItemStatus::Reported;
                    $restaurantLocation->save();
                }
            }
        }


    protected static function booted()
    {
        static::saved(function ($report) {
            self::updateRestaurantLocationStatus($report->restaurant_location_id);
        });
    }
}
