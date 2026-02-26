<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Article;

class ArticlesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $dbArticles = Article::all()->map(function($article) {
            return [
                "id" => $article->id,
                "title" => $article->title,
                "content" => $article->body_text,
            ];
        });

        $reversedArticles = $dbArticles->reverse()->values();
        $previewArticles = $reversedArticles->take(3);
        $articles = $reversedArticles->skip(3)->collect()->values();

        return Inertia::render("Articles/Index", [
            "previewArticles" => $previewArticles,
            "articles" => $articles,
        ]);
    }
}
