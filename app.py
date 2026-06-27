from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    lang = request.args.get('lang', 'ta')
    return render_template('index.html', lang=lang)

@app.route('/api/lang/<lang>')
def set_language(lang):
    if lang in ['ta', 'en']:
        return jsonify({'status': 'ok', 'lang': lang})
    return jsonify({'status': 'error'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
