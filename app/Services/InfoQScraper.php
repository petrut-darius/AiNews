<?php
namespace App\Services;

use App\DTOs\ArticleDataDTO;
use App\Services\Contracts\ScraperInterface;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Http\Client\Response;

class InfoQScraper implements ScraperInterface
{
    private const URL = "https://www.infoq.com/news/";
    private const BASE_URL = "https://www.infoq.com";
    private const SOURCE = "info_q";

    public function scrape(): array {
        $response = $this->makeRequest(self::URL);
        $crawler = new Crawler($response->body());

        $linkNodes = $crawler->filterXPath("//h3[contains(@class, 'card__title')]/a");

        if ($linkNodes->count() === 0) {
            throw new \RuntimeException("Failed to extract article links from " . self::URL);
        }

        $results = [];
        $visited = [];
        
        //&$results -> baga variabila efectiva, adica tot ce se intampla in acel loop sa se fie si la variabila originala, adica dupa metamorfoza sa fie si in afara loopului
        $linkNodes->slice(0, 6)->each(function (Crawler $node) use (&$results, &$visited) {
            $href = $node->attr("href");
            $articleUrl = Str::startsWith($href, "http") ? $href : self::BASE_URL . $href;

            if (isset($visited[$articleUrl])) return;
            $visited[$articleUrl] = true;

            try {
                $articleResponse = $this->makeRequest($articleUrl);

                $articleCrawler = new Crawler($articleResponse->body());

                $titleNode = $articleCrawler->filterXPath("//div[contains(@class, 'article__heading')]//h1")->first();
                $authorNode = $articleCrawler->filterXPath("//span[contains(@class, 'author__name')]/a")->first();
                $bodyNodes = $articleCrawler->filterXPath("//div[contains(@class, 'article__data')]/p");

                if (!$titleNode->count() || !$authorNode->count() || !$bodyNodes->count()) {
                    return;
                }

                $html = $bodyNodes->each(fn(Crawler $p) => $p->outerHtml());//returneaza un array de $p->outerHTML (each -> nu e exact ca functia din PHP, ca e de la obiectu Crawler)
                $html = implode('', $html);
                $text = trim(preg_replace('/\s+/', ' ', strip_tags($html)));

                $results[] = new ArticleDataDTO(
                    title: $titleNode->text(),
                    author: $authorNode->text(),
                    bodyText: $text,
                    bodyHtml: $html,
                    source: self::SOURCE,
                    url: $articleUrl,
                );
            } catch (\Throwable $e) {
                logger()->error("InfoQ article failed", [
                    "url" => $articleUrl,
                    "error" => $e->getMessage()
                ]);
            }
        });

        logger()->notice("infoq scraper");
        return $results;
    }

    private function makeRequest(string $url): Response{
        $response = Http::withHeaders([
            "User-Agent" => "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
            "Accept" => "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language" => "en-US,en;q=0.9",
        ])->get($url);

        if (!$response->successful()) {
            throw new \RuntimeException("Failed to fetch: $url");
        }

        return $response;
    }
}