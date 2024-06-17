<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

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
            'name' => 'sometimes|required|unique:categories,name,' . $category->id,
            'slug' => 'sometimes|required|unique:categories,slug,' . $category->id,
            'cover' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'required|in:Enabled,Disabled,Deleted',
        ]);

        $category->update($request->all());

        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
