<?php

use App\Console\Commands\DeleteOldArticles;
use App\Jobs\RunDailyNewsCrawlJob;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command("demo:cron", function() {
    logger()->info("cron job running");
})->purpose("Check if cron job working");

Schedule::command("demo:cron")->everyFiveSeconds();

Schedule::command(DeleteOldArticles::class, ["--force"])->dailyAt("10:00");

Schedule::job(new RunDailyNewsCrawlJob)->dailyAt("10:00");

//one time command to delete articles or to crawl them.
Artisan::command("deleteOldArticles", function() {
    $this->call(DeleteOldArticles::class, ["--force"]);
});

Artisan::command("runDailyNewsCrawlJob", function() {
    dispatch(new RunDailyNewsCrawlJob);
});