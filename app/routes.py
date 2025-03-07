import pandas as pd
from dash import dcc, html
import plotly.express as px
import plotly.graph_objects as go

from app.database import get_all_partners, get_partner_details
from app.utils import get_category_icon
from config import active_config as config

# Define SWSIE color palette
SWSIE_COLORS = config.SWSIE_COLORS

def render_partners_page():
    """Create the partners directory page"""
    partners = get_all_partners()
    
    # Create filter categories
    categories = sorted(list(set([partner['category'] for partner in partners])))
    
    # Extract all focus areas and create a list of unique ones
    all_focus_areas = []
    for partner in partners:
        areas = partner['focus_areas'].split(',')
        all_focus_areas.extend(areas)
    focus_areas = sorted(list(set([area.strip() for area in all_focus_areas])))
    
    # Create partner cards
    partner_cards = []
    for partner in partners:
        # Create focus area tags
        focus_tags = html.Div([
            html.Span([
                html.I(className="fas fa-tag fa-xs mr-1"),
                area.strip()
            ], className='focus-tag')
            for area in partner['focus_areas'].split(',')
        ], className='focus-tags')
        
        # Create partner card
        partner_cards.append(html.Div([
            html.Div([
                # Card header with logo and category badge
                html.Div([
                    html.Div([
                        html.Img(src=f'/assets/{partner["logo_path"]}', className='partner-logo')
                    ], className='partner-logo-wrapper'),
                    html.Div([
                        html.Span([
                            get_category_icon(partner['category']), 
                            " " + partner['category']
                        ], className='category-badge')
                    ], className='category-badge-wrapper')
                ], className='partner-card-header'),
                
                # Card body with partner info
                html.Div([
                    html.H3(partner['name'], className='partner-name'),
                    html.P([
                        html.I(className="far fa-calendar-alt mr-1"),
                        f"Partner since {partner['partnership_year']}"
                    ], className='partner-year'),
                    html.P(partner['description'][:120] + "..." if len(partner['description']) > 120 else partner['description'], 
                        className='partner-desc'),
                    focus_tags,
                ], className='partner-card-body'),
                
                # Card footer with action button
                html.Div([
                    html.A([
                        'View Details ',
                        html.I(className='fas fa-arrow-right ml-1')
                    ], href=f'/partner/{partner["id"]}', className='view-details-btn')
                ], className='partner-card-footer')
            ], className='partner-card-inner')
        ], className='partner-card', id=f'partner-{partner["id"]}'))
    
    return html.Div([
        # Hero section
        html.Div([
            html.Div(className="hero-bg-animation"),
            html.Div([
                html.H1([
                    "Sustainability ",
                    html.Span("Partner Network", className="highlight-text")
                ], className="hero-title"),
                
                html.P("Collaborating for a sustainable future across the Southwest", 
                       className="hero-subtitle"),
                       
                html.Div([
                    html.Div([
                        html.I(className="fas fa-search search-icon"),
                        dcc.Input(
                            id='partner-search',
                            type='text',
                            placeholder='Search partners by name, focus area, or category...',
                            className='search-input'
                        ),
                        html.Button([
                            'Search',
                            html.I(className="fas fa-arrow-right ml-2")
                        ], id='search-button', className='search-button')
                    ], className='search-container')
                ], className='hero-actions'),
                
                # Animated stats cards
                html.Div([
                    html.Div([
                        html.I(className="fas fa-users stat-icon"),
                        html.Span("12+", className="hero-stat-number"),
                        html.Span("Partners", className="hero-stat-label")
                    ], className="hero-stat"),
                    html.Div([
                        html.I(className="fas fa-dollar-sign stat-icon"),
                        html.Span("$120M+", className="hero-stat-number"),
                        html.Span("Funding", className="hero-stat-label")
                    ], className="hero-stat"),
                    html.Div([
                        html.I(className="fas fa-water stat-icon"),
                        html.Span("35M+", className="hero-stat-number"),
                        html.Span("Gallons Saved", className="hero-stat-label")
                    ], className="hero-stat"),
                ], className="hero-stats")
            ], className='hero-content')
        ], className='hero-section'),
        
        # Featured partners section
        html.Div([
            html.H2("Featured Partners", className="section-title"),
            html.Div([
                html.Div([
                    html.Div([
                        html.Img(src='/assets/unlv_logo.svg', className='featured-logo'),
                        html.Div([
                            html.P("UNLV", className='featured-name'),
                            html.P("Academic", className='featured-category')
                        ], className='featured-info')
                    ], className='featured-content'),
                    html.A("View Profile", href='/partner/9', className='featured-link')
                ], className='featured-partner'),
                
                # More featured partners
                # ...existing code...
                
            ], className='featured-partners-container')
        ], className='featured-partners-section'),
        
        # Impact visualization section
        html.Div([
            html.Div([
                html.H2([
                    html.I(className="fas fa-chart-line mr-2"),
                    "Our Collective Impact"
                ], className="section-title"),
                html.P("Together with our partners, we're driving sustainable change across the Southwest", 
                    className="section-subtitle")
            ], className="impact-header"),
            
            html.Div([
                html.Div([
                    # Impact stats
                    # ...existing code...
                ], className="impact-stats-grid")
            ], className="impact-stats-container")
        ], className="impact-stats-section"),
        
        # CTA section
        html.Div([
            html.Div([
                html.Div([
                    html.H2([
                        html.I(className="fas fa-hands-helping mr-2"), 
                        "Become a Partner"
                    ], className="cta-title"),
                    html.P("Join our network of partners driving sustainability innovation in the Southwest", 
                        className="cta-description"),
                ], className="cta-text"),
                html.A([
                    html.I(className="fas fa-envelope mr-2"),
                    "Contact Us"
                ], href="/contact", className="cta-button")
            ], className="cta-container")
        ], className="cta-section"),
        
        # Partners directory with filters
        html.Div([
            # Filters sidebar
            html.Div([
                html.H2("Filters", className="filter-heading"),
                
                # Search within filters
                html.Div([
                    html.I(className="fas fa-search filter-search-icon"),
                    dcc.Input(
                        id='filter-search',
                        type='text',
                        placeholder='Search filters...',
                        className='filter-search-input'
                    ),
                ], className='filter-search'),
                
                # Category filter
                html.Div([
                    html.Div([
                        html.H3("Partner Type", className="filter-subheading"),
                        html.I(className="fas fa-chevron-down filter-toggle", id="category-toggle")
                    ], className="filter-header"),
                    
                    html.Div([
                        dcc.Checklist(
                            id='category-filter',
                            options=[{'label': category, 'value': category} for category in categories],
                            value=[],
                            className='filter-checklist',
                            inputStyle={"marginRight": "8px"}
                        )
                    ], className='filter-content', id="category-filter-content")
                ], className='filter-group'),
                
                # Focus area filter  
                html.Div([
                    html.Div([
                        html.H3("Focus Areas", className="filter-subheading"),
                        html.I(className="fas fa-chevron-down filter-toggle", id="focus-toggle")
                    ], className="filter-header"),
                    
                    html.Div([
                        dcc.Checklist(
                            id='focus-filter',
                            options=[{'label': area, 'value': area} for area in focus_areas],
                            value=[],
                            className='filter-checklist',
                            inputStyle={"marginRight": "8px"}
                        )
                    ], className='filter-content', id="focus-filter-content")
                ], className='filter-group'),
                
                # Filter buttons
                html.Div([
                    html.Button([
                        html.I(className="fas fa-filter mr-2"),
                        'Apply Filters'
                    ], id='apply-filters', className='filter-button'),
                    
                    html.Button([
                        html.I(className="fas fa-times mr-2"),
                        'Clear Filters'
                    ], id='clear-filters', className='filter-button secondary')
                ], className="filter-actions")
            ], className='filters-sidebar'),
            
            # Partners content area
            html.Div([
                html.Div([
                    html.H2("Partner Directory", className="section-title"),
                    html.P("Driving sustainability innovation through collaboration", 
                           className="section-description"),
                    
                    # Add result count and sort options
                    html.Div([
                        html.P(f"Showing {len(partner_cards)} partners", className="results-count"),
                        html.Div([
                            html.Label("Sort by:", className="sort-label"),
                            dcc.Dropdown(
                                id='sort-dropdown',
                                options=[
                                    {'label': 'Name (A-Z)', 'value': 'name_asc'},
                                    {'label': 'Name (Z-A)', 'value': 'name_desc'},
                                    {'label': 'Newest Partners', 'value': 'year_desc'},
                                    {'label': 'Oldest Partners', 'value': 'year_asc'},
                                ],
                                value='name_asc',
                                clearable=False,
                                className='sort-dropdown'
                            )
                        ], className="sort-container")
                    ], className="results-header")
                ], className='partners-header'),
                
                # Partners grid
                html.Div(
                    partner_cards,
                    id='partners-grid',
                    className='partners-grid'
                ),
                
                # Pagination
                html.Div([
                    html.Button([html.I(className="fas fa-chevron-left")], className="pagination-button prev"),
                    html.Span("Page 1 of 1", className="pagination-info"),
                    html.Button([html.I(className="fas fa-chevron-right")], className="pagination-button next"),
                ], className="pagination")
            ], className='partners-content')
        ], className='partners-container')
    ], className='partners-page')

def render_partner_details(partner_id):
    """Create the partner details page"""
    partner_data = get_partner_details(partner_id)
    
    if not partner_data['partner']:
        return html.Div([
            html.H1("Partner Not Found", className="not-found-title"),
            html.P("The requested partner information could not be found.", className="not-found-message"),
            html.A("Return to Partners Directory", href="/", className="back-link")
        ], className="not-found-container")
    
    partner = partner_data['partner']
    projects = partner_data['projects']
    metrics = partner_data['metrics']
    geo_data = partner_data['geo_data']
    
    # Create enhanced metrics visualization
    metrics_figures = []
    for i, metric in enumerate(metrics):
        if i < 4:  # Display up to 4 key metrics
            fig = go.Figure()
            fig.add_trace(go.Indicator(
                mode="number+delta",
                value=metric['metric_value'],
                number={'suffix': f" {metric['metric_unit']}", 'font': {'color': SWSIE_COLORS['primary'], 'size': 32}},
                delta={'position': "top", 'reference': metric['metric_value']*0.9, 'increasing': {'color': SWSIE_COLORS['success']}},
                domain={'x': [0, 1], 'y': [0, 1]},
                title={'text': metric['metric_name'], 'font': {'size': 16}}
            ))
            fig.update_layout(
                height=200,
                margin=dict(l=30, r=30, t=40, b=30),
                paper_bgcolor='rgba(0,0,0,0)',
                plot_bgcolor='rgba(0,0,0,0)',
            )
            
            metrics_figures.append(
                html.Div([
                    dcc.Graph(figure=fig, config={'displayModeBar': False})
                ], className='metric-card')
            )
    
    # Create modern project cards
    project_items = []
    for project in projects:
        status_class = project['status'].lower().replace(' ', '-')
        
        # Calculate project timeline and progress
        import datetime as dt
        start_date = dt.datetime.strptime(project['start_date'], "%Y-%m-%d")
        end_date = dt.datetime.strptime(project['end_date'], "%Y-%m-%d")
        total_days = (end_date - start_date).days
        
        if project['status'] == "Completed":
            progress = 100
        else:
            days_passed = (dt.datetime.now() - start_date).days
            progress = min(int((days_passed / total_days) * 100), 100) if total_days > 0 else 0
        
        project_items.append(html.Div([
            # Project header with title and status
            html.Div([
                html.H3(project['title'], className='project-title'),
                html.Span(project['status'], className=f'project-status {status_class}')
            ], className='project-header'),
            
            # Project description
            html.P(project['description'], className='project-description'),
            
            # Progress bar for project timeline
            html.Div([
                html.Div([
                    html.Div(className="progress-fill", style={"width": f"{progress}%"})
                ], className="progress-bar"),
                html.Div([
                    html.Span(f"{progress}% Complete", className="progress-text")
                ], className="progress-label")
            ], className="project-progress"),
            
            # Project details in a better layout
            html.Div([
                html.Div([
                    html.I(className="fas fa-calendar timeline-icon"),
                    html.Div([
                        html.P("Timeline", className="detail-label"),
                        html.P(f"{project['start_date']} to {project['end_date']}", className="detail-value")
                    ], className="detail-content")
                ], className="project-detail"),
                
                html.Div([
                    html.I(className="fas fa-tag area-icon"),
                    html.Div([
                        html.P("Impact Area", className="detail-label"),
                        html.P(project['impact_area'], className="detail-value")
                    ], className="detail-content")
                ], className="project-detail"),
                
                html.Div([
                    html.I(className="fas fa-dollar-sign funding-icon"),
                    html.Div([
                        html.P("Funding", className="detail-label"),
                        html.P(f"${project['funding']:,.0f}", className="detail-value")
                    ], className="detail-content")
                ], className="project-detail")
            ], className='project-details')
        ], className='project-card'))
    
    # Create enhanced heatmap with better styling
    heatmap = None
    if geo_data:
        # Convert SQLite row objects to Python dictionaries for Plotly
        geo_data_list = []
        for item in geo_data:
            geo_data_list.append({
                'latitude': item['latitude'],
                'longitude': item['longitude'],
                'impact_type': item['impact_type'],
                'impact_value': item['impact_value'],
                'description': item['description']
            })
        
        # Create a better map figure
        map_fig = px.scatter_mapbox(
            geo_data_list,
            lat='latitude',
            lon='longitude',
            size='impact_value',
            color='impact_type',
            hover_name='description',
            color_discrete_sequence=[
                SWSIE_COLORS['primary'], 
                SWSIE_COLORS['secondary'], 
                SWSIE_COLORS['accent'], 
                SWSIE_COLORS['highlight'], 
                SWSIE_COLORS['chart1']
            ],
            zoom=9,
        )
        
        map_fig.update_layout(
            mapbox_style="carto-positron",  # More modern map style
            margin={"r": 0, "t": 0, "l": 0, "b": 0},
            height=500,
            legend=dict(
                yanchor="top",
                y=0.99,
                xanchor="left",
                x=0.01,
                bgcolor="rgba(255, 255, 255, 0.8)",
                bordercolor="rgba(0, 0, 0, 0.1)",
                borderwidth=1
            )
        )
        
        heatmap = html.Div([
            html.Div([
                html.H2("Geographic Impact", className="section-title"),
                html.P("Locations where this partner is making a difference", className="section-description"),
            ], className="map-header"),
            
            dcc.Graph(figure=map_fig, className="impact-map")
        ], className="map-container")
    
    # Parse focus areas into a list for badges
    focus_areas = [area.strip() for area in partner['focus_areas'].split(',')]
    focus_badges = html.Div([
        html.Span(area, className='focus-badge') for area in focus_areas
    ], className='focus-badges')
    
    # Create a more visually appealing partner details page
    return html.Div([
        # Breadcrumb navigation with better styling
        html.Div([
            html.A([html.I(className="fas fa-home"), " Home"], href="/", className="breadcrumb-item"),
            html.I(className="fas fa-chevron-right breadcrumb-separator"),
            html.A("Partners", href="/", className="breadcrumb-item"),
            html.I(className="fas fa-chevron-right breadcrumb-separator"),
            html.Span(partner['name'], className="breadcrumb-item active"),
        ], className="breadcrumb"),
        
        # Enhanced partner header section with cover image and gradient overlay
        html.Div([
            html.Div(className="partner-cover-gradient"),
            html.Div([
                html.Img(src=f'/assets/{partner["logo_path"]}', className='partner-detail-logo'),
                html.Div([
                    html.Div([
                        html.H1(partner['name'], className='partner-detail-name'),
                        html.Span([
                            get_category_icon(partner['category']),
                            " " + partner['category']
                        ], className='partner-category-badge')
                    ], className="partner-title-container"),
                    
                    html.P([
                        html.I(className="far fa-calendar-alt mr-2"),
                        f"Partner since {partner['partnership_year']}"
                    ], className='partner-since'),
                    
                    focus_badges,
                    
                    html.P(partner['description'], className='partner-full-desc'),
                    
                    html.Div([
                        html.A([
                            html.I(className="fas fa-globe mr-2"),
                            "Visit Website"
                        ], href=partner['website'], target="_blank", className='partner-website'),
                        
                        html.A([
                            html.I(className="fas fa-envelope mr-2"),
                            "Contact Partner"
                        ], href=f"mailto:{partner['contact_email']}", className='partner-contact')
                    ], className="partner-actions")
                ], className='partner-detail-info')
            ], className='partner-detail-header-content')
        ], className='partner-detail-header'),
        
        # Partner metrics section
        html.Div([
            html.Div([
                html.H2("Impact Metrics", className="section-title"),
                html.P("Key performance indicators and achievements", className="section-description"),
            ], className="section-header"),
            
            html.Div(
                metrics_figures if metrics_figures else html.P("No metrics data available for this partner.", className="no-data-message"),
                className='metrics-grid'
            )
        ], className='metrics-section'),
        
        # Projects section
        html.Div([
            html.Div([
                html.H2("Projects & Initiatives", className="section-title"),
                html.P("Current and past sustainability projects", className="section-description"),
            ], className="section-header"),
            
            html.Div(
                project_items if project_items else html.P("No projects found for this partner.", className="no-data-message"),
                className='projects-list'
            )
        ], className='projects-section'),
        
        # Geographic impact map (if available)
        html.Div([
            heatmap if heatmap else html.Div([
                html.H2("Geographic Impact", className="section-title"),
                html.P("No geographical impact data available for this partner.", className="no-data-message")
            ])
        ], className='geo-impact-section'),
        
        # Contact information with better layout
        html.Div([
            html.Div([
                html.H2("Contact Information", className="section-title"),
                html.P("Get in touch with this partner", className="section-description"),
            ], className="section-header"),
            
            html.Div([
                html.Div([
                    html.I(className="fas fa-envelope contact-icon"),
                    html.Div([
                        html.P("Email", className="contact-label"),
                        html.A(partner['contact_email'], href=f"mailto:{partner['contact_email']}", className="contact-value")
                    ], className="contact-content")
                ], className='contact-item'),
                
                html.Div([
                    html.I(className="fas fa-phone contact-icon"),
                    html.Div([
                        html.P("Phone", className="contact-label"),
                        html.P(partner['contact_phone'], className="contact-value")
                    ], className="contact-content")
                ], className='contact-item'),
                
                html.Div([
                    html.I(className="fas fa-globe contact-icon"),
                    html.Div([
                        html.P("Website", className="contact-label"),
                        html.A("Visit Website", href=partner['website'], target="_blank", className="contact-value")
                    ], className="contact-content")
                ], className='contact-item'),
            ], className='contact-info')
        ], className='contact-section'),
        
        # Related partners section
        html.Div([
            html.Div([
                html.H2("Similar Partners", className="section-title"),
                html.P("You might also be interested in these organizations", className="section-description"),
            ], className="section-header"),
            
            html.Div([
                # Placeholder related partners - would be dynamically generated based on category/focus area
                html.Div([
                    html.Img(src="/assets/unlv_logo.svg", className="related-partner-logo"),
                    html.P("UNLV", className="related-partner-name"),
                    html.A("View", href="/partner/9", className="related-partner-link")
                ], className="related-partner-card"),
                
                html.Div([
                    html.Img(src="/assets/nvidia_logo.svg", className="related-partner-logo"),
                    html.P("NVIDIA", className="related-partner-name"),
                    html.A("View", href="/partner/7", className="related-partner-link")
                ], className="related-partner-card"),
                
                html.Div([
                    html.Img(src="/assets/coca_cola_logo.svg", className="related-partner-logo"),
                    html.P("Coca-Cola", className="related-partner-name"),
                    html.A("View", href="/partner/6", className="related-partner-link")
                ], className="related-partner-card"),
            ], className="related-partners-grid")
        ], className="related-partners-section")
    ], className='partner-detail-page')

# Additional page rendering functions
def render_about_page():
    """Create the about page"""
    return html.Div([
        html.Div([
            html.H1("About SWSIE", className="page-title"),
            html.P("The Southwest Sustainability Innovation Engine", className="page-subtitle"),
        ], className="page-header"),
        
        html.Div([
            html.Div([
                html.H2("Our Mission", className="section-title"),
                html.P([
                    "The Southwest Sustainability Innovation Engine (SWSIE) is dedicated to addressing ",
                    "critical sustainability challenges in the Southwestern United States through ",
                    "collaborative innovation, research, and implementation of solutions."
                ], className="mission-text"),
                
                html.Div([
                    html.Div([
                        html.I(className="fas fa-lightbulb mission-icon"),
                        html.H3("Innovate", className="mission-point-title"),
                        html.P("Develop new technologies and approaches to sustainability challenges", className="mission-point-text")
                    ], className="mission-point"),
                    
                    html.Div([
                        html.I(className="fas fa-handshake mission-icon"),
                        html.H3("Collaborate", className="mission-point-title"),
                        html.P("Foster partnerships across sectors to amplify impact", className="mission-point-text")
                    ], className="mission-point"),
                    
                    html.Div([
                        html.I(className="fas fa-seedling mission-icon"),
                        html.H3("Implement", className="mission-point-title"),
                        html.P("Put solutions into practice to create measurable change", className="mission-point-text")
                    ], className="mission-point"),
                ], className="mission-points")
            ], className="mission-section"),
            
            html.Div([
                html.H2("Our Focus Areas", className="section-title"),
                html.Div([
                    html.Div([
                        html.I(className="fas fa-water focus-icon"),
                        html.H3("Water Conservation", className="focus-title"),
                        html.P("Developing innovative approaches to water conservation and management in arid regions", className="focus-text")
                    ], className="focus-area"),
                    
                    html.Div([
                        html.I(className="fas fa-solar-panel focus-icon"),
                        html.H3("Renewable Energy", className="focus-title"),
                        html.P("Advancing renewable energy adoption and integration, with emphasis on solar power", className="focus-text")
                    ], className="focus-area"),
                    
                    html.Div([
                        html.I(className="fas fa-city focus-icon"),
                        html.H3("Sustainable Urban Development", className="focus-title"),
                        html.P("Creating more sustainable and resilient urban environments in desert cities", className="focus-text")
                    ], className="focus-area"),
                    
                    html.Div([
                        html.I(className="fas fa-leaf focus-icon"),
                        html.H3("Desert Ecosystem Conservation", className="focus-title"),
                        html.P("Preserving and restoring native ecosystems in the Southwest region", className="focus-text")
                    ], className="focus-area"),
                ], className="focus-areas-grid")
            ], className="focus-areas-section"),
            
            html.Div([
                html.H2("Our Impact", className="section-title"),
                html.Div([
                    # Impact statistics would be dynamically generated from actual data
                    html.Div([
                        html.Div([
                            html.Span("35M+", className="impact-number"),
                            html.Span("Gallons", className="impact-unit")
                        ], className="impact-value"),
                        html.P("Water saved through conservation initiatives", className="impact-description")
                    ], className="impact-stat"),
                    
                    html.Div([
                        html.Div([
                            html.Span("12+", className="impact-number"),
                            html.Span("Partners", className="impact-unit")
                        ], className="impact-value"),
                        html.P("Organizations collaborating on sustainability", className="impact-description")
                    ], className="impact-stat"),
                    
                    html.Div([
                        html.Div([
                            html.Span("$120M+", className="impact-number"),
                            html.Span("Funding", className="impact-unit")
                        ], className="impact-value"),
                        html.P("Invested in sustainability projects", className="impact-description")
                    ], className="impact-stat"),
                ], className="impact-stats-container")
            ], className="impact-section"),
            
            html.Div([
                html.H2("Our Team", className="section-title"),
                html.P("The SWSIE is led by a diverse team of experts in sustainability, science, engineering, and policy.", 
                       className="team-intro"),
                # Team members would be dynamically generated
                html.Div([
                    html.Div([
                        html.Img(src="/assets/placeholder-person.jpg", className="team-photo"),
                        html.H3("Dr. Jane Smith", className="team-name"),
                        html.P("Executive Director", className="team-title"),
                        html.P("Expert in water resource management and policy", className="team-bio")
                    ], className="team-member"),
                    
                    html.Div([
                        html.Img(src="/assets/placeholder-person.jpg", className="team-photo"),
                        html.H3("Dr. Michael Johnson", className="team-name"),
                        html.P("Research Director", className="team-title"),
                        html.P("Specializes in renewable energy systems and integration", className="team-bio")
                    ], className="team-member"),
                    
                    html.Div([
                        html.Img(src="/assets/placeholder-person.jpg", className="team-photo"),
                        html.H3("Dr. Lisa Garcia", className="team-name"),
                        html.P("Partnerships Director", className="team-title"),
                        html.P("Focuses on building cross-sector sustainability collaborations", className="team-bio")
                    ], className="team-member"),
                ], className="team-grid")
            ], className="team-section")
        ], className="about-content")
    ], className="about-page")

def render_reports_page():
    """Create the impact reports page"""
    return html.Div([
        html.Div([
            html.H1("Impact Reports", className="page-title"),
            html.P("Measuring our collective progress toward sustainability goals", className="page-subtitle"),
        ], className="page-header"),
        
        # Placeholder for actual reports content
        html.Div([
            html.P("Impact Reports page under development", className="placeholder-text"),
            html.P("Please check back soon for detailed reports on our sustainability initiatives.", className="placeholder-text")
        ], className="placeholder-content")
    ], className="reports-page")

def render_contact_page():
    """Create the contact page"""
    return html.Div([
        html.Div([
            html.H1("Contact Us", className="page-title"),
            html.P("Get in touch with the SWSIE team", className="page-subtitle"),
        ], className="page-header"),
        
        html.Div([
            # Contact form
            html.Div([
                html.H2("Send us a message", className="section-title"),
                html.Form([
                    html.Div([
                        html.Label("Name", htmlFor="name", className="form-label"),
                        dcc.Input(
                            id="name",
                            type="text",
                            placeholder="Your name",
                            className="form-input"
                        )
                    ], className="form-group"),
                    
                    html.Div([
                        html.Label("Email", htmlFor="email", className="form-label"),
                        dcc.Input(
                            id="email",
                            type="email",
                            placeholder="Your email address",
                            className="form-input"
                        )
                    ], className="form-group"),
                    
                    html.Div([
                        html.Label("Subject", htmlFor="subject", className="form-label"),
                        dcc.Input(
                            id="subject",
                            type="text",
                            placeholder="Message subject",
                            className="form-input"
                        )
                    ], className="form-group"),
                    
                    html.Div([
                        html.Label("Message", htmlFor="message", className="form-label"),
                        dcc.Textarea(
                            id="message",
                            placeholder="Your message",
                            className="form-textarea"
                        )
                    ], className="form-group"),
                    
                    html.Button("Send Message", id="send-message", className="send-button")
                ], className="contact-form")
            ], className="contact-form-container"),
            
            # Contact information
            html.Div([
                html.H2("Contact Information", className="section-title"),
                html.Div([
                    html.Div([
                        html.I(className="fas fa-map-marker-alt contact-icon"),
                        html.Div([
                            html.P("Address", className="contact-label"),
                            html.P("123 Sustainability Way", className="contact-value"),
                            html.P("Las Vegas, NV 89154", className="contact-value")
                        ], className="contact-details")
                    ], className="contact-info-item"),
                    
                    html.Div([
                        html.I(className="fas fa-envelope contact-icon"),
                        html.Div([
                            html.P("Email", className="contact-label"),
                            html.A("info@swsie.org", href="mailto:info@swsie.org", className="contact-value")
                        ], className="contact-details")
                    ], className="contact-info-item"),
                    
                    html.Div([
                        html.I(className="fas fa-phone contact-icon"),
                        html.Div([
                            html.P("Phone", className="contact-label"),
                            html.P("(702) 555-1234", className="contact-value")
                        ], className="contact-details")
                    ], className="contact-info-item"),
                    
                    html.Div([
                        html.I(className="fas fa-clock contact-icon"),
                        html.Div([
                            html.P("Hours", className="contact-label"),
                            html.P("Monday-Friday: 8:00 AM - 5:00 PM", className="contact-value"),
                            html.P("Saturday-Sunday: Closed", className="contact-value")
                        ], className="contact-details")
                    ], className="contact-info-item"),
                ], className="contact-info-container")
            ], className="contact-info-section")
        ], className="contact-content")
    ], className="contact-page")

def render_not_found_page():
    """Create the 404 page"""
    return html.Div([
        html.H1("404: Page Not Found", className="not-found-title"),
        html.P("The page you're looking for doesn't exist.", className="not-found-message"),
        html.A("Return to Home", href="/", className="back-link")
    ], className="not-found-container")
