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
            'user_id' => 'required|digits_between:1,10000000',
            'name' => 'required|max:255',
            'short_name' => 'required|max:5',
            'email' => 'required|email',
            'phone' => 'nullable|digits:10',
            'image' => 'nullable|mimes:jpg,jpeg,bmp,png|max:10240',
            'description' => 'nullable|max:1000',
            'address' => 'required|max:255',
            'province_id' => 'required|digits_between:1,2'
        ];
    }
}
