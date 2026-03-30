<?php

use App\Models\Contact;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;

uses(RefreshDatabase::class);

// Payload valide réutilisable dans tous les tests
function validPayload(array $overrides = []): array
{
    return array_merge([
        'website' => '',                  // honeypot vide = humain
        'name'    => 'Pascal Dupont',
        'email'   => 'pascal@example.com',
        'company' => 'Ma PME SAS',
        'message' => 'Bonjour, je souhaite une démo de vos services.',
    ], $overrides);
}

// ── Page ──────────────────────────────────────────────────────────────────────

it('renders the contact page with a 200 status', function () {
    $this->get('/contact')->assertStatus(200);
});

it('passes the correct Inertia component', function () {
    $this->get('/contact')
        ->assertInertia(fn ($page) => $page->component('Contact'));
});

// ── Envoi réussi ──────────────────────────────────────────────────────────────

it('stores a contact message with all fields', function () {
    $response = $this->post('/contact', validPayload());

    $response->assertRedirect();
    $this->assertDatabaseHas('contacts', [
        'name'    => 'Pascal Dupont',
        'email'   => 'pascal@example.com',
        'company' => 'Ma PME SAS',
    ]);
});

it('stores the contact without a company (optional field)', function () {
    $this->post('/contact', validPayload(['company' => null]));

    $this->assertDatabaseHas('contacts', ['email' => 'pascal@example.com', 'company' => null]);
});

it('dispatches a ContactMessageReceived event on success', function () {
    Event::fake();

    $this->post('/contact', validPayload());

    Event::assertDispatched(\App\Events\ContactMessageReceived::class);
});

// ── Honeypot ──────────────────────────────────────────────────────────────────

it('rejects the submission when the honeypot field is filled', function () {
    $response = $this->post('/contact', validPayload(['website' => 'http://spam.com']));

    $response->assertSessionHasErrors('website');
    $this->assertDatabaseCount('contacts', 0);
});

it('rejects the submission when the honeypot field is absent', function () {
    $payload = validPayload();
    unset($payload['website']);

    $response = $this->post('/contact', $payload);

    $response->assertSessionHasErrors('website');
    $this->assertDatabaseCount('contacts', 0);
});

// ── Validation ────────────────────────────────────────────────────────────────

it('rejects a message shorter than 10 characters', function () {
    $response = $this->post('/contact', validPayload(['message' => 'Court']));

    $response->assertSessionHasErrors('message');
    $this->assertDatabaseCount('contacts', 0);
});

it('rejects a malformed email', function () {
    $response = $this->post('/contact', validPayload(['email' => 'pas-un-email']));

    $response->assertSessionHasErrors('email');
});

it('rejects a missing name', function () {
    $response = $this->post('/contact', validPayload(['name' => '']));

    $response->assertSessionHasErrors('name');
});

it('rejects a missing message', function () {
    $response = $this->post('/contact', validPayload(['message' => '']));

    $response->assertSessionHasErrors('message');
});
