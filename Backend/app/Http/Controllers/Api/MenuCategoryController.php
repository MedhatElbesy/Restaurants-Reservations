<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MenuCategoryController extends Controller
{
    public function index()
    {
        $menuCategories = MenuCategory::all();
        return response()->json($menuCategories, 201);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'restaurant_id' => 'required|exists:restaurants,id',
                'name' => 'required|string',
                'slug' => 'required|string|unique:menu_categories,slug',
                'description' => 'nullable|string',
                'status' => 'required|in:Enabled,Disabled,Deleted',
            ]);

            $menuCategory = MenuCategory::create($validated);

            return ApiResponse::sendResponse(201, 'Successfully Saved', $menuCategory);
        } catch (ValidationException $e) {
            return ApiResponse::sendResponse(422, 'Validation Error', $e->errors());
        }
    }

    public function show($id)
    {
        try {
            $menuCategory = MenuCategory::findOrFail($id);
            return response()->json($menuCategory, 201);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Menu category not found'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $menuCategory = MenuCategory::findOrFail($id);

            $validated = $request->validate([
                'restaurant_id' => 'required|exists:restaurants,id',
                'name' => 'required|string',
                'slug' => 'required|string|unique:menu_categories,slug,' . $menuCategory->id,
                'description' => 'nullable|string',
                'status' => 'required|in:Enabled,Disabled,Deleted',
            ]);

            $menuCategory->update($validated);

            return ApiResponse::sendResponse(200, 'Successfully Updated', $menuCategory);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::sendResponse(404, 'Menu category not found', $e->getMessage());
        } catch (ValidationException $e) {
            return ApiResponse::sendResponse(422, 'Validation Error', $e->errors());
        }
    }

    public function destroy($id)
    {
        try {
            $menuCategory = MenuCategory::findOrFail($id);
            $menuCategory->delete();

            return ApiResponse::sendResponse(204, 'Category deleted successfully');
        } catch (ModelNotFoundException $e) {
            return ApiResponse::sendResponse(404, 'Menu category not found', $e->getMessage());
        }
    }
}
