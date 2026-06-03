# WSGI config for PythonAnywhere
# Copy the content below and replace your WSGI file content

import sys
import os

# Add your project directory to the path
path = '/home/navid190/counseling-app'
if path not in sys.path:
    sys.path.insert(0, path)

# Change to that directory
os.chdir(path)

# Import your Flask app
# If your main file is main_simple.py:
from main_simple import app as application

# Or if using the other file:
# from main_for_pythonanywhere import app as application
