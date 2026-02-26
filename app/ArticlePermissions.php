<?php

namespace App;

enum ArticlePermissions:string {
    case EVERYTHING = "manage:articles";
    case DELETE = "delete:articles";
    case UPDATE = "update:articles";
    case CREATE = "create:articles";
}
