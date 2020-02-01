from flask import Blueprint, jsonify, request, make_response, current_app as app


api_bp = Blueprint('api_bp', __name__)


@api_bp.route('/api/v1/school')
def school():
    return "SCHOOL"

