<?php

use App\Jobs\RunDailyNewsCrawlJob;
use Illuminate\Support\Facades\Queue;
use App\Models\Article;

test('job_can_be_dispatched', function () {
    Queue::fake();

    $job = new RunDailyNewsCrawlJob();
    dispatch($job);

    Queue::assertPushed(RunDailyNewsCrawlJob::class);
});

test("job_inserts_into_db", function() {
    Article::query()->delete();

    RunDailyNewsCrawlJob::dispatchSync();

    expect(Article::count())->toBe(13);
});
