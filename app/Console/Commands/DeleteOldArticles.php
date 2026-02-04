<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;

class DeleteOldArticles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'articles:cleanup';

    /**
 * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete articles older than one month';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $cutoff = now()->subMonth();

        //SELECT * FROM articles WHERE created_at < $cutoff
        $deleted = Article::olderThan($cutoff)->delete();

        $this->info("Deleted $deleted articles.");

        return self::SUCCESS;
    }
}
