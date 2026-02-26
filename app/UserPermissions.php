<?php

namespace App;

enum UserPermissions:string {
    case EVERYTHING = "manage:users";
    case DELETE = "delete:users";
    case UPDATE = "update:users";
    case CREATE = "create:users";
}
