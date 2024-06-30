<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\ApiResponse;
use App\Http\Requests\StoreCategory;
use App\Models\Category;
use App\Models\User;
use App\Traits\UploadImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use mysql_xdevapi\Exception;


class CategoryController extends Controller
{
    use UploadImageTrait;
    public function index()
    {
        return Category::all();
    }

    public function store(StoreCategory $request)
    {
        $data = $request->except('cover', '_token', '_method');
        $data['cover'] = $this->uploadImage($request, 'cover', 'categories');

        $data['user_id'] = Auth::id(); //owner of the category


        //specify category scope
        $user = User::when('id',Auth::id())->get();
        if($user->role_name == "admin"){
           $data['category_scope']='general';
        }else{
            $data['category_scope']='specific';
        }

        $category = Category::create($data);

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
            //validate user
            $user = User::where('id',Auth::id())->get();
            if( !($user->role_name == 'admin' && $category->category_scope == "general") || !($category->user_id == Auth::id())){
                 throw new \Exception("can't update this category");
            }


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
    public function getOwnerCategories(){
        $category = Category::where('user_id',Auth::id())->get();
        return ApiResponse::sendResponse(201,"",$category);
    }
}

