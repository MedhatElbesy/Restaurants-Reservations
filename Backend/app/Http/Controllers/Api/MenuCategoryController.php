<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Repositories\MenuCategory\MenuCategoryRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MenuCategoryController extends Controller
{
    protected $menuCategoryRepository;

    public function __construct(MenuCategoryRepositoryInterface $menuCategoryRepository)
    {
        $this->menuCategoryRepository = $menuCategoryRepository;
    }

    public function index()
    {
        $menuCategories = $this->menuCategoryRepository->getAll();
        return response()->json($menuCategories, 201);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'restaurant_id' => 'required|exists:restaurants,id',
                'name' => 'required|string',
                'description' => 'nullable|string',
                'status' => 'required|in:Enabled,Disabled,Deleted',
            ]);

            $menuCategory = $this->menuCategoryRepository->create($validated);

            return ApiResponse::sendResponse(201, 'Successfully Saved', $menuCategory);
        } catch (ValidationException $e) {
            return ApiResponse::sendResponse(422, 'Validation Error', $e->errors());
        }
    }

    public function show($id)
    {
        try {
            $menuCategory = $this->menuCategoryRepository->findById($id);
            return response()->json($menuCategory, 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Menu category not found'], 404);
        }
    }

    public function getMenuCategoryByRestaurantId($restaurantId)
    {
        try {
            $menuCategories = $this->menuCategoryRepository->getByRestaurantId($restaurantId);
            return ApiResponse::sendResponse(200, "Menu categories for restaurant", $menuCategories);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::sendResponse(404, 'Restaurant not found', $e->getMessage());
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'restaurant_id' => 'required|exists:restaurants,id',
                'name' => 'required|string',
                'description' => 'nullable|string',
                'status' => 'required|in:Enabled,Disabled,Deleted',
            ]);

            $this->menuCategoryRepository->update($id, $validated);

            return ApiResponse::sendResponse(200, 'Successfully Updated', $validated);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::sendResponse(404, 'Menu category not found', $e->getMessage());
        } catch (ValidationException $e) {
            return ApiResponse::sendResponse(422, 'Validation Error', $e->errors());
        }
    }

    public function destroy($id)
    {
        try {
            $this->menuCategoryRepository->delete($id);

            return ApiResponse::sendResponse(204, 'Category deleted successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::sendResponse(404, 'Menu category not found', $e->getMessage());
        }
    }
}
