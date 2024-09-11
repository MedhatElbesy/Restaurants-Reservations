<?php
namespace App\Repositories;

use App\Models\Comment;
use App\Models\RestaurantLocation;
use Exception;

class CommentRepository implements CommentRepositoryInterface
{
    public function getAllComments()
    {
        return Comment::all();
    }

    public function storeComment(array $data)
    {
        $comment = Comment::create($data);
        $comment->load('user');
        $restaurant = RestaurantLocation::findOrFail($data['restaurant_location_id']);
        $averageRating = $restaurant->averageRating();

        return [
            'comment' => $comment,
            'average_rating' => $averageRating,
        ];
    }

    public function getCommentsByRestaurantLocationId(string $restaurantId)
    {
        $restaurant = RestaurantLocation::findOrFail($restaurantId);
        $comments = $restaurant->comments()->with('user')->get();
        $averageRating = $restaurant->averageRating();

        return [
            'comments' => $comments,
            'average_rating' => $averageRating,
        ];
    }

    public function updateComment(int $id, array $data)
    {
        $comment = Comment::findOrFail($id);
        $comment->update($data);
        return $comment;
    }

    public function deleteComment(int $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
    }
}
