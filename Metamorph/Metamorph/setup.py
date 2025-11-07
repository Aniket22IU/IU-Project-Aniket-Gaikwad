#!/usr/bin/env python3
"""
Setup script for Metamorph Urban Planning Platform
"""

import subprocess
import sys
import os

def run_command(command, cwd=None):
    """Run shell command"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, check=True, 
                              capture_output=True, text=True)
        print(f"✓ {command}")
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"✗ {command}")
        print(f"Error: {e.stderr}")
        return None

def setup_backend():
    """Setup Python backend"""
    print("\n🔧 Setting up Backend...")
    
    # Create virtual environment
    run_command("python3 -m venv venv")
    
    # Install requirements
    if os.name == 'nt':  # Windows
        pip_path = "venv\\Scripts\\pip"
    else:  # Unix/Linux/macOS
        pip_path = "venv/bin/pip"
    
    run_command(f"{pip_path} install -r backend/requirements.txt")

def setup_frontend():
    """Setup React frontend"""
    print("\n🔧 Setting up Frontend...")
    
    # Install npm dependencies
    run_command("npm install", cwd="frontend")

def main():
    print("🚀 Setting up Metamorph Urban Planning Platform")
    
    setup_backend()
    setup_frontend()
    
    print("\n✅ Setup complete!")
    print("\n📋 Next steps:")
    print("1. Start PostgreSQL database")
    print("2. Copy .env.example to .env and configure")
    print("3. Run: source venv/bin/activate && cd backend && uvicorn main:app --reload")
    print("4. In new terminal: cd frontend && npm start")

if __name__ == "__main__":
    main()