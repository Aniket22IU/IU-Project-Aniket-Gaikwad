import traci
import sumolib
import xml.etree.ElementTree as ET
from typing import Dict, List

class SUMOTrafficSimulator:
    def __init__(self, sumo_binary="sumo"):
        self.sumo_binary = sumo_binary
        self.simulation_running = False
        
    def create_network_file(self, roads: List[Dict], output_file: str):
        """Create SUMO network file from road data"""
        root = ET.Element("net")
        
        # Add edges (roads)
        for road in roads:
            edge = ET.SubElement(root, "edge")
            edge.set("id", road["id"])
            edge.set("from", road["from_node"])
            edge.set("to", road["to_node"])
            
            lane = ET.SubElement(edge, "lane")
            lane.set("id", f"{road['id']}_0")
            lane.set("index", "0")
            lane.set("speed", str(road.get("speed_limit", 13.89)))
            lane.set("length", str(road["length"]))
            
        tree = ET.ElementTree(root)
        tree.write(output_file)
        
    def run_simulation(self, network_file: str, route_file: str, steps: int = 1000):
        """Run SUMO traffic simulation"""
        sumo_cmd = [
            self.sumo_binary,
            "-n", network_file,
            "-r", route_file,
            "--no-step-log"
        ]
        
        traci.start(sumo_cmd)
        self.simulation_running = True
        
        results = {
            "vehicle_count": [],
            "average_speed": [],
            "waiting_time": []
        }
        
        for step in range(steps):
            traci.simulationStep()
            
            # Collect metrics
            vehicle_ids = traci.vehicle.getIDList()
            results["vehicle_count"].append(len(vehicle_ids))
            
            if vehicle_ids:
                speeds = [traci.vehicle.getSpeed(vid) for vid in vehicle_ids]
                results["average_speed"].append(sum(speeds) / len(speeds))
                
                waiting_times = [traci.vehicle.getWaitingTime(vid) for vid in vehicle_ids]
                results["waiting_time"].append(sum(waiting_times) / len(waiting_times))
            else:
                results["average_speed"].append(0)
                results["waiting_time"].append(0)
                
        traci.close()
        self.simulation_running = False
        
        return results