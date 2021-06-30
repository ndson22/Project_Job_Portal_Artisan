<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait ImageTrait
{
    public function storeImage($request, $instance, $fieldName, $folderName)
    {
        if ($request->hasFile($fieldName)) {
            $path = 'public/' . $fieldName . 's/' . $folderName;

            $this->deleteImage($instance);

            $fileName = $request->$fieldName;
            $fileNameOrigin = strtolower($fileName->getClientOriginalName());
            $fileNameHash = hexdec(uniqid('', false)) . '.' . $fileName->getClientOriginalExtension();

            $filePath = $request->file($fieldName)->storeAs($path, $fileNameHash);

            $dataUploadTrait = [
                'file_name' => $fileNameOrigin,
                'file_path' => Storage::url($filePath)
            ];

            $instance->image = $dataUploadTrait['file_path'];

            return $dataUploadTrait;
        }
        return null;
    }

    public function deleteImage($instance)
    {
        // if (!empty($instance->image)){
        //     $existPath = str_replace('storage', 'public', $instance->image);
        //     if (Storage::exists($existPath)) {
        //         Storage::delete($existPath);
        //     }
        // }
        return Storage::delete(str_replace('storage', 'public', $instance->image));
    }
}
