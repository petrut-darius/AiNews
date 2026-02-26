<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Panel;
use App\UserPermissions;

class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        "permissions",
    ];

    protected $attributes = [
        "permissions" => "[]",
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            "permissions" => "array",
        ];
    }

    //foloseste asta in loc de AdminMiddleware
    public function canAccessPanel(Panel $panel):bool {
        return $this->hasAnyPermission([UserPermissions::EVERYTHING, UserPermissions::CREATE, UserPermissions::UPDATE, UserPermissions::DELETE]);
    }

    public function hasPermission(UserPermissions $permission) {
        $userPermissions = $this->permissions;

        return in_array($permission->value, $userPermissions);
    }

    public function hasAnyPermission(array $permissions) {
        $perms = array_map(function($value) {
            if($value instanceof \BackedEnum) {
                $value = $value->value;
            }

            return strtolower($value);
        }, $permissions);

        //daca nu este niciun element comun al celor doua array-uri sa zica false
        return !empty(array_intersect($perms, $this->permissions));
    }
}
