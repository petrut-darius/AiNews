<?php

namespace App\Services;

use Stripe\Stripe;
use Stripe\Price;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class SubscriptionService
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function createCheckout(User $user, string $plan, string $interval) {
        $plans = config("subscription_plans");

        if(!isset($plans[$plan])) {
            throw new \DomainException("Invalid plan.");
        }

        if(!isset($plans[$plan]["prices"][$interval])) {
            throw new \DomainException("Invalid billing interval.");
        }

        $priceConfig = $plans[$plan]["prices"][$interval];
        $priceId = $priceConfig["id"];

        Stripe::setApiKey(config("services.stripe.secret"));

        $price = Price::retrieve($priceId);

        if(!$price->active) {
            throw new \DomainException("Inactive price.");
        }

        if($price->currency !== "ron") {
            throw new \DomainException("Invalid currency.");
        }

        Log::info("Creating checkout for user {$user->id}, plan $plan, interval $interval");


        if($priceConfig["type"] === "recurring") {
            return $user->newSubscription($plan, $price->id)
                ->checkout([
                    "success_url" => route("home"),
                    "cancel_url" => route("home")
                ]);
        }

        if($priceConfig["type"] === "one_time") {
            return $user->checkout(
                $priceId,
                [
                    "success_url" => route("home"),
                    "cancel_url" => route("home")
                ]);
        }

        throw new \DomainException("Unsupported price type.");
    }


}
