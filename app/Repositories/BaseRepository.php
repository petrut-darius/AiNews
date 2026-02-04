<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class BaseRepository
{
    public function __construct(
        protected Model $model
    )
    {
    }

    public function find(int $id): ?Model
    {
        return $this->model->find($id);
    }

    public function findAll(): Collection
    {
        return $this->model->get();
    }

    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): Model
    {
        $model = $this->find($id);

        if(!$model) {
            throw new ModelNotFoundException();
        }

        $model->update($data);

        return $model;
    }

    public function delete(int $id): bool
    {
        return (bool) $this->model->where("id", $id)->delete();
    }
}
