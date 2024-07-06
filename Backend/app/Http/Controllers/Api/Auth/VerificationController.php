<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\UserActivation;

class VerificationController extends Controller
{
    /* Check user Activation Code sent on mail and activate account if code right*/
    public function verifyEmail($token)
    {
        $verifyUser = UserActivation::where('token', $token)->first();

        if (!is_null($verifyUser)) {
            $user = $verifyUser->user;

            if ($user) {
                if ($user->email_verified_at !== null) {
                    return ApiResponse::sendResponse(401, 'Your email has already been verified! Sign in');
                } else {
                    $verifyUser->user->email_verified_at = now();
                    $verifyUser->user->save();
                    UserActivation::where('token', $token)->delete();

                    return ApiResponse::sendResponse(200, 'Your email has been verified successfully');
                }
            } else {
                return ApiResponse::sendResponse(404, 'User not found');
            }
        }

        return ApiResponse::sendResponse(400, 'Invalid code!');
    }
}