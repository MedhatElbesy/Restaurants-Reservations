<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ResetPasswordController extends Controller
{
    public function verifyFromSentToken($token) : JsonResponse
    {
        $check_token = DB::table('password_reset_tokens')->where('token', $token)->first();

        if(!$check_token){
            return ApiResponse::sendResponse(400, 'Invalid forget password code');
        }else{
            return ApiResponse::sendResponse(200, 'Correct code! Reset your password', $check_token);
        }
    }

    public function resetPassword(Request $request) : JsonResponse
    {
        $request->validate([
            'email'                 =>'required|email|exists:users,email',
            'password'              =>'required|min:8|confirmed',
            'password_confirmation' =>'required|same:password',
        ]);

        $user = User::where('email', $request->email)->first();

        $check_token = DB::table('password_reset_tokens')->where('email', $request->email)->first();

        if(!$check_token){
            return ApiResponse::sendResponse(400, 'Error occurred! Request the password reset code again');
        }else{
            $user->update([
                'password' => $request->password
            ]);

            DB::table('password_reset_tokens')->where([
                'email'=>$request->email
            ])->delete();

            return ApiResponse::sendResponse(200, 'Reset password successfully! You can now log in');
        }
    }
}
