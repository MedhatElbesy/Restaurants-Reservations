<?php

use App\Enums\UserStatus;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('mobile_number')->unique()->nullable();
            $table->string('password');
            $table->string('profile_image')->nullable();
            $table->enum('gender', ['female', 'male'])->nullable();
            $table->date('birth_date')->nullable();
            //$table->enum('role', ['user', 'business'])->default('user');
            $table->enum('roles_name', ['user', 'admin', 'owner'])->default('user');
            $table->enum('status', [UserStatus::Active, UserStatus::InActive, UserStatus::Blocked, UserStatus::Deleted])->default(UserStatus::Active);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('google_id')->nullable();
            $table->string('facebook_id')->nullable();
            $table->string('twitter_id')->nullable();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });

        $admin = User::create([
            'first_name'    => 'Admin',
            'last_name'     => 'one',
            'email'         => 'admin@gmail.com',
            'password'      => 'admin',
            'roles_name'    => "admin",
            'status'        => UserStatus::Active,
            'created_at'    => now(),
            'updated_at'    => now(),
            'email_verified_at'=> now()
        ]);

        /*create role administrator and assign all permissions for this role*/
        $role_admin = Role::create(['name' => 'admin', 'guard_name' => 'web']);

        $permissions = Permission::pluck('id','id')->all();

        $role_admin->syncPermissions($permissions);
        $admin->assignRole([$role_admin->id]);

        $restaurant = User::create([
            'first_name'    => 'Restaurant',
            'last_name'     => 'One',
            'email'         => 'restaurant@gmail.com',
            'password'      => 'restaurant',
            'roles_name'    => "owner",
            'status'        => UserStatus::Active,
            'created_at'    => now(),
            'updated_at'    => now(),
            'email_verified_at'=> now()
        ]);

        /*create role restaurant and assign all permissions for this role*/
        $role_restaurant = Role::create(['name' => 'owner', 'guard_name' => 'web']);
        $restaurant->assignRole([$role_restaurant->id]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
