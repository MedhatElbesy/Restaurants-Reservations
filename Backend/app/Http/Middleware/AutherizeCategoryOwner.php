<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AutherizeCategoryOwner
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

//        //validate user
//        $user = User::where('id',Auth::id())->get();
//        $category
//        if( !($user->roles_name == 'admin' && $category->category_scope == "general") || !($category->user_id == Auth::id())){
//
//        }

        return $next($request);
    }
}
