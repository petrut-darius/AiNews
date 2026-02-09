<?php

namespace App\Http\Controllers;

use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckOutController extends Controller
{
    public function index(Request $request)
    {
        //dd(config("subscription_plans.premium"));

        dd(Auth::user()->subscribed());

        return Inertia::render("CheckOut/Index");
    }

    public function store(Request $request, SubscriptionService $service) {
        $request->validate([
            "plan" => "required|string",
            "interval" => "required|string",
        ]);

        $user = $request->user();

        $user->createOrGetStripeCustomer();

        $checkout = $service->createCheckout($user, $request->plan, $request->interval);

        return redirect()->away($checkout->url);
    }
}
