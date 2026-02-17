<?php

use App\Models\Article;

test('command_deletes_articles_older_than_one_month', function () {

    Article::factory()->count(2)->create([
        "created_at" => now()->subMonths(2),
    ]);

    Article::factory()->count(2)->create([
        "created_at" => now()->subDays(29),
    ]);

    $this->artisan("articles:cleanup")->assertExitCode(0);


    expect(Article::count())->toBe(2);
});
