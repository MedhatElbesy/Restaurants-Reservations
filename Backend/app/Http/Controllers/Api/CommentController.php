<?php
namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentResource;
use App\Repositories\CommentRepositoryInterface;
use Exception;

class CommentController extends Controller
{
    protected $commentRepository;

    public function __construct(CommentRepositoryInterface $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function index()
    {
        try {
            $comments = $this->commentRepository->getAllComments();
            return ApiResponse::sendResponse(200, "All Comment", $comments);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, "Error", ['error' => $e->getMessage()]);
        }
    }

    public function store(StoreCommentRequest $request)
    {
        try {
            $user = auth()->user();
            $data = array_merge($request->validated(), ['user_id' => $user->id]);
            $result = $this->commentRepository->storeComment($data);

            return ApiResponse::sendResponse(201, "Created successfully", [
                'comment' => new CommentResource($result['comment']),
                'average_rating' => $result['average_rating'],
            ]);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to create comment', ['error' => $e->getMessage()]);
        }
    }

    public function show(string $restaurantId)
    {
        try {
            $result = $this->commentRepository->getCommentsByRestaurantLocationId($restaurantId);

            return ApiResponse::sendResponse(200, 'Comments', [
                'comments' => CommentResource::collection($result['comments']),
                'average_rating' => $result['average_rating'],
            ]);
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Failed to get comments', ['error' => $e->getMessage()]);
        }
    }

    public function update(UpdateCommentRequest $request, $id)
    {
        try {
            $comment = $this->commentRepository->updateComment($id, $request->validated());
            return ApiResponse::sendResponse(200, 'Comment updated successfully', new CommentResource($comment));
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Fail to update comment', ['error' => $e->getMessage()]);
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->commentRepository->deleteComment($id);
            return ApiResponse::sendResponse(200, 'Comment deleted successfully');
        } catch (Exception $e) {
            return ApiResponse::sendResponse(500, 'Fail to delete comment', ['error' => $e->getMessage()]);
        }
    }
}
