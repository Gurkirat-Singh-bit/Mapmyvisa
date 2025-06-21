/*
=== GOOGLE-MAP.JS CONTENT INDEX ===
Lines 1-3: initMap function definition with hardcoded London coordinates (functional but needs updating)
Line 3: Hardcoded coordinates for "Uluru" (lat: 51.480557, lng: -0.182683) - actually London coordinates
Lines 4-6: Google Maps initialization with zoom level 12 (functional)
Lines 7-146: Extensive custom map styling configuration (functional)
Lines 7-16: Base geometry styling with light gray colors
Lines 17-25: Labels icon visibility and text styling
Lines 26-34: Text stroke styling for readability
Lines 35-43: Administrative land parcel styling
Lines 44-82: POI (Points of Interest) styling including parks
Lines 83-120: Road styling for different road types (arterial, highway, local)
Lines 121-135: Transit line and station styling
Lines 136-146: Water feature styling
Lines 147-149: Map marker creation at the specified coordinates (functional)

ISSUES IDENTIFIED:
1. Function uses "Uluru" variable name but coordinates are for London (misleading)
2. Coordinates appear to be for a logistics company location, not MapMyVisa office
3. No multiple office locations support (only single marker)
4. No custom marker icon for MapMyVisa branding
5. Map styling is functional but generic

FUNCTIONALITY ASSESSMENT:
- Core Google Maps functionality works correctly
- Custom styling provides professional appearance
- Single marker placement is functional
- Code structure is clean and properly formatted
*/

function initMap() {
    // The location of Uluru
    var uluru = { lat: 51.480557, lng: -0.182683 };
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map'), {
        zoom: 12, center: uluru,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({ position: uluru, map: map });
}