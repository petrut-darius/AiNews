<?php

namespace App\Filament\Resources\Articles\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class ArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->required(),
                TextInput::make('author')
                    ->default(null),
                Textarea::make('body_text')
                    ->required()
                    ->columnSpanFull(),
                Textarea::make('body_html')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('source')
                    ->required(),
                TextInput::make('url')
                    ->url()
                    ->required(),
            ]);
    }
}
