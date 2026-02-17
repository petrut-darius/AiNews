<?php

namespace App\Services;

use App\DTOs\ArticleDataDTO;
use App\Services\Contracts\ScraperInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Http\Client\Response;

class TowardsDataScienceScraper implements ScraperInterface
{
    private const BASE_URL = "https://towardsdatascience.com/";

    private const URL = "https://towardsdatascience.com/latest/";

    private const SOURCE = "towards_data_science";

    public function __construct()
    {
    }

    public function scrape():array {
        $mainResponse = $this->makeRequest(self::URL);
        $mainCrawler = new Crawler($mainResponse->body());

        $linkNodes = $mainCrawler->filterXPath("(//h2[contains(@class, 'wp-block-post-title')])[position() <= 3]/a");

        if($linkNodes->count() === 0) {
            throw new \RuntimeException("Failed to extract article links from " . self::URL);
        }

        $results = [];

        foreach($linkNodes as $key => $linkNode) {
            $linkNodeCrawler = new Crawler($linkNode);
            $href = $linkNodeCrawler->attr("href");

            $articleUrl = Str::startsWith($href, "http") ? $href : self::BASE_URL . $href;

            $articleResponse = $this->makeRequest($articleUrl);

            $articleCrawler = new Crawler($articleResponse->body());

            $articleTitleNode = $articleCrawler->filterXPath("//h1[contains(@class, 'wp-block-post-title')]")->first();
            $articleAuthorNode = $articleCrawler->filterXPath("//a[contains(@class, 'wp-block-post-author-name__link')]")->first();
            $articleBodyNode = $articleCrawler->filterXPath("//div[contains(@class, 'entry-content')]")->first();

            $html = $articleBodyNode->text();

            $text = trim( preg_replace('/\s+/', ' ', strip_tags($html)));


            if(!$articleTitleNode->count() || !$articleAuthorNode->count() || !$articleBodyNode->count()) {
                continue;
            }

            //validate them

            $results[] = new ArticleDataDTO(
                title: $articleTitleNode->text(),
                author: $articleAuthorNode->text(),
                bodyText: $text,
                bodyHtml:$html,
                source: self::SOURCE,
                url: $articleUrl,
            );


        }

        return $results;

    }

    private function makeRequest(string $url):Response {
        $response = Http::withHeaders([
            "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            "Accept" => "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language" => "en-US,en;q=0.9",
            "Connection" => "keep-alive",
        ])->get($url);

        if(!$response->successful()) {
            throw new \RuntimeException("Failed to fetch the data from the requested URL: $url");
        }

        return $response;
    }
}
