<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Support\Enums\Operation;
use App\ArticlePermissions;
use App\UserPermissions;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                CheckboxList::make("permissions")
                    ->options(
                        collect(UserPermissions::cases())
                            ->merge(ArticlePermissions::cases())
                            ->mapWithKeys(fn($p) => [
                                $p->value => match(true) {
                                    $p instanceof UserPermissions => 'Users: ' . $p->name,
                                    $p instanceof ArticlePermissions => 'Articles: ' . $p->name,
                                }
                            ])
                            ->toArray()
                    ),
                TextInput::make('email')
                    ->label('Email address')
                    ->email()
                    ->required(),
                DateTimePicker::make('email_verified_at'),
                TextInput::make('password')
                    ->password()
                    ->required()
                    ->hiddenOn(Operation::Edit),
            ]);
    }
}
