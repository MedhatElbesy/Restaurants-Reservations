<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\RestaurantCategory;

class CheckRestaurantOwner
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();

        $user = Auth::guard('api')->user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $restaurantCategoryId = $request->route('id');

        if ($restaurantCategoryId) {
            $restaurantCategory = RestaurantCategory::findOrFail($restaurantCategoryId);

            if ($restaurantCategory->restaurant->user_id !== $user->id) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }
        }

        return $next($request);
    }
}
