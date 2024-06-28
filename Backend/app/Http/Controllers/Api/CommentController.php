<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Restaurant;
use App\Models\RestaurantLocation;
use Exception;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCommentRequest $request)
    {
        try {
            $comment = Comment::create($request->validated());
            return ApiResponse::sendResponse(201,"created successfully",$comment);
        }catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to create comment', ['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $restaurantId)
    {
        try {
            $restaurant = Restaurant::findOrFail($restaurantId);
            $comments = $restaurant->comments()->get();
            return ApiResponse::sendResponse(200, 'comments',CommentResource::collection($comments));
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to get comments', ['error' => $e->getMessage()]);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, $id)
    {
        try {
            $comment = Comment::findOrFail($id);
            $comment->update($request->validated());
            return ApiResponse::sendResponse(200, 'comment updated successfully',new CommentResource($comment));
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Fail to update comment', ['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $comment = Comment::findOrFail($id);
            $comment->delete();
            return ApiResponse::sendResponse(200, 'comment deleted successfully');
        }catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Fail to delete comment', ['error' => $e->getMessage()]);
        }
    }
}
