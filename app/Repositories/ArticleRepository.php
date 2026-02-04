<?php

namespace App\Repositories;

use App\DTOs\ArticleDataDTO;
use App\Models\Article;

class ArticleRepository extends BaseRepository
{
    public function __construct(private Article $article)
    {
    }

    public function saveFromCrawler(ArticleDataDTO $dto):Article {
        return $this->article->updateOrCreate(
        ["url" => $dto->url], //identity
        [
            "title" => $dto->title,
            "author" => $dto->author,
            "body_text" => $dto->bodyText,
            "body_html" => $dto->bodyHtml,
            "source" => $dto->source,
        ]);
    }
}
