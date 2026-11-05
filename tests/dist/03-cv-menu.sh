#!/usr/bin/env bash

H=dist/index.html
assert_present "$H" 'id="cv-menu-btn"[^>]*aria-expanded="false"|aria-expanded="false"[^>]*id="cv-menu-btn"'
assert_present "$H" 'id="cv-menu"[^>]*hidden'
assert_absent src/components/Sections/Hero.astro 'group-hover:visible'
