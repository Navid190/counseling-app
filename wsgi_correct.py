import sys
import os

# مسیر پروژه
path = '/home/navid190/counseling-app'
if path not in sys.path:
    sys.path.insert(0, path)

os.chdir(path)

# از این فایل استفاده کنید که financial-app را سرو میکنه
from main_for_pythonanywhere import app as application
