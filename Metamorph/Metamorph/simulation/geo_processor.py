import geopandas as gpd
import pandas as pd
from shapely.geometry import Point, Polygon, LineString
import rasterio
import numpy as np

class GeoDataProcessor:
    def __init__(self):
        self.crs = "EPSG:4326"  # WGS84
        
    def create_city_grid(self, bounds, grid_size=100):
        """Create a grid for city planning"""
        minx, miny, maxx, maxy = bounds
        
        # Create grid points
        x_coords = np.arange(minx, maxx, grid_size)
        y_coords = np.arange(miny, maxy, grid_size)
        
        polygons = []
        for i, x in enumerate(x_coords[:-1]):
            for j, y in enumerate(y_coords[:-1]):
                polygon = Polygon([
                    (x, y),
                    (x + grid_size, y),
                    (x + grid_size, y + grid_size),
                    (x, y + grid_size)
                ])
                polygons.append({
                    'geometry': polygon,
                    'grid_id': f"{i}_{j}",
                    'x_index': i,
                    'y_index': j
                })
        
        return gpd.GeoDataFrame(polygons, crs=self.crs)
    
    def load_population_data(self, raster_path):
        """Load population density from raster file"""
        with rasterio.open(raster_path) as src:
            population_data = src.read(1)
            transform = src.transform
            
        return population_data, transform
    
    def calculate_accessibility(self, buildings_gdf, roads_gdf):
        """Calculate accessibility metrics for buildings"""
        accessibility_scores = []
        
        for idx, building in buildings_gdf.iterrows():
            # Find nearest road
            distances = roads_gdf.geometry.distance(building.geometry)
            min_distance = distances.min()
            
            # Simple accessibility score (inverse of distance)
            score = 1 / (min_distance + 1)  # +1 to avoid division by zero
            accessibility_scores.append(score)
            
        buildings_gdf['accessibility'] = accessibility_scores
        return buildings_gdf
    
    def optimize_land_use(self, grid_gdf, population_density, constraints):
        """Optimize land use allocation using spatial analysis"""
        # This is a simplified optimization
        # Real implementation would use more sophisticated algorithms
        
        for idx, cell in grid_gdf.iterrows():
            pop_density = population_density[cell.x_index, cell.y_index]
            
            if pop_density > constraints.get('high_density_threshold', 1000):
                grid_gdf.loc[idx, 'land_use'] = 'residential_high'
            elif pop_density > constraints.get('medium_density_threshold', 500):
                grid_gdf.loc[idx, 'land_use'] = 'residential_medium'
            else:
                grid_gdf.loc[idx, 'land_use'] = 'green_space'
                
        return grid_gdf