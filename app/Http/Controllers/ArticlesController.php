<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Article;

class ArticlesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        /*verify subscription
        if($request->user()->subscribed("default")) {
            $articles = Article::all();
        }
        else{
            $articles = Article::where("source", "!=", config("articles.premium_source"))->get();
        }
        */
        $articles = Article::all();

        return Inertia::render("Articles/Index", [
            "articles" => ArticleResource::collection($articles)
        ]);
    }
}
