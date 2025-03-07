import sqlite3
import logging
from config import active_config as config

logger = logging.getLogger(__name__)

def get_db_connection():
    """Create and return a database connection"""
    try:
        conn = sqlite3.connect(config.DATABASE_PATH)
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        logger.error(f"Database connection error: {e}")
        raise Exception("Database connection failed")

def get_all_partners():
    """Get all partners from the database"""
    conn = get_db_connection()
    partners = conn.execute('SELECT * FROM partners').fetchall()
    conn.close()
    return partners

def get_partner_details(partner_id):
    """Get complete details for a single partner"""
    conn = get_db_connection()
    partner = conn.execute('SELECT * FROM partners WHERE id = ?', (partner_id,)).fetchone()
    
    # Get projects
    projects = conn.execute('''
        SELECT * FROM projects 
        WHERE partner_id = ? 
        ORDER BY start_date DESC
    ''', (partner_id,)).fetchall()
    
    # Get metrics
    metrics = conn.execute('''
        SELECT * FROM impact_metrics 
        WHERE partner_id = ? 
        ORDER BY report_date DESC
    ''', (partner_id,)).fetchall()
    
    # Get geographical impact data
    geo_data = conn.execute('''
        SELECT * FROM geo_impact 
        WHERE partner_id = ?
    ''', (partner_id,)).fetchall()
    
    conn.close()
    
    return {
        'partner': partner,
        'projects': projects,
        'metrics': metrics,
        'geo_data': geo_data
    }

def init_db():
    """Initialize SQLite database with sample data"""
    conn = sqlite3.connect(config.DATABASE_PATH)
    cursor = conn.cursor()

    # Create partners table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS partners (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            logo_path TEXT,
            category TEXT NOT NULL,
            focus_areas TEXT NOT NULL,
            website TEXT,
            description TEXT,
            partnership_year INTEGER,
            contact_email TEXT,
            contact_phone TEXT
        )
    """)

    # Create projects table for partner projects
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY,
            partner_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            start_date TEXT,
            end_date TEXT,
            status TEXT NOT NULL,
            impact_area TEXT,
            funding REAL,
            FOREIGN KEY (partner_id) REFERENCES partners (id)
        )
    """)

    # Create metrics table for impact measurements
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS impact_metrics (
            id INTEGER PRIMARY KEY,
            partner_id INTEGER NOT NULL,
            metric_name TEXT NOT NULL,
            metric_value REAL NOT NULL,
            metric_unit TEXT NOT NULL,
            report_date TEXT NOT NULL,
            FOREIGN KEY (partner_id) REFERENCES partners (id)
        )
    """)

    # Create geographical data for heat maps
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS geo_impact (
            id INTEGER PRIMARY KEY,
            partner_id INTEGER NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL,
            impact_type TEXT NOT NULL,
            impact_value REAL NOT NULL,
            description TEXT,
            FOREIGN KEY (partner_id) REFERENCES partners (id)
        )
    """)

    # Sample data for partners
    sample_partners = [
        (1, "Desert Solar Technologies", "desert_solar_logo.svg", "Industry", "Renewable Energy,Solar", 
         "https://example.com/desertsolar", "Leading solar technology provider focused on desert environments", 
         2018, "contact@desertsolar.example", "555-123-4567"),
        (2, "Nevada Water Solutions", "nevada_water_logo.svg", "Research", "Water Conservation,Education", 
         "https://example.com/nvwater", "Research institute dedicated to water conservation solutions for arid regions", 
         2019, "info@nvwater.example", "555-234-5678"),
        (3, "Green Building Alliance", "green_building_logo.svg", "Non-profit", "Green Building,Community Development", 
         "https://example.com/greenbuilding", "Coalition promoting sustainable building practices in the Southwest", 
         2020, "alliance@greenbuilding.example", "555-345-6789"),
        (4, "EcoDesert Research Center", "ecodesert_logo.svg", "Academic", "Ecological Research,Desert Ecosystem", 
         "https://example.com/ecodesert", "Research center focusing on desert ecosystem preservation and study", 
         2017, "research@ecodesert.example", "555-456-7890"),
        (5, "Southwest Energy Innovations", "sw_energy_logo.svg", "Industry", "Renewable Energy,Grid Solutions", 
         "https://example.com/swenergy", "Energy innovation company developing grid solutions for renewable integration", 
         2021, "hello@swenergy.example", "555-567-8901"),
        
        # Adding new partners
        (6, "Coca-Cola", "coca_cola_logo.svg", "Industry", "Water Stewardship,Packaging Sustainability", 
         "https://www.coca-cola.com", "Global beverage company committed to water conservation and sustainable packaging initiatives in the Southwest region", 
         2019, "sustainability@coca-cola.com", "800-438-2653"),
        (7, "NVIDIA", "nvidia_logo.svg", "Industry", "AI Computing,Energy Efficiency", 
         "https://www.nvidia.com", "Technology company leveraging AI and high-performance computing to address climate modeling and sustainability challenges", 
         2020, "sustainability@nvidia.com", "408-486-2000"),
        (8, "Starbucks", "starbucks_logo.svg", "Industry", "Ethical Sourcing,Waste Reduction", 
         "https://www.starbucks.com", "Coffee company implementing water conservation techniques and sustainable store designs across Southwestern locations", 
         2018, "greeninitiatives@starbucks.com", "800-782-7282"),
        (9, "University of Nevada, Las Vegas", "unlv_logo.svg", "Academic", "Urban Sustainability,Climate Research", 
         "https://www.unlv.edu", "Leading research university with innovative programs in urban sustainability, water conservation, and renewable energy", 
         2017, "sustainability@unlv.edu", "702-895-3011"),
        (10, "NV Energy", "nv_energy_logo.svg", "Industry", "Renewable Energy,Smart Grid", 
         "https://www.nvenergy.com", "Nevada's largest electric utility driving the transition to renewable energy sources and implementing smart grid technologies", 
         2016, "renewables@nvenergy.com", "775-834-4444"),
        (11, "Arizona State University", "asu_logo.svg", "Academic", "Sustainability Solutions,Circular Economy", 
         "https://www.asu.edu", "Research university with the nation's first School of Sustainability, focusing on interdisciplinary approaches to environmental challenges", 
         2018, "sustainability@asu.edu", "480-965-3000"),
        (12, "University of Utah", "uofu_logo.svg", "Academic", "Water Systems,Sustainable Infrastructure", 
         "https://www.utah.edu", "Research institution leading initiatives in sustainable urban development, water conservation, and renewable energy integration", 
         2019, "sustainability@utah.edu", "801-581-7200")
    ]

    # Clear existing data and insert sample partners
    cursor.execute("DELETE FROM partners")
    cursor.executemany("""
    INSERT OR IGNORE INTO partners 
    (id, name, logo_path, category, focus_areas, website, description, partnership_year, contact_email, contact_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, sample_partners)

    # Sample projects data
    sample_projects = [
        (1, 1, "Desert Solar Farm Phase 1", "100MW solar installation in Henderson area", "2022-01-15", "2023-06-30", 
         "Completed", "Energy Generation", 12500000),
        # ...existing code...
    ]

    # Clear existing data and insert sample projects
    cursor.execute("DELETE FROM projects")
    cursor.executemany("""
    INSERT OR IGNORE INTO projects 
    (id, partner_id, title, description, start_date, end_date, status, impact_area, funding)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, sample_projects)

    # Sample impact metrics
    sample_metrics = [
        (1, 1, "Energy Generated", 125.7, "MWh", "2023-01-01"),
        # ...existing code...
    ]

    # Clear existing data and insert sample metrics
    cursor.execute("DELETE FROM impact_metrics")
    cursor.executemany("""
    INSERT OR IGNORE INTO impact_metrics
    (id, partner_id, metric_name, metric_value, metric_unit, report_date)
    VALUES (?, ?, ?, ?, ?, ?)
    """, sample_metrics)

    # Sample geographical impact data
    sample_geo_data = [
        (1, 1, 36.0395, -114.9817, "Solar Installation", 100, "Henderson Solar Farm"),
        # ...existing code...
    ]

    # Clear existing data and insert sample geo data
    cursor.execute("DELETE FROM geo_impact")
    cursor.executemany("""
    INSERT OR IGNORE INTO geo_impact
    (id, partner_id, latitude, longitude, impact_type, impact_value, description)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, sample_geo_data)

    conn.commit()
    conn.close()
