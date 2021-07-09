<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name');
            $table->string('short_name');
            $table->string('code');
            $table->string('email');
            $table->bigInteger('phone_number')->nullable();
            $table->string('image')->nullable();
            $table->longText('description')->nullable();
            $table->string('address');
            $table->integer('scale')->nullable();
            $table->boolean('is_active')->default(0);
            $table->timestamp('verified_at')->nullable();
            $table->timestamp('locked_at')->nullable();
            $table->timestamp('sponsored_at')->nullable();
            $table->unsignedBigInteger('province_id');
            $table->string('facebook')->nullable();
            $table->string('website')->nullable();
            $table->string('map_link')->nullable();
            $table->string('branch')->nullable();
            $table->timestamps();

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
        Schema::dropIfExists('companies');
    }
}
