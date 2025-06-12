#!/usr/bin/env python3

import os
import re

# Files to process
files_to_process = [
    'contacs.html', 'faqs.html', 'gallery.html', 
    'request-quote.html', 'services.html', 'why-us.html'
]

# Standard navigation structure
nav_structure = '''              <li class="nav__item with-dropdown">
                <a href="about-us.html" class="dropdown-toggle nav__item-link">Company</a>
                <i class="fa fa-angle-right" data-toggle="dropdown"></i>
                <ul class="dropdown-menu">
                  <li class="nav__item"><a href="about-us.html" class="nav__item-link">About Us</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="why-us.html" class="nav__item-link">Why Choose Us</a></li>
                  <!-- /.nav-item -->
                  <li class="nav__item"><a href="gallery.html" class="nav__item-link">Our Gallery</a></li>
                  <!-- /.nav-item -->
                </ul><!-- /.dropdown-menu -->
              </li><!-- /.nav-item -->
              <li class="nav__item">
                <a href="services.html" class="nav__item-link">Services</a>
              </li><!-- /.nav-item -->
              <li class="nav__item">
                <a href="why-us.html" class="nav__item-link">Why Us</a>
              </li><!-- /.nav-item -->
              <li class="nav__item">
                <a href="gallery.html" class="nav__item-link">Gallery</a>
              </li><!-- /.nav-item -->
              <li class="nav__item">
                <a href="faqs.html" class="nav__item-link">FAQs</a>
              </li><!-- /.nav-item -->
              <li class="nav__item">
                <a href="request-quote.html" class="nav__item-link">Request Quote</a>
              </li><!-- /.nav-item -->
              <li class="nav__item">
                <a href="contacs.html" class="nav__item-link">Contacts</a>
              </li><!-- /.nav-item -->'''

def process_file(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove references to deleted pages
    content = re.sub(r'href="leadership-team\.html"', 'href="#"', content)
    content = re.sub(r'href="global-locations\.html"', 'href="#"', content)
    content = re.sub(r'href="careers\.html"', 'href="#"', content)
    content = re.sub(r'href="single-service\.html"', 'href="#"', content)
    content = re.sub(r'href="single-industry\.html"', 'href="#"', content)
    content = re.sub(r'href="blog-grid\.html"', 'href="#"', content)
    content = re.sub(r'href="blog-single-post\.html"', 'href="#"', content)
    content = re.sub(r'href="case-studies\.html"', 'href="#"', content)
    content = re.sub(r'href="case-studies-single\.html"', 'href="#"', content)
    content = re.sub(r'href="track-shipment\.html"', 'href="#"', content)
    content = re.sub(r'href="find-location\.html"', 'href="#"', content)
    content = re.sub(r'href="rates\.html"', 'href="#"', content)
    
    # Remove Careers from footer
    content = re.sub(r'<li><a href="[^"]*">Careers</a></li>\s*', '', content)
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Processed {filename}")

# Process all files
for filename in files_to_process:
    if os.path.exists(filename):
        process_file(filename)
    else:
        print(f"File {filename} not found")

print("Cleanup completed!")
