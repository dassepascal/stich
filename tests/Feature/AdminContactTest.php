<?php

use App\Models\Contact;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

// ── Sécurité ──────────────────────────────────────────────────────────────────

it('redirects a guest to the login page', function () {
    $this->get('/admin/contacts')->assertRedirect(route('login'));
});

it('denies access to a non-admin authenticated user', function () {
    $user = User::factory()->create(['is_admin' => false]);

    $this->actingAs($user)->get('/admin/contacts')->assertForbidden();
});

it('allows an admin to access the contacts list', function () {
    $admin = User::factory()->admin()->create();

    $this->actingAs($admin)->get('/admin/contacts')->assertOk();
});

// ── Liste ──────────────────────────────────────────────────────────────────────

it('passes contacts to the Inertia component', function () {
    $admin = User::factory()->admin()->create();
    Contact::factory()->count(3)->create();

    $this->actingAs($admin)
        ->get('/admin/contacts')
        ->assertInertia(fn ($page) => $page
            ->component('Admin/Contacts/Index')
            ->has('contacts', 3)
        );
});

// ── Marquer comme lu ──────────────────────────────────────────────────────────

it('allows an admin to mark a contact as read', function () {
    $admin   = User::factory()->admin()->create();
    $contact = Contact::factory()->create(['status' => 'new']);

    $this->actingAs($admin)
        ->patch(route('admin.contacts.read', $contact))
        ->assertRedirect();

    expect($contact->fresh()->status)->toBe('read');
});

// ── Suppression ───────────────────────────────────────────────────────────────

it('allows an admin to delete a contact', function () {
    $admin   = User::factory()->admin()->create();
    $contact = Contact::factory()->create();

    $this->actingAs($admin)
        ->delete(route('admin.contacts.destroy', $contact))
        ->assertRedirect();

    $this->assertDatabaseMissing('contacts', ['id' => $contact->id]);
});

it('prevents a non-admin from deleting a contact', function () {
    $user    = User::factory()->create(['is_admin' => false]);
    $contact = Contact::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.contacts.destroy', $contact))
        ->assertForbidden();

    $this->assertDatabaseHas('contacts', ['id' => $contact->id]);
});
