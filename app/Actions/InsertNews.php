<?php

namespace App\Actions;

use App\Actions\Contracts\InsertNewsInterface;
use App\Repositories\ArticleRepository;
use Throwable;

class InsertNews implements InsertNewsInterface
{
    public function __construct(
        private iterable $scrapers,
        private ArticleRepository $repository,
    )
    {
    }

    public function execute() {
        foreach($this->scrapers as $scraper) {
            try{
                $articles = $scraper->scrape();
            }catch (Throwable $e) {
                logger()->error("Scrapper failed", [
                    "scrapper" => get_class($scraper),
                    "error" => $e->getMessage(),
                ]);

                continue;
            }

            foreach($articles as $dto) {
                try{
                    $this->repository->saveFromCrawler($dto);
                } catch (Throwable $e) {
                    logger()->error("Article save failed", [
                        "url" => $dto->url,
                        "error" => $e->getMessage()
                    ]);
                }
            }
        }
    }
}
