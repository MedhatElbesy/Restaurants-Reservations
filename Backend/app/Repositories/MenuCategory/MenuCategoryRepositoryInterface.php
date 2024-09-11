<?php

namespace App\Repositories\MenuCategory;

use App\Models\MenuCategory;
use Illuminate\Database\Eloquent\Collection;

interface MenuCategoryRepositoryInterface
{
    public function getAll(): Collection;

    public function create(array $data): MenuCategory;

    public function findById(int $id): ?MenuCategory;

    public function getByRestaurantId(int $restaurantId): Collection;

    public function update(int $id, array $data): bool;

    public function delete(int $id): bool;
}
