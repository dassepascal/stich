<?php

use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// --- Validation ---

it('stores a valid email as a new lead', function () {
    $response = $this->post('/leads', ['email' => 'pascal@example.com']);

    $response->assertRedirect();
    $this->assertDatabaseHas('leads', [
        'email'  => 'pascal@example.com',
        'status' => 'new',
    ]);
});

it('rejects an invalid email', function () {
    $response = $this->post('/leads', ['email' => 'not-an-email']);

    $response->assertSessionHasErrors('email');
    $this->assertDatabaseCount('leads', 0);
});

it('rejects a missing email', function () {
    $response = $this->post('/leads', []);

    $response->assertSessionHasErrors('email');
});

it('rejects a duplicate email', function () {
    Lead::factory()->create(['email' => 'duplicate@example.com']);

    $response = $this->post('/leads', ['email' => 'duplicate@example.com']);

    $response->assertSessionHasErrors('email');
    $this->assertDatabaseCount('leads', 1);
});

// --- Security ---

it('captures the ip address of the submitter', function () {
    $this->post('/leads', ['email' => 'spy@example.com'], ['REMOTE_ADDR' => '1.2.3.4']);

    $this->assertDatabaseHas('leads', [
        'email'      => 'spy@example.com',
        'ip_address' => '1.2.3.4',
    ]);
});

// --- Event ---

it('dispatches a LeadRegistered event on success', function () {
    \Illuminate\Support\Facades\Event::fake();

    $this->post('/leads', ['email' => 'event@example.com']);

    \Illuminate\Support\Facades\Event::assertDispatched(\App\Events\LeadRegistered::class);
});
