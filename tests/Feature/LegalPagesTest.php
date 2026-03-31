<?php

use function Pest\Laravel\get;

it('renders the confidentialite page', function () {
    get('/confidentialite')->assertStatus(200);
});

it('renders the conditions page', function () {
    get('/conditions')->assertStatus(200);
});

it('renders the mentions-legales page', function () {
    get('/mentions-legales')->assertStatus(200);
});
