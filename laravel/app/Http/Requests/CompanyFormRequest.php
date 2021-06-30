<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompanyFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'user_id' => 'required',
            'name' => 'required',
            'short_name' => 'required',
            'email' => 'required',
            'image' => 'nullable|mimes:jpg,jpeg,bmp,png|max:10240',
            'description' => 'required',
            'address' => 'required',
            'province_id' => 'required'
        ];
    }
}
