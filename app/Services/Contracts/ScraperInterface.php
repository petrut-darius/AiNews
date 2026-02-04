<?php

namespace App\Services\Contracts;


interface ScraperInterface
{
    public function scrape(): array;
}
