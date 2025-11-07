#!/bin/bash

# Metamorph Local Development Runner

echo "🚀 Starting Metamorph Urban Planning Platform"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Run python setup.py first."
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Start backend in background
echo "🔧 Starting Backend..."
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🔧 Starting Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

echo "✅ Services started:"
echo "   Backend: http://localhost:8000"
echo "   Frontend: http://localhost:3000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user interrupt
trap "echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait