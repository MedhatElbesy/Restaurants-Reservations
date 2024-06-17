<?php

namespace App\Http\Controllers\Api\Auth;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class LogoutController extends Controller
{
    /* function destroy_token used to log out and destroy toke */
    public function destroy_token($token = null)
    {
        $user = Auth::guard('sanctum')->user();

        if(!$user){
            return ApiResponse::sendResponse(401, 'Unauthenticated');
        }

        if ( $token === null) {
            $user->tokens->each(function($token, $key) {
                $token->delete();
            });

            return ApiResponse::sendResponse(200, 'Logged out successfully');
        }

        $personalAccessToken = PersonalAccessToken::findToken($token);

        if ($user->id === $personalAccessToken->tokenable_id && get_class($user) == $personalAccessToken->tokenable_type) {
            $personalAccessToken->delete();
        }
    }
}
