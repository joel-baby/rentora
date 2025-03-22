document.addEventListener('DOMContentLoaded', function() {
    // Update price range display
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    priceRange.addEventListener('input', function() {
        priceValue.textContent = `$${this.value}`;
    });
    
    // Fetch properties from server
    fetchProperties();
    
    // Set up mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
});

function applyFilters() {
    // Show loading animation
    const propertiesContainer = document.getElementById('propertiesContainer');
    propertiesContainer.innerHTML = `
        <div class="loading-animation">
            <div class="spinner"></div>
            <p>Filtering properties...</p>
        </div>
    `;
    
    // Collect filter values
    const propertyType = document.getElementById('propertyType').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;
    const priceRange = document.getElementById('priceRange').value;
    const sortBy = document.getElementById('sortBy').value;
    const searchInput = document.getElementById('searchInput').value;
    
    // In a real application, send these filters to the server
    // For demo, we'll simulate a delay and then show filtered results
    setTimeout(() => {
        fetchProperties({
            propertyType,
            bedrooms,
            bathrooms,
            priceMax: priceRange,
            sortBy,
            search: searchInput
        });
    }, 1000);
}

function fetchProperties(filters = {}) {
    // In a real application, this would fetch from the server
    // For demo, we'll create some sample properties
    
    // Simulate server request
    setTimeout(() => {
        const propertiesContainer = document.getElementById('propertiesContainer');
        
        // Sample property data
        const properties = [
            {
                id: 1,
                title: "Modern Downtown Apartment",
                price: 1850,
                address: "123 Main St, New York, NY",
                bedrooms: 2,
                bathrooms: 2,
                area: 1100,
                type: "apartment",
                badge: "New",
                image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 2,
                title: "Spacious Family House",
                price: 2750,
                address: "456 Oak Ave, Los Angeles, CA",
                bedrooms: 4,
                bathrooms: 3,
                area: 2200,
                type: "house",
                image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 3,
                title: "Luxury Waterfront Condo",
                price: 3200,
                address: "789 Beach Blvd, Miami, FL",
                bedrooms: 3,
                bathrooms: 2,
                area: 1800,
                type: "condo",
                badge: "Featured",
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 4,
                title: "Charming Studio Apartment",
                price: 1100,
                address: "101 Pine St, Chicago, IL",
                bedrooms: 1,
                bathrooms: 1,
                area: 650,
                type: "apartment",
                image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 5,
                title: "Suburban Townhouse",
                price: 2100,
                address: "222 Maple Dr, Seattle, WA",
                bedrooms: 3,
                bathrooms: 2.5,
                area: 1650,
                type: "house",
                image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            },
            {
                id: 6,
                title: "Modern Villa with Pool",
                price: 4500,
                address: "333 Palm Ave, San Diego, CA",
                bedrooms: 5,
                bathrooms: 4,
                area: 3200,
                type: "villa",
                badge: "Premium",
                image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            }
        ];
        
        // Apply filters (in a real app, this would be done server-side)
        let filteredProperties = [...properties];
        
        if (filters.propertyType) {
            filteredProperties = filteredProperties.filter(p => p.type === filters.propertyType);
        }
        
        if (filters.bedrooms) {
            filteredProperties = filteredProperties.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
        }
        
        if (filters.bathrooms) {
            filteredProperties = filteredProperties.filter(p => p.bathrooms >= parseFloat(filters.bathrooms));
        }
        
        if (filters.priceMax) {
            filteredProperties = filteredProperties.filter(p => p.price <= parseInt(filters.priceMax));
        }
        
        if (filters.search) {
            const search = filters.search.toLowerCase();
            filteredProperties = filteredProperties.filter(p => 
                p.title.toLowerCase().includes(search) || 
                p.address.toLowerCase().includes(search) || 
                p.type.toLowerCase().includes(search)
            );
        }
        
        // Sort properties (in a real app, this would be done server-side)
        if (filters.sortBy) {
            switch (filters.sortBy) {
                case 'price-low':
                    filteredProperties.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    filteredProperties.sort((a, b) => b.price - a.price);
                    break;
                case 'newest':
                    // For demo purposes, we'll just randomize
                    filteredProperties.sort(() => Math.random() - 0.5);
                    break;
                default:
                    // 'recommended' or default - no specific sort
                    break;
            }
        }
        
        // Generate HTML for properties
        if (filteredProperties.length === 0) {
            propertiesContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 3rem; color: #ddd; margin-bottom: 1rem;"></i>
                    <h3>No properties found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
        } else {
            let propertiesHTML = '';
            
            filteredProperties.forEach(property => {
                propertiesHTML += `
                    <div class="property-card" data-id="${property.id}">
                        <div class="property-image">
                            <img src="${property.image}" alt="${property.title}">
                            ${property.badge ? `<div class="property-badge">${property.badge}</div>` : ''}
                        </div>
                        <div class="property-details">
                            <div class="property-price">$${property.price}/mo</div>
                            <h3 class="property-title">${property.title}</h3>
                            <div class="property-address">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${property.address}</span>
                            </div>
                            <div class="property-features">
                                <div class="feature">
                                    <i class="fas fa-bed"></i>
                                    <span>${property.bedrooms} ${property.bedrooms > 1 ? 'Beds' : 'Bed'}</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-bath"></i>
                                    <span>${property.bathrooms} ${property.bathrooms > 1 ? 'Baths' : 'Bath'}</span>
                                </div>
                                <div class="feature">
                                    <i class="fas fa-vector-square"></i>
                                    <span>${property.area} sq ft</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            propertiesContainer.innerHTML = propertiesHTML;
            
            // Add click event to property cards
            document.querySelectorAll('.property-card').forEach(card => {
                card.addEventListener('click', function() {
                    const propertyId = this.getAttribute('data-id');
                    window.location.href = `property-details.html?id=${propertyId}`;
                });
            });
        }
    }, 1500);
}