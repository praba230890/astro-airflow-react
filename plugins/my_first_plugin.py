from airflow.plugins_manager import AirflowPlugin
from flask import Flask, Blueprint
from flask_appbuilder import expose, BaseView as AppBuilderBaseView
from flask import jsonify, request

from airflow.models import Variable
from flask_wtf.csrf import CSRFProtect
from airflow.www.app import csrf

from flask_cors import cross_origin


# define a Flask blueprint
my_blueprint = Blueprint(
    "test_plugin",
    __name__,
    # register airflow/plugins/templates as a Jinja template folder
    template_folder="templates",
    static_folder="static",
)

# csrf = CSRFProtect()

# # Disable CSRF protection for the plugin blueprint
# csrf.exempt(my_blueprint)
# create a flask appbuilder BaseView
class MyBaseView(AppBuilderBaseView):
    default_view = "render_airflow_variables"

    # @expose("/")
    # def render_airflow_variables(self):
    #     # get the airflow variables
    #     airflow_vars = Variable.get("test_plugin", deserialize_json=True)
    #     # render the HTML file from the templates directory with the airflow variables
    #     return self.render_template("index.html", content=airflow_vars)
    # def test(self):
    #     # render the HTML file from the templates directory with content
    #     return self.render_template("index.html", content="awesome")

    @expose("/")
    @cross_origin()
    def render_airflow_variables(self):
        # get the airflow variables
        # airflow_vars = Variable.get("test_plugin", deserialize_json=True)
        # configuration_data = {
        #     variable.key: variable.val for variable in Variable.get_all()
        # }
        Variable.get("test_plugin")
        print(Variable.get("test_plugin", deserialize_json=True))
        return self.render_template("index.html", content=Variable.get("test_plugin", deserialize_json=True))
        # render the HTML file from the templates directory with the airflow variables
        return self.render_template("index.html", content=airflow_vars)

    @expose("/data", methods=['GET'])
    @cross_origin()
    @csrf.exempt
    def render_airflow_variables_one(self):
        # get the airflow variables
        # airflow_vars = Variable.get("test_plugin", deserialize_json=True)
        # configuration_data = {
        #     variable.key: variable.val for variable in Variable.get_all()
        # }
        Variable.get("test_plugin")
        print(Variable.get("test_plugin", deserialize_json=True))
        return jsonify(Variable.get("test_plugin", deserialize_json=True))
    
    @expose('/update-data', methods=['POST'])
    @cross_origin()
    @csrf.exempt
    def update_variable(self):
        data = request.get_json()
        print(data, " data da")
        # variable_key = data.get('test_plugin')
        variable_value = data.get('test_plugin')
        print(variable_value)
        if variable_value:
            Variable.set("test_plugin", variable_value, serialize_json=True)
            return jsonify({'message': 'Variable updated successfully'})
        else:
            return jsonify({'message': 'Invalid request'}), 400


# instantiate MyBaseView
my_view = MyBaseView()

# define the path to my_view in the Airflow UI
my_view_package = {
    # define the menu sub-item name
    "name": "Test View",
    # define the top-level menu item
    "category": "My Extra View",
    "view": my_view,
}

# define the plugin class
class MyViewPlugin(AirflowPlugin):
    # name the plugin
    name = "My appbuilder view"
    # add the blueprint and appbuilder_views components
    flask_blueprints=[my_blueprint]
    appbuilder_views = [my_view_package]

# @after_request
# def add_cors_headers(response):
#     response.headers['Access-Control-Allow-Origin'] = '*'
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
#     response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,OPTIONS'
#     return response