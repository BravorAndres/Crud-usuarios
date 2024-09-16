<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\UserController;

class FetchAndStoreUserData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-and-store-user-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $userController = app(UserController::class);
        $userController->fetchAndStoreData();

        $this->info('User data has been fetched and stored successfully.');
    }
}
