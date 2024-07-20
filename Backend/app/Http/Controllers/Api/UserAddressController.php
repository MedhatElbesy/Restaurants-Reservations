<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserAddress\StoreUserAddressRequest;
use App\Http\Requests\UserAddress\UpdateUserAddressRequest;
use App\Http\Resources\UserAddressResource;
use App\Models\RestaurantLocation;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserAddressController extends Controller
{
    public function index(User $user): JsonResponse
    {
        $userAddresses = $user->addresses;

        if ($userAddresses->isEmpty()) {
            return ApiResponse::sendResponse(400, 'User has no addresses');
        }

        return ApiResponse::sendResponse(200, 'User addresses fetched successfully', UserAddressResource::collection($userAddresses));
    }

    public function store(StoreUserAddressRequest $request, User $user): JsonResponse
    {
        $userAddress = $user->addresses()->create($request->validated());
        return ApiResponse::sendResponse(201, 'User address created successfully', new UserAddressResource($userAddress));
    }

    public function show(User $user, UserAddress $userAddress): JsonResponse
    {
        if ($userAddress->user_id !== $user->id) {
            return ApiResponse::sendResponse(404, 'Address not found for this user');
        }

        return ApiResponse::sendResponse(200, 'User address fetched successfully', new UserAddressResource($userAddress));
    }

    public function update(UpdateUserAddressRequest $request, User $user, UserAddress $userAddress): JsonResponse
    {
        if ($userAddress->user_id !== $user->id) {
            return ApiResponse::sendResponse(404, 'Address not found for this user');
        }

        $userAddress->update($request->validated());
        return ApiResponse::sendResponse(200, 'User address updated successfully', new UserAddressResource($userAddress));
    }

    public function destroy(User $user, UserAddress $userAddress): JsonResponse
    {
        if ($userAddress->user_id !== $user->id) {
            return ApiResponse::sendResponse(404, 'Address not found for this user');
        }

        $userAddress->delete();
        return ApiResponse::sendResponse(200, 'User address deleted successfully');
    }

    

}
