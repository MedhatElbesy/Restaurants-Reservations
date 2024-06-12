<?php

use App\Models\Admin;
use App\Enums\UserStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('mobile_number')->unique()->nullable();
            $table->string('password');
            $table->text('profile_image')->nullable();
            $table->text('roles_name');
            $table->text('bio')->nullable();
            $table->enum('status', [UserStatus::Active , UserStatus::InActive , UserStatus::Blocked , UserStatus::Deleted])->default(UserStatus::Active)->index();
            $table->softDeletes();
            $table->timestamps();
        });


        $admin = Admin::create([
            'name'          => 'Admin',
            'email'         => 'admin@gmail.com',
            'password'      => bcrypt('admin'),
            'roles_name'    => ["administrator"],
            'status'        => UserStatus::Active,
            'bio'           => 'Website Administrator',
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);

        /*create role administrator and assign all permissions for this role*/
        $role = Role::create(['name' => 'administrator', 'guard_name' => 'admin']);

        $permissions = Permission::pluck('id','id')->all();

        $role->syncPermissions($permissions);

        $admin->assignRole([$role->id]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
