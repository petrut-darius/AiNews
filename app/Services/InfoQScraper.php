<?php

namespace App\Services;

use App\DTOs\ArticleDataDTO;
use App\Services\Contracts\ScraperInterface;
use Nesk\Puphpeteer\Puppeteer;
use Nesk\Rialto\Data\JsFunction;

class InfoQScraper implements ScraperInterface
{
    private const URL = "https://www.infoq.com/news/";

    private const BASE_URL = "https://www.infoq.com/";

    private const SOURCE = "info_q";

    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function scrape():array {
        $puppeteer = new Puppeteer();
        $browser = $puppeteer->launch([
            "headless" => true,
            "args" => [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-gpu",
                "--disable-dev-shm-usage"
            ]
        ]);

        $page = $browser->newPage();
        $page->goto(self::URL, ["timeout" => 30000, "waitUntil" => "networkidle2"]);
        $page->waitForSelector("div.items__content ul.cards li h3.card__title > a");

        $articleLinks = $page->evaluate(JsFunction::createWithBody("
            return Array.from(
                document.querySelectorAll('div.items__content ul.cards li h3.card__title > a')
            ).slice(0, 6).map(a => a.href);
        "));

        $visitedLinks = [];
        $results = [];

        foreach($articleLinks as $articleLink) {
            try {
                if(isset($visitedLinks[$articleLink])) {
                    continue;
                }else{
                    $visitedLinks[$articleLink] = true;
                }

                $articlePage = $browser->newPage();

                $articlePage->goto($articleLink, ["timeout" => 30000, "waitUntil" => "networkidle2"]);

                $articlePage->waitForSelector(".article__data");

                $data = $articlePage->evaluate(JsFunction::createWithBody("
                    const articleTitle = document.querySelector('div.article__heading > div > h1');
                    const articleAuthor = document.querySelector('span.author__name > a');
                    const articleBody = document.querySelectorAll('div.article__data > p');

                    return {
                        title: articleTitle ? articleTitle.innerText.replace(/\s+/g, ' ').trim() : null,
                        author: articleAuthor ? articleAuthor.innerText.replace(/\s+/g, ' ').trim() : null,
                        bodyText: articleBody.length ? Array.from(articleBody).map(p => p.innerText.replace(/\s+/g, ' ').trim()).join(' ') : null,
                        bodyHtml: articleBody.length ? Array.from(articleBody).map(p => p.outerHTML).join('') : null
                    }
                "));

                $results[] = new ArticleDataDTO(
                    title: (string) $data["title"],
                    author: (string) $data["author"],
                    bodyText: (string) $data["bodyText"],
                    bodyHtml: (string) $data["bodyHtml"],
                    source: (string) self::SOURCE,
                    url: (string) $articleLink
                );

                $articlePage->close();
            }catch(\Throwable $e) {
                echo $e->getMessage() . PHP_EOL;
                echo $e->getLine() . PHP_EOL;
                echo $e->getFile() . PHP_EOL;
            }
        }

        $browser->close();
        return $results;
    }
}
