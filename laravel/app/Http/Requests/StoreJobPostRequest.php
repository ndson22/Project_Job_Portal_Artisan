<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJobPostRequest extends FormRequest
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
            'title' => 'required|max:255',
            'job_type_id' => 'required|numeric|min:1',
            'from_salary' => 'required|numeric|min:1',
            'to_salary' => 'required|numeric|min:1|gt:from_salary',
            'employee_position_id' => 'required|numeric|min:1',
            'experience' => 'required|numeric|min:0',
            'type_of_employment_id' => 'required|numeric|min:1',
            'expire' => 'required|date',
            'description' => 'required',
            'employee_quantity' => 'required|numeric|min:1',
            'gender_id' => 'required|numeric|min:1',
        ];
    }
}
