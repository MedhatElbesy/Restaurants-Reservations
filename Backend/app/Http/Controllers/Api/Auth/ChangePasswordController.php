<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ChangePasswordController extends Controller
{
    // this function use to change password for auth user
    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password'          => 'required',
            'new_password'              => ['required', 'min:8' ,'max:20', 'confirmed'],
            'new_password_confirmation' => ['required', 'same:new_password'],
        ]);

        $auth_user = Auth::guard('sanctum')->user();

        // dd(!Hash::check($request->current_password, $auth_user->password)); =>false

        // Match The Old Password
        if(!Hash::check($request->current_password, $auth_user->password)){
            return ApiResponse::sendResponse(400, "Password does not match");
        }

        $user = User::where('id', $auth_user->id)->first();

        if($user) {
            $user->update([
                'password' => $request->new_password
            ]);

            return ApiResponse::sendResponse(200,'Your password has been changed successfully');
        } else {
            return ApiResponse::sendResponse(404, 'User not found');
        }


    }
}
