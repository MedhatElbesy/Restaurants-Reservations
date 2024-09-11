<?php

namespace App\Repositories\MenuCategory;

use App\Models\MenuCategory;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MenuCategoryRepository implements MenuCategoryRepositoryInterface
{
    public function getAll(): Collection
    {
        return MenuCategory::all();
    }

    public function create(array $data): MenuCategory
    {
        return MenuCategory::create($data);
    }

    public function findById(int $id): ?MenuCategory
    {
        return MenuCategory::findOrFail($id);
    }

    public function getByRestaurantId(int $restaurantId): Collection
    {
        return MenuCategory::where('restaurant_id', $restaurantId)
                            ->with('menuItems')
                            ->get();
    }

    public function update(int $id, array $data): bool
    {
        $menuCategory = $this->findById($id);
        return $menuCategory->update($data);
    }

    public function delete(int $id): bool
    {
        $menuCategory = $this->findById($id);
        return $menuCategory->delete();
    }
}
