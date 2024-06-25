<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\ApiResponse;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;


class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories,name',
            'slug' => 'required|unique:categories,slug',
            'cover' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'required|in:Enabled,Disabled,Deleted',
        ]);

        $category = Category::create($request->all());

        return response()->json($category, 201);
    }

    public function show(Category $category)
    {
        return $category;
    }

   
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => [
                'sometimes',
                'required'
            ],
            'slug' => [
                'sometimes',
                'required'
            ],
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
            'status' => 'required|in:Enabled,Disabled,Deleted',
        ]);

        try {
            $category->fill($request->all());
            if ($request->hasFile('cover')) {
                $cover = $request->file('cover');
                $coverName = time() . '_cover.' . $cover->getClientOriginalExtension();

                if ($cover->move(public_path('images'), $coverName)) {
                    $category->cover = $coverName;
                } else {
                    throw new \Exception('Failed to upload cover image');
                }
            }

            $category->save();

            return ApiResponse::sendResponse(200, 'Category updated successfully', $category);
        } catch (\Throwable $e) {
            DB::rollback();
            return ApiResponse::sendResponse(500, 'Failed to update category', ['error' => $e->getMessage()]);
        }
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
