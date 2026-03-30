<?php

use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// --- Model ---

it('can create a service with all required fields', function () {
    $service = Service::create([
        'title'       => 'Intégration de Systèmes',
        'description' => 'Connectez vos outils existants.',
        'icon'        => 'hub',
        'link'        => '/services/integration',
    ]);

    expect($service)->toBeInstanceOf(Service::class)
        ->and($service->title)->toBe('Intégration de Systèmes')
        ->and($service->description)->toBe('Connectez vos outils existants.')
        ->and($service->icon)->toBe('hub')
        ->and($service->link)->toBe('/services/integration');
});

it('stores a service in the database', function () {
    Service::factory()->create(['title' => 'Automatisation Intelligente']);

    $this->assertDatabaseHas('services', ['title' => 'Automatisation Intelligente']);
});

// --- Welcome page injection ---

it('passes services to the welcome page', function () {
    Service::factory()->count(3)->create();

    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('Welcome')
            ->has('services', 3)
        );
});

// --- Validation ---

it('requires a title to create a service', function () {
    $response = $this->post('/services', [
        'title'       => '',
        'description' => 'Une description.',
        'icon'        => 'bolt',
    ]);

    $response->assertSessionHasErrors('title');
});

it('requires a unique title', function () {
    Service::factory()->create(['title' => 'IA sur Mesure']);

    $response = $this->post('/services', [
        'title'       => 'IA sur Mesure',
        'description' => 'Doublon.',
        'icon'        => 'psychology',
    ]);

    $response->assertSessionHasErrors('title');
});
