<?php
//
//namespace App\Http\Middleware;
//
//use Closure;
//use Illuminate\Http\Request;
//use Illuminate\Support\Facades\Auth;
//use App\Models\RestaurantCategory;
//use App\Models\Restaurant;
//
//class CheckRestaurantOwner
//{
//    public function handle(Request $request, Closure $next)
//    {
//        // Get the authenticated user
//        $user = Auth::guard('sanctum')->user();
//
//        if (!$user) {
//            return response()->json(['error' => 'Unauthorized'], 401);
//        }
//
//        $restaurantCategoryId = $request->route('restaurant_category');
//
//        if ($restaurantCategoryId) {
//            $restaurantCategory = RestaurantCategory::findOrFail($restaurantCategoryId);
//
//            // Get the restaurant
//            $restaurant = Restaurant::findOrFail($restaurantCategory->restaurant_id);
//
//            if ($restaurant->user_id !== $user->id) {
//                return response()->json(['error' => 'Unauthorized'], 403);
//            }
//        }
//
//        return $next($request);
//    }
//}
