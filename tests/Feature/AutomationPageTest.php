<?php

it('renders the automation page with a 200 status', function () {
    $this->get('/automatisation')->assertStatus(200);
});

it('passes the correct Inertia component', function () {
    $this->get('/automatisation')
        ->assertInertia(fn ($page) => $page->component('Automation'));
});
