<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $permissions = [
            'view-dashboard',

            'can-create',
            'can-edit',
            'can-delete',
            'can-publish',
            'can-preview',
            'can-assign-roles',

            'manage-countries',
            'manage-governorates',
            'manage-cities',
            'manage-states',

            'manage-permissions',
            'manage-roles',

            'manage-users',
            'manage-user-addresses',

            'manage-restaurants',
            'manage-restaurant-locations',

            'manage-categories',
            'manage-restaurant-categories',

            'manage-menu-categories',
            'manage-menu-items',

            'manage-tables',
            'manage-table-availabilities',

            'manage-payments',

            'manage-contacts',
            'manage-reports',
            'manage-activityLogs',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seed_permissions');
    }
};
