from dash import html

def get_category_icon(category):
    """Return appropriate icon for partner category"""
    icons = {
        "Industry": html.I(className="fas fa-industry"),
        "Academic": html.I(className="fas fa-university"),
        "Research": html.I(className="fas fa-flask"),
        "Non-profit": html.I(className="fas fa-hand-holding-heart"),
    }
    return icons.get(category, html.I(className="fas fa-building"))
