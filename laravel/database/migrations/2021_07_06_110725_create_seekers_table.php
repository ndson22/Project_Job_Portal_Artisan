<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeekersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seekers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('gender_id')->nullable();
            $table->date('birthday')->nullable();
            $table->string('email');
            $table->bigInteger('phone_number')->nullable();
            $table->string('facebook')->nullable();
            $table->string('address')->nullable();
            $table->string('image')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('gender_id')->references('id')->on('genders');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seekers');
    }
}
