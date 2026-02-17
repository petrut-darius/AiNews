<?php

namespace App\DTOs;

class ArticleDataDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly string $title,
        public readonly string $author,
        public readonly string $bodyText,
        public readonly string $bodyHtml,
        public readonly string $source,
        public readonly string $url,
    )
    {
        //
    }
}
