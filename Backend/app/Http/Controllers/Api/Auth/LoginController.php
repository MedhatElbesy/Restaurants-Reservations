<?php

namespace App\Http\Controllers\Api\Auth;

use App\Enums\UserStatus;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /* this function use to user make login and return access token for you */
    public function create_access_token(Request $request) : JsonResponse
    {
        $user = User::where('status', '=', UserStatus::Active)->where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password))
        {
            if($user->email_verified_at === null){
                return ApiResponse::sendResponse(401, 'You must verify your email first. check your email');
            }

            $device_name = $request->post('device_name', $request->userAgent());
            $token = $user->createToken($device_name);

            $data = [
                'token' => $token->plainTextToken,
                'device_name' => $device_name,
                'user' => new UserResource($user->load('addresses', 'restaurants')),
            ];

            return ApiResponse::sendResponse(201, 'Logged in successfully', $data);

        }else{
            return ApiResponse::sendResponse(401, 'Enter correct email and password.');
        }
    }
}
