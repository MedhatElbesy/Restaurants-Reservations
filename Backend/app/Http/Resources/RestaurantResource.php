<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RestaurantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {


        $totalCommentsCount = $this->locations->sum(function ($location) {
            return $location->comments_count;
        });


        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'logo' => $this->logo_url,
            'cover' => $this->cover_url,
            'name' => $this->name,
            'slug' => $this->slug,
            'title' => $this->title,
            'summary' => $this->summary,
            'description' => $this->description,
            "hot_line"=>$this->hot_line,
            'images' => RestaurantImagesResource::collection($this->whenLoaded('restaurant_images')),
            'locations' => RestaurantLocationResource::collection($this->whenLoaded('locations')),
            'categories' => $this->categories->pluck('name'),
            // 'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            // 'menu_categories' => MenuCategoryResource::collection($this->whenLoaded('menuCategories')),
            'status' => $this->status,
            'average_rating' => $this->average_rating,
            'total_comments_count' => $totalCommentsCount,

        ];
    }
}
