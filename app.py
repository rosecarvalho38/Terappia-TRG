from flask import Flask, render_template

# Inicializa a aplicação Flask
app = Flask(__name__)

@app.route('/')
def home():
    """
    Renderiza a página principal (index.html).
    Passa um título e uma descrição para SEO.
    """
    page_title = "Rose Carvalho - Terapeuta Integrativa"
    page_description = "Encontre leveza emocional e transforme sua vida com a terapia integrativa de Rose Carvalho. Abordagem única para resultados duradouros."
    return render_template('index.html', title=page_title, description=page_description)

if __name__ == '__main__':
    # Roda a aplicação em modo de desenvolvimento
    app.run(debug=True)