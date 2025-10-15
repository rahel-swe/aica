from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'service': 'AI Service'})

@app.route('/recommend', methods=['POST'])
def get_recommendations():
    try:
        user_data = request.json
        # TODO: Implement AI recommendation logic
        return jsonify({
            'success': True,
            'message': 'Recommendation endpoint',
            'user_data_received': user_data
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    port = int(os.environ.get('FLASK_PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
