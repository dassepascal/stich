<?php

it('renders the sme solutions page with a 200 status', function () {
    $response = $this->get('/sme-solutions');

    $response->assertStatus(200);
});

it('passes the correct Inertia component', function () {
    $response = $this->get('/sme-solutions');

    $response->assertInertia(fn ($page) => $page->component('SmeSolutions'));
});
