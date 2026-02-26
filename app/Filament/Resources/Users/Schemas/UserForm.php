<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Support\Enums\Operation;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                CheckboxList::make("permissions")
                    ->options([
                        "manage:users" => "Manage Users",
                        "delete:users" => "Delete Users",
                        "update:users" => "Update Users",
                        "create:users" => "Create Users",
                        "manage:articles" => "Manage Articles",
                        "delete:articles" => "Delete Articles",
                        "update:articles" => "Update Articles",
                        "create:articles" => "Create Articles",
                    ]),
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
