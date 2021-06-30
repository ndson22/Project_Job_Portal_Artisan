<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->unsignedBigInteger('company_id');
            $table->unsignedBigInteger('job_type_id');
            $table->string('from_salary');
            $table->string('to_salary');
            $table->unsignedBigInteger('employee_position_id');
            $table->integer('experience');
            $table->unsignedBigInteger('type_of_employment_id');
            $table->date('expire');
            $table->longText('description');
            $table->integer('employee_quantity');
            $table->unsignedBigInteger('gender_id');
            $table->boolean('is_active')->default(1);
            $table->string('job_code');
            $table->timestamps();

            $table->foreign('job_type_id')->references('id')->on('job_types');
            $table->foreign('employee_position_id')->references('id')->on('employee_positions');
            $table->foreign('type_of_employment_id')->references('id')->on('type_of_employments');
            $table->foreign('gender_id')->references('id')->on('genders');
            $table->foreign('company_id')->references('id')->on('companies');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_posts');
    }
}
