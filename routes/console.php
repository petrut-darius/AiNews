<?php

use App\Console\Commands\DeleteOldArticles;
use App\Jobs\RunDailyNewsCrawlJob;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command(DeleteOldArticles::class, ["--force"])->dailyAt("9:00");

//Schedule::job(new RunDailyNewsCrawlJob)->dailyAt("9:00");
Schedule::job(new RunDailyNewsCrawlJob)->everyThirtySeconds();
