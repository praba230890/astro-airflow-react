FROM quay.io/astronomer/astro-runtime:7.2.0

# Install flask_wtf package
RUN pip install flask_wtf 
RUN pip install flask_cors