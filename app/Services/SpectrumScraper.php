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
    private const URL = "https://spectrum.ieee.org/feeds/type/news.rss";

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
        /*

        Differences between Single Slash and Double Slash in XPath
        To sum it up, the single forward slash (/) selects only immediate child elements and requires a precise path. In contrast, the double forward slash (//) selects all descendants of the current node, regardless of their level.

        */
        // asta ia linku mare de pe acest site datorita faptului ca e primul link cu aceasta clasa
        $linkNode = $crawler->filterXPath("//item/link")->first();

        //Node->inseamna obiectu, link-> ar insemna doar ce are in href
        if($linkNode->count() === 0) {
            throw new \RuntimeException("Failed to fetch the main link from the news Spectrum page");
        }
        
        $titleNode = $crawler->filterXPath("//item/title")->first();
        $authorNode = $crawler->filterXPath("//item/dc:creator")->first();
        $bodyNode = $crawler->filterXPath("//item/description")->first();

        $articleUrl = trim($linkNode->text());
        $title = trim($titleNode->text());
        $author = trim($authorNode->text());
        $html = $bodyNode->text(); // description is CDATA containing HTML
        $text = trim(preg_replace("/\s+/", " ", strip_tags($html)));

        logger()->info("fetching article url: " . $articleUrl);
        logger()->info("title: " . $title);
        logger()->info("author: " . $author);
        
        $results[] = new ArticleDataDTO(
            title: $title,
            author: $author,
            bodyText: $text,
            bodyHtml: $html,
            source: self::SOURCE,
            url: $articleUrl,
        );

        logger()->notice("spectrum scraper");

        return $results;
    }

    //make private method for fetching Http and the successful condition
    private function makeRequest(string $url):Response {
        $response = Http::withHeaders([
            "User-Agent" => "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Accept" => "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language" => "en-US,en;q=0.9",
            "Accept-Encoding" => "gzip, deflate, br",
            "Cache-Control" => "no-cache",
            "Pragma" => "no-cache",
        ])->get($url);

        logger()->info("status for $url: " . $response->status());

        if(!$response->successful()) {
            throw new \RuntimeException("Failed to fetch the data from the requested URL: $url with status: " . $response->status());
        }

        return $response;
    }
}
