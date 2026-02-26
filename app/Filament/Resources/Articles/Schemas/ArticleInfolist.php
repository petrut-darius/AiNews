<?php

namespace App\Filament\Resources\Articles\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ArticleInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title'),
                TextEntry::make('author')
                    ->placeholder('-'),
                TextEntry::make('body_text')
                    ->columnSpanFull(),
                TextEntry::make('body_html')
                    ->columnSpanFull(),
                TextEntry::make('source'),
                TextEntry::make('url'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
