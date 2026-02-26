<?php

namespace App\Policies;

use App\ArticlePermissions;
use App\Models\Article;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ArticlePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasAnyPermission([ArticlePermissions::EVERYTHING, ArticlePermissions::UPDATE, ArticlePermissions::CREATE, ArticlePermissions::DELETE]);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Article $article): bool
    {
        return $user->hasAnyPermission([ArticlePermissions::EVERYTHING, ArticlePermissions::UPDATE, ArticlePermissions::CREATE, ArticlePermissions::DELETE]);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        if($user->hasAnyPermission([ArticlePermissions::EVERYTHING, ArticlePermissions::CREATE])) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Article $article): bool
    {
        if($user->hasAnyPermission([ArticlePermissions::EVERYTHING, ArticlePermissions::UPDATE])) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Article $article): bool
    {
        if($user->hasAnyPermission([ArticlePermissions::EVERYTHING, ArticlePermissions::DELETE])) {
            return true;
        }

        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Article $article): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Article $article): bool
    {
        return false;
    }
}
