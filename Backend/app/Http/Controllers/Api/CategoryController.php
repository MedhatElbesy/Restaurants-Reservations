<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Models\Category;
use App\Models\Restaurant;
use App\Traits\UploadImageTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class CategoryController extends Controller
{
    use UploadImageTrait;

    public function index()
    {
        return Category::all();
    }

    public function store(StoreCategoryRequest $request)
    {
        $data = $request->except('cover', '_token', '_method');
        $data['cover'] = $this->uploadImage($request, 'cover', 'categories');
//
//       return ApiResponse::sendResponse(200,"data",Auth::guard('sanctum')->user());

        //specify category scope
        $user = Auth::guard('sanctum')->user();
        if($user->roles_name == "admin"){
           $data['category_scope']='general';
        }else{
            $data['category_scope']='specific';
        }

        $data['user_id'] = $user->id;
        $category = Category::create($data);

        return response()->json($category, 201);
    }

    public function show($restaurant_id)
    {
        $restaurant = Restaurant::findOrFail($restaurant_id);
        $categories = $restaurant->categories()->get();
            return ApiResponse::sendResponse(200, 'categories', $categories);
    }


    public function update(Request $request, Category $category)
    {

        $request->validate([
            'name' => [
                'sometimes',
                'required'
            ],
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:Enabled,Disabled,Deleted',
        ]);

        try {
            //validate user
            $user = Auth::guard('sanctum')->user();

            if (!($user->roles_name == 'admin' && $category->category_scope == 'general') && $category->user_id != $user->id) {
                throw new \Exception("You can't update this category");
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

    public function showCategoriesByName($name)
    {
        $restaurants = Restaurant::whereHas('categories', function ($query) use ($name) {
            $query->whereRaw('LOWER(name) = ?', [strtolower($name)]);
        })
        ->with(['locations' => function ($query) {
            $query->select('id', 'restaurant_id', 'address')
                ->withAvg('ratings', 'rate');
        }])
        ->select('id', 'user_id', 'logo', 'cover', 'name', 'slug', 'title', 'summary', 'description', 'rating', 'hot_line', 'status')
        ->get();

    if ($restaurants->isEmpty()) {
        return ApiResponse::sendResponse(404, 'No restaurants found for category');
    }
    $transformedRestaurants = $restaurants->map(function ($restaurant) {
        $totalRating = 0;
        $count = 0;

        foreach ($restaurant->locations as $location) {
            if ($location->ratings_avg_rate) {
                $totalRating += $location->ratings_avg_rate;
                $count++;
            }
        }
        $restaurant->average_rating = $count > 0 ? $totalRating / $count : 0;
        $restaurant->location_addresses = $restaurant->locations->map(function ($location) {
            return [
                'address' => $location->address
            ];
        });
        unset($restaurant->locations);
        return $restaurant;
    });
    return ApiResponse::sendResponse(200, 'Restaurants with category ' . $name, $transformedRestaurants);
}




    public function destroy(Category $category)
    {
//           //validate user
//            $user = Auth::guard('sanctum')->user();
//
//            if (!($user->roles_name == 'admin' && $category->category_scope == 'general') && $category->user_id != $user->id) {
//                throw new \Exception("You can't update this category");
//            }
        $category->delete();

        return response()->json(null, 204);
    }
    public function getOwnerCategories(){
        $category = Category::where('user_id',Auth::guard('sanctum')->user()->id)->get();
        return ApiResponse::sendResponse(201,"",$category);
    }
}

