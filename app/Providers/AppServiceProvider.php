<?php

namespace App\Providers;

use App\Actions\Contracts\InsertNewsInterface;
use App\Actions\InsertNews;
use App\Repositories\ArticleRepository;
use App\Services\InfoQScraper;
use App\Services\SpectrumScraper;
use App\Services\TowardsDataScienceScraper;
use App\Services\VentureBeatScraper;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->tag([InfoQScraper::class, SpectrumScraper::class, TowardsDataScienceScraper::class, VentureBeatScraper::class], "scrapers");

        $this->app->bind(InsertNewsInterface::class, function($app) {
            return new InsertNews($app->tagged("scrapers"), $app->make(ArticleRepository::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
