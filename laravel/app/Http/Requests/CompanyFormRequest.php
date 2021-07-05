<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyFormRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => 'required|digits',
            'name' => 'required',
            'short_name' => 'required|min:1|max:5',
            'email' => 'required',
            'phone' => 'nullable|digits',
            'image' => 'nullable|mimes:jpg,jpeg,bmp,png|max:10240',
            'description' => 'nullable',
            'address' => 'required',
            'province_id' => 'required'
        ];
    }
}
