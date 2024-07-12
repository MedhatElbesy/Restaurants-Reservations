<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\owner\StoreOwnerRequest;
use App\Http\Requests\owner\UpdateOwnerRequest;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;

class OwnersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $owners = User::where('roles_name', 'owner')->get();
        return ApiResponse::sendResponse(200, "Owners", $owners);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOwnerRequest $request)
    {
        // Store the owner data
        $new_owner = $request->except('restaurant_id');
        $new_owner['roles_name'] = 'owner';
        $owner = User::create($new_owner);

        // Associate the new owner with a restaurant
        $restaurant = Restaurant::find($request['restaurant_id']);
        if (!$restaurant) {
            return ApiResponse::sendResponse(404, 'Restaurant not found');
        }
        $restaurant->owner_id = $owner->id;
        $restaurant->save();

        return ApiResponse::sendResponse(201, 'Owner created', $owner);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if ($user && $user->roles_name == 'owner') {
            return ApiResponse::sendResponse(200, "Owner", $user);
        } else {
            return ApiResponse::sendResponse(404, "Owner not found");
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOwnerRequest $request, string $id)
    {
        $owner = User::find($id);

        if ($owner && $owner->roles_name == 'owner') {
            $owner->update($request->except('restaurant_id'));

            // Update the restaurant if restaurant_id is provided
            if ($request->has('restaurant_id')) {
                $restaurant = Restaurant::find($request['restaurant_id']);
                if (!$restaurant) {
                    return ApiResponse::sendResponse(404, 'Restaurant not found');
                }
                $restaurant->owner_id = $owner->id;
                $restaurant->save();
            }

            return ApiResponse::sendResponse(200, 'Owner updated', $owner);
        } else {
            return ApiResponse::sendResponse(404, 'Owner not found');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $owner = User::find($id);

        if ($owner && $owner->roles_name == 'owner') {
            $owner->delete();

            Restaurant::where('owner_id', $id)->update(['owner_id' => null]);

            return ApiResponse::sendResponse(200, 'Owner deleted');
        } else {
            return ApiResponse::sendResponse(404, 'Owner not found');
        }
    }
}
