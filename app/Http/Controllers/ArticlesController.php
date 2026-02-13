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
        $articles = Article::all();

        return Inertia::render("Articles/Index", [
            "articles" => ArticleResource::collection($articles)
        ]);
    }
}
