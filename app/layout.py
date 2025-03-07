from dash import html
from datetime import datetime

def create_header():
    """Create the website header component"""
    return html.Div([
        html.Div([
            # Logo and title
            html.Div([
                html.A([
                    html.Img(src='/assets/swsie_logo.svg', className='logo'),
                ], href='/', className='logo-link'),
                html.H1('SWSIE', className='header-title'),
            ], className='logo-title-container'),
            
            # Navigation menu
            html.Nav([
                html.A('Partners', href='/', className='nav-link active'),
                html.A('About', href='/about', className='nav-link'),
                html.A('Impact', href='/reports', className='nav-link'),
                html.A('Contact', href='/contact', className='nav-link'),
            ], className='nav-menu')
        ], className='header-container')
    ], className='website-header')

def create_footer():
    """Create the website footer component"""
    current_year = datetime.now().year
    return html.Footer([
        html.Div([
            html.Div([
                html.H3("SWSIE", className="footer-title"),
                html.P("The Southwest Sustainability Innovation Engine drives innovation and collaboration for a sustainable future in the Southwest region.", className="footer-description"),
            ], className="footer-about"),
            
            html.Div([
                html.H3("Quick Links", className="footer-title"),
                html.Ul([
                    html.Li(html.A("Home", href="/")),
                    html.Li(html.A("Partners", href="/")),
                    html.Li(html.A("Impact Reports", href="/reports")),
                    html.Li(html.A("Research", href="#")),
                ], className="footer-links")
            ], className="footer-nav"),
            
            html.Div([
                html.H3("Connect", className="footer-title"),
                html.Ul([
                    html.Li(html.A("Contact Us", href="/contact")),
                    html.Li(html.A("Newsletter", href="#")),
                    html.Li(html.A("Events", href="#")),
                ], className="footer-links")
            ], className="footer-connect"),
            
            html.Div([
                html.H3("Legal", className="footer-title"),
                html.Ul([
                    html.Li(html.A("Privacy Policy", href="#")),
                    html.Li(html.A("Terms of Use", href="#")),
                ], className="footer-links"),
                html.P(f"© {current_year} SWSIE. All Rights Reserved.", className="copyright")
            ], className="footer-legal"),
        ], className="footer-content")
    ], className="website-footer")

def create_main_layout():
    """Create the app's main layout with routing"""
    from app import app
    
    layout = html.Div([
        html.Div(id='url-container', children=[
            # This div ensures that the URL component is rendered even when not visible
            # which is important for callbacks that depend on the URL
            html.Div(style={'display': 'none'}, children=[
                html.Div(id='dummy-div')
            ])
        ]),
        
        # URL Location component for routing
        html.Div([
            html.Div(id='dummy-output') 
        ], style={'display': 'none'}),
        
        # Main Layout structure
        html.Div([
            create_header(),
            html.Div(id='page-content', className='page-content'),
            create_footer()
        ], className='site-wrapper'),
        
        # Store components for state management
        html.Div([
            html.Div(id='dummy-store')
        ], style={'display': 'none'})
    ])
    
    return layout
