<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    public function index()
    {
        $items = MenuItem::all();
        return ApiResponse::sendResponse(200, 'Menu items retrieved successfully', $items);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'menu_category_id' => 'required|exists:menu_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'status' => 'required|in:Available,Unavailable'
        ]);

        $menuItem = MenuItem::create($validatedData);

        return ApiResponse::sendResponse(201, 'Menu item created successfully', $menuItem);
    }

    public function show($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        return ApiResponse::sendResponse(200, 'Menu item retrieved successfully', $menuItem);
    }

    public function update(Request $request, $id)
    {
        $menuItem = MenuItem::findOrFail($id);

        $validatedData = $request->validate([
            'menu_category_id' => 'required|exists:menu_categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'status' => 'required|in:Available,Unavailable'
        ]);

        $menuItem->update($validatedData);

        return ApiResponse::sendResponse(200, 'Menu item updated successfully', $menuItem);
    }

    public function destroy($id)
    {
        $menuItem = MenuItem::findOrFail($id);
        $menuItem->delete();

        return ApiResponse::sendResponse(200, 'Menu item deleted successfully');
    }


    public function getMenuItemByMenuCategoryId($menuCategoryId)
    {
        try {
            $restaurant = MenuCategory::findOrFail($menuCategoryId);
            $menuItems = MenuItem::where('menu_category_id', $menuCategoryId)->get();
            return ApiResponse::sendResponse(200,"menu Items for Category",$menuItems);
        } catch (ModelNotFoundException $e) {
            return ApiResponse::sendResponse(404, 'Menu Item not found',  $e->getMessage());
        }
    }
}
