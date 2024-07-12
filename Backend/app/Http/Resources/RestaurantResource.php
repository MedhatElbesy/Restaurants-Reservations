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
            'images'=>RestaurantImagesResource::collection($this->whenLoaded('restaurant_images')),
            'locations' => RestaurantLocationResource::collection($this->whenLoaded('locations')),
            'categories' => CategoryResource::collection($this->whenLoaded('categories')),
            'menu_categories' => MenuCategoryResource::collection($this->whenLoaded('menuCategories')),
            'status' => $this->status,
            
        ];
    }
}
