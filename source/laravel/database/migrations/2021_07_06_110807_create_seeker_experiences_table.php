<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeekerExperiencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seeker_experiences', function (Blueprint $table) {
            $table->id();
            $table->longText('description');
            $table->unsignedBigInteger('seeker_id');
            $table->timestamps();

            $table->foreign('seeker_id')->references('id')->on('seekers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seeker_experiences');
    }
}
