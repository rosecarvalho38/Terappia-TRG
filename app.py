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

# ROTA DA PÁGINA DE OBRIGADO (AGORA COM LÓGICA)
@app.route('/obrigado')
def thank_you_page():
    # Pega os dados da URL (ex: /obrigado?name=Maria&product=Plano%20Premium)
    # Se não encontrar os dados, usa um valor padrão.
    customer_name = request.args.get('name', 'querida cliente')
    plan_name = request.args.get('product', 'seu plano')
    
    # Passa as variáveis para o template HTML
    return render_template('obrigado.html', customer_name=customer_name, plan_name=plan_name)

if __name__ == '__main__':
    # Roda a aplicação em modo de desenvolvimento
    app.run(debug=True)
