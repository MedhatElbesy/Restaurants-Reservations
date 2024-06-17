<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Traits\UploadImageTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    use UploadImageTrait;

    /* Show Profile of any user */
    public function profile(User $user) :JsonResponse
    {
        if (!$user) {
            return ApiResponse::sendResponse(404, 'User not found');
        }

        $data = $user->load('addresses', 'restaurants',
            'restaurants.images',
            'restaurants.locations',
            'restaurants.categories'
        );

        return ApiResponse::sendResponse(200, 'Data fetched successfully', new UserResource($data));
    }

    /* Update User Profile */
    public function updateProfile(StoreUserRequest $request, User $user) : JsonResponse
    {
        $old_image = $user->profile_image;
        $data = $request->except('profile_image', '_token');

        $data['profile_image'] = $this->uploadImage($request, 'profile_image', 'users');

        if (!$request->hasFile('profile_image')) {
            unset($data['profile_image']);
        }

        $user->update($data);

        if ($old_image && isset($data['profile_image'])) {
            Storage::disk('public')->delete($old_image);
        }

        return response()->json([
            'message' => "Account updated successfully",
            'user' => $user->load('country', 'city')
        ], 200);
    }


    /* Delete User Account */
    public function deleteAccount(User $user)
    {
        $user->delete();
        if ($user->profile_image) {
            Storage::disk('public')->delete($user->profile_image);
        }
        return response()->json([
            'message' => "Account deleted successfully!",
        ], 200);
    }
}
