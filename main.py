import logging
from dash.dependencies import Input, Output, State
import dash_core_components as dcc  # Import explicitly to ensure availability

# Import from our modular structure
from app import app, server, logger
from app.database import init_db
from app.routes import (render_partners_page, render_partner_details, 
                       render_about_page, render_reports_page, 
                       render_contact_page, render_not_found_page)
from app.layout import create_main_layout
from config import active_config as config

# Initialize the database with sample data
init_db()

# Set up the app's main layout
app.layout = create_main_layout()

# Add callback for partner tabs (moved from previous main.py)
@app.callback(
    Output("partner-tab-content", "children"),
    Input("partner-tabs", "value"),
    State("url", "pathname")
)
def render_tab_content(tab, pathname):
    if not pathname or not pathname.startswith("/partner/"):
        return ""
    
    try:
        partner_id = int(pathname.split("/")[-1])
    except ValueError:
        return "Invalid partner ID"
    
    # Pass to the appropriate tab content handler in routes module
    # This could be further refactored by moving this callback to a callbacks.py module
    from app.database import get_partner_details
    from app.utils import get_category_icon
    import plotly.express as px
    import plotly.graph_objects as go
    from dash import html
    
    partner_data = get_partner_details(partner_id)
    if not partner_data['partner']:
        return html.Div("Partner not found")
    
    partner = partner_data['partner']
    projects = partner_data['projects']
    metrics = partner_data['metrics']
    geo_data = partner_data['geo_data']
    
    # Simplified tab content rendering 
    if tab == "metrics":
        # Create metrics figures
        metrics_figures = []
        for metric in metrics:
            fig = go.Figure()
            fig.add_trace(go.Indicator(
                mode="number+delta",
                value=metric['metric_value'],
                number={'suffix': f" {metric['metric_unit']}", 'font': {'color': "#0070f3", 'size': 32}},
                delta={'position': "top", 'reference': metric['metric_value']*0.9, 'increasing': {'color': "#00c853"}},
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
        
        return html.Div([
            html.Div(
                metrics_figures if metrics_figures else html.P("No metrics data available for this partner.", className="no-data-message"),
                className='metrics-grid'
            )
        ], className='metrics-tab-content')
    
    # Other tabs follow similar pattern...
    # This could be further modularized in the future
    return html.Div("Tab content here")

# Define the routing callback
@app.callback(
    Output('page-content', 'children'),
    Input('url', 'pathname')
)
def display_page(pathname):
    if pathname == '/' or pathname == '/partners':
        return render_partners_page()
    elif pathname.startswith('/partner/'):
        try:
            partner_id = int(pathname.split('/')[-1])
            return render_partner_details(partner_id)
        except ValueError:
            logger.error(f"Invalid partner ID in URL: {pathname}")
            return html.Div("Invalid partner ID", className="error-message")
    elif pathname == '/about':
        return render_about_page()
    elif pathname == '/reports':
        return render_reports_page()
    elif pathname == '/contact':
        return render_contact_page()
    else:
        logger.warning(f"Page not found: {pathname}")
        return render_not_found_page()

# Start the app
if __name__ == '__main__':
    logger.info(f"Starting server on {config.HOST}:{config.PORT}")
    app.run_server(
        debug=config.DEBUG,
        host=config.HOST,
        port=config.PORT
    )
