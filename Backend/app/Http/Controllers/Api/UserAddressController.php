<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserAddress\StoreUserAddressRequest;
use App\Http\Requests\UserAddress\UpdateUserAddressRequest;
use App\Http\Resources\UserAddressResource;
use App\Models\UserAddress;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserAddressController extends Controller
{
    public function index(): JsonResponse
    {
        $userAddresses = UserAddress::all();
        return ApiResponse::sendResponse(200, 'User addresses fetched successfully', UserAddressResource::collection($userAddresses));
    }

    public function store(StoreUserAddressRequest $request): JsonResponse
    {
        $userAddress = UserAddress::create($request->validated());
        return ApiResponse::sendResponse(201, 'User address created successfully', new UserAddressResource($userAddress));
    }

    public function getUserAddressByUserId($user_id) : JsonResponse {
        $userAddress = UserAddress::where('user_id', $user_id)->get();

        if(!$userAddress->isEmpty()){
            return ApiResponse::sendResponse(200, 'User addresses fetched successfully', new UserAddressResource($userAddress));
        }

        else {
            return ApiResponse::sendResponse(400, 'User not have addresses');
        }
    }

    public function show(UserAddress $userAddress): JsonResponse
    {
        return ApiResponse::sendResponse(200, 'User address fetched successfully', new UserAddressResource($userAddress));
    }

    public function update(UpdateUserAddressRequest $request, UserAddress $userAddress): JsonResponse
    {
        $userAddress->update($request->validated());
        return ApiResponse::sendResponse(200, 'User address updated successfully', new UserAddressResource($userAddress));
    }

    public function destroy(UserAddress $userAddress): JsonResponse
    {
        $userAddress->delete();
        return ApiResponse::sendResponse(200, 'User address deleted successfully');
    }
}
