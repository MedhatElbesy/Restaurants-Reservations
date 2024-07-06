<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Restaurant\StoreRestaurantCategoryRequest;
use App\Http\Requests\Restaurant\UpdateRestaurantCategoryRequest;
use App\Models\RestaurantCategory;

class RestaurantCategoryController extends Controller
{
    public function __construct()
    {
//        $this->middleware('auth:sanctum');
//        $this->middleware('check.restaurant.owner')->only(['update', 'destroy', 'store']);
    }

    public function index()
    {
        $restaurantCategories = RestaurantCategory::all();
        return response()->json($restaurantCategories);
    }

    public function store(StoreRestaurantCategoryRequest $request)
    {

        $restaurantCategory = RestaurantCategory::create($request->validated());
        return response()->json($restaurantCategory, 201);
    }

    public function show($id)
    {
        $restaurantCategory = RestaurantCategory::findOrFail($id);
        return response()->json($restaurantCategory);
    }

    public function update(UpdateRestaurantCategoryRequest $request, $id)
    {
        try {
            $restaurantCategory = RestaurantCategory::findOrFail($id);
            $restaurantCategory->update($request->validated());

            return response()->json([
                'restaurant_category' => $restaurantCategory,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update restaurant category',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function destroy($id)
    {
        $restaurantCategory = RestaurantCategory::findOrFail($id);
        try {
            $restaurantCategory->delete();
            return ApiResponse::sendResponse(204 , 'Successfully Deleted');
        }catch (\Exception $e){
            return ApiResponse::sendResponse(404,"can't delete this category ");
        }
    }

}
