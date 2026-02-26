<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\Response;
use App\UserPermissions;
use Illuminate\Support\Facades\Auth;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAnyPermission([UserPermissions::EVERYTHING, UserPermissions::CREATE, UserPermissions::UPDATE, UserPermissions::DELETE]);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        return $user->hasAnyPermission([UserPermissions::EVERYTHING, UserPermissions::CREATE, UserPermissions::UPDATE, UserPermissions::DELETE]);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if($user->hasAnyPermission([UserPermissions::EVERYTHING, UserPermissions::CREATE])) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        if($user->id === $model->id) {
            return $user->hasPermission(UserPermissions::EVERYTHING);
        }

        if($model->hasPermission(UserPermissions::EVERYTHING)) {
            return false;
        }

        return $user->hasAnyPermission([UserPermissions::EVERYTHING, UserPermissions::UPDATE]);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        if($user->id === $model->id) {
            return $user->hasPermission(UserPermissions::EVERYTHING);
        }

        if($model->hasPermission(UserPermissions::EVERYTHING)) {
            return false;
        }

        return $user->hasAnyPermission([UserPermissions::EVERYTHING, UserPermissions::UPDATE]);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): bool
    {
        return false;
    }
}
