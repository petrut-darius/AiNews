<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    protected $fillable = [
        "title",
        "author",
        "body_text",
        "body_html",
        "source",
        "url",
    ];

    public function scopeOlderThan(Builder $query, Carbon $cutoff) {
        return $query->where("created_at", "<", $cutoff);
    }
}
