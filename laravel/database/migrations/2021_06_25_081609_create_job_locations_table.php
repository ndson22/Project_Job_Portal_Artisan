<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_locations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('provice_id');
            $table->longText('address');
            $table->timestamps();

            $table->foreign('id')->references('id')->on('job_posts');
            $table->foreign('provice_id')->references('id')->on('provinces');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('job_addresses');
    }
}
