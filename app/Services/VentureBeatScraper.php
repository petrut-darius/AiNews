<?php

namespace App\Services;

use App\DTOs\ArticleDataDTO;
use App\Services\Contracts\ScraperInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Http\Client\Response;

class VentureBeatScraper implements ScraperInterface
{
    private const BASE_URL = "https://venturebeat.com";

    private const XML_URL = "https://venturebeat.com/category/infrastructure/feed";

    private const SOURCE = "venture_beat";

    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function scrape():array {
        $mainResponse = $this->makeRequest(self::XML_URL);
        $mainCrawler = new Crawler($mainResponse->body());

        $linkNodes = $mainCrawler->filterXPath("(//item/link)[position() <= 3]");

        if($linkNodes->count() === 0) {
            throw new \RuntimeException("Failed to extract category links from " . self::XML_URL);
        }

        $results = [];

        foreach($linkNodes as $key => $linkNode) {
            $linkNodeCrawler = new Crawler($linkNode);
            $href = $linkNodeCrawler->text();

            $articleUrl = Str::startsWith($href, "http") ? $href : self::BASE_URL . $href;

            if(!Str::contains($articleUrl, self::BASE_URL)) {
                continue;
            }

//            dd($articleUrl);

            $articleResponse = $this->makeRequest($articleUrl);

            $articleCrawler = new Crawler($articleResponse->body());

            $articleTitleNode = $articleCrawler->filterXPath("//h1[contains(@class, 'text-editorial-headline-070')]")->first();
            $articleAuthorNode = $articleCrawler->filterXPath("//address[contains(@class, 'text-editorial-label-020')]")->first();
            $articleBodyNode = $articleCrawler->filterXPath("//div[contains(@class, 'article-body')]")->first();

            $html = $articleBodyNode->text();

            $text = trim( preg_replace('/\s+/', ' ', strip_tags($html)));

            if(!$articleTitleNode->count() || !$articleAuthorNode->count() || !$articleBodyNode->count()) {
                continue;
            }

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
