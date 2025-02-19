<?php

namespace Database\Seeders\Permissions;

use App\Models\Permission;
use App\Services\ACLService;
use Illuminate\Database\Seeder;
use App\Models\Role;


class CrudPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(ACLService $aclService)
    {
        /*
            // Here, include project specific permissions. E.G.:
            $aclService->createScopePermissions('interests', ['create', 'read', 'update', 'delete', 'import', 'export']);
            $aclService->createScopePermissions('games', ['create', 'read', 'read_own', 'update', 'delete']);

            $adminRole = Role::where('name', ROLE_ENUM::ADMIN)->first();
            $aclService->assignScopePermissionsToRole($adminRole, 'interests', ['create', 'read', 'update', 'delete', 'import', 'export']);
            $aclService->assignScopePermissionsToRole($adminRole, 'games', ['create', 'read', 'read_own', 'update', 'delete']);

            $advertiserRole = Role::where('name', 'advertiser')->first();
            $aclService->assignScopePermissionsToRole($advertiserRole, 'interests', ['read']);
            $aclService->assignScopePermissionsToRole($advertiserRole, 'games', ['create', 'read_own']);
        */

        $userRole = $this->createRole('user');
        $adminRole = $this->createRole('admin');

        $this->createScopePermissions('events', ['create', 'read', 'update', 'delete', 'cancel']);

        $this->assignScopePermissionsToRole($adminRole, 'events', ['create', 'read', 'cancel']); //! same permissions for now
        $this->assignScopePermissionsToRole($userRole, 'events', ['create', 'read', 'cancel']);
    }

    /**
     * Creates a new role with the given name
     * @param string $name
     * @return Role|\Illuminate\Database\Eloquent\Model
     */
    public function createRole(string $name): Role
    {
        $role = Role::firstOrCreate(['name' => $name]);
        return $role;
    }

    /**
     * Creates permissions for a specific scope by combining the scope with each permission name.
     * @param string $scope
     * @param array $permissions
     * @return void
     */
    public function createScopePermissions(string $scope, array $permissions): void
    {
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $scope.'.'.$permission]);
        }
    }

    /**
     * Assigns permissions within a specific scope to a given role.
     * 
     * @param \App\Models\Role $role
     * @param string $scope
     * @param array $permissions
     * @return void
     */

    public function assignScopePermissionsToRole(Role $role, string $scope, array $permissions): void
    {
        foreach ($permissions as $permission) {
            $permissionName = $scope.'.'.$permission;

            if (! $role->hasPermission($permissionName)) {
                $role->givePermission($permissionName);
            }
        }
    }
}
