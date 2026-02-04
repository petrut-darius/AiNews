<?php

namespace App\Jobs;

use App\Actions\Contracts\InsertNewsInterface;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\User;

class RunDailyNewsCrawlJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private InsertNewsInterface $interface)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->interface->execute();

        User::newsletter()->chunk(500, function($users) {
            foreach($users as $user) {
                SendNewsletterMailJob::dispatch($user);
            }
        });
    }
}
