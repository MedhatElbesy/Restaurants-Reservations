<?php
namespace App\Repositories;

use App\Models\Comment;

interface CommentRepositoryInterface
{
    public function getAllComments();

    public function storeComment(array $data);

    public function getCommentsByRestaurantLocationId(string $restaurantId);

    public function updateComment(int $id, array $data);

    public function deleteComment(int $id);
}
