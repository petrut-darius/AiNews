<?php

namespace App\Services;

use App\DTOs\ArticleDataDTO;
use App\Services\Contracts\ScraperInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Http\Client\Response;

class SpectrumScraper implements ScraperInterface
{
    private const BASE_URL = "https://spectrum.ieee.org";
    private const URL = "https://spectrum.ieee.org/type/news/";

    private const SOURCE = "spectrum";

    /**
     * Create a new class instance.
     */
    public function __construct()
    {
    }


    public function scrape():array {
        $response = $this->makeRequest(self::URL);

        $crawler = new Crawler($response->body());

        // asta ia linku mare de pe acest site datorita faptului ca e primul link cu aceasta clasa
        $linkNode = $crawler->filterXPath("//a[contains(@class, 'custom-post-headline')]")->first();

        //Node->inseamna obiectu, link-> ar insemna doar ce are in href
        if($linkNode->count() === 0) {
            throw new \RuntimeException("Failed to fetch the main link from the news Spectrum page");
        }

        $href = $linkNode->attr("href");

        $articleUrl = Str::startsWith($href, "http") ? $href : self::BASE_URL . $href;

        $articleResponse = $this->makeRequest($articleUrl);

        $articleCrawler = new Crawler($articleResponse->body());

        $titleNode = $articleCrawler->filterXPath("//a[contains(@class, 'custom-post-headline')]")->first();
        $authorNode = $articleCrawler->filterXPath("//a[contains(@class, 'social-author__name')]")->first();
        $bodyNode = $articleCrawler->filterXPath("//div[contains(@class, 'body-description')]")->first();

        if(!$titleNode->count() || !$authorNode->count() || !$bodyNode->count()) {
            throw new \RuntimeException("Failed to fetch the data from the article page: $articleUrl");
        }

        $html = $bodyNode->html();
        $text = trim(preg_replace("/\s+/", " ", strip_tags($html)));


        $results[] = new ArticleDataDTO(
            title: $titleNode->text(),
            author: $authorNode->text(),
            bodyText: $text,
            bodyHtml: $html,
            source: self::SOURCE,
            url: $articleUrl,
        );

        return $results;
    }

    //make private method for fetching Http and the successful condition
    private function makeRequest(string $url):Response {
        $response = Http::withHeaders([
            "User-Agent" => "Mozilla/5.0",
            "Accept-Language" => "en-US,en;q=0.9",
        ])->get($url);

        if(!$response->successful()) {
            throw new \RuntimeException("Failed to fetch the data from the requested URL: $url");
        }

        return $response;
    }
}
