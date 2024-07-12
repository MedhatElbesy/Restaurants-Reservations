<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\owner\StoreOwnerRequest;
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
        $owners = User::where('roles_name','owner')->get();
        return ApiResponse::sendResponse(201,"Owners",$owners);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOwnerRequest $request)
    {
        //store the user data
        $new_owner = $request->except('restaurant_id');


        //new owner of a restaurant
        $restaurant = Restaurant::where('id',$request['restaurant_id'])->first();
        $restaurant['owner_id'] = $new_owner['id'];


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

    }
}
