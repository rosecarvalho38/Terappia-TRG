document.addEventListener('DOMContentLoaded', () => {

    // --- FUNÇÕES DE INICIALIZAÇÃO DE CADA MÓDULO DA PÁGINA ---

    function initHeadlineAnimation() {
        const headline = document.getElementById('main-headline');
        if (headline) {
            const text = headline.textContent.trim();
            const words = text.split(' ');
            headline.innerHTML = '';
            words.forEach((word, i) => {
                const span = document.createElement('span');
                span.textContent = word;
                headline.appendChild(span);
                headline.appendChild(document.createTextNode(' '));
                span.style.transitionDelay = `${i * 0.08}s`;
            });
            setTimeout(() => headline.classList.add('is-visible'), 100);
        }
    }

    function initSymptomChecklist() {
        const sintomasCheckboxes = document.querySelectorAll('.sintoma-item input[type="checkbox"]');
        const showSolutionBtn = document.getElementById('show-solution-btn');
        const conteudoPrincipal = document.getElementById('conteudo-principal');
        if (sintomasCheckboxes.length > 0 && showSolutionBtn && conteudoPrincipal) {
            const checkCheckboxState = () => {
                const isAnyChecked = Array.from(sintomasCheckboxes).some(cb => cb.checked);
                showSolutionBtn.disabled = !isAnyChecked;
            };
            sintomasCheckboxes.forEach(checkbox => checkbox.addEventListener('change', checkCheckboxState));
            showSolutionBtn.addEventListener('click', () => {
                if (!showSolutionBtn.disabled) {
                    conteudoPrincipal.classList.add('is-visible');
                    const solucaoSection = document.getElementById('solucao');
                    if (solucaoSection) {
                        setTimeout(() => {
                            solucaoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                    }
                }
            });
        }
    }

    // --- NOVO SISTEMA UNIFICADO DE PROVA SOCIAL ---
    function initUnifiedSocialProof() {
        const commentsList = document.getElementById('comments-list');
        const notificationElement = document.getElementById('new-comment-notification');
        const planos = document.querySelectorAll('.plano-card');
        
        // Só roda se os elementos principais existirem
        if (!commentsList || !notificationElement || planos.length === 0) return;

        const fakeComments = [
            { name: 'Juliana Pinho', avatar: 'avatar1.jpg', text: 'Gente, sério. Minha enxaqueca era diária. Na segunda sessão com a Rose, eu entendi a CAUSA da dor. Hoje faz um mês que não sei o que é tomar um remédio. Parece mágica.' },
            { name: 'Amanda Guedes', avatar: 'avatar2.jpg', text: 'Eu era a pessoa mais cética com terapia online. Paguei pra ver e quebrei a cara (graças a Deus!). O acolhimento e a profundidade que a Rose alcança pela tela é algo surreal.' },
            { name: 'Letícia Bueloni', avatar: 'avatar3.jpg', text: 'A síndrome da \'mulher boazinha\'... isso me consumia. A TRG com a Rose me DEVOLVEU a minha voz. Hoje, minha paz não é negociável.' },
            { name: 'Carla Santos', avatar: 'avatar4.jpg', text: 'Pra quem sofre com ansiedade, aquela que aperta o peito... só digo uma coisa: comecem. Hoje eu consigo respirar fundo de novo.' },
            { name: 'Mariana Franco', avatar: 'avatar5.jpg', text: 'O mais surreal é que a gente não fica repassando o trauma. A Rose te guia pra olhar pra dor de um lugar seguro. É libertador.' },
            { name: 'Fernanda Lívia', avatar: 'avatar6.jpg', text: 'Esse investimento em mim mesma foi o mais barato e o mais transformador de todos. Só vai.' },
            { name: 'Beatriz Macedo', avatar: 'avatar7.jpg', text: 'Aquele peso nos ombros que a gente acha que é \'normal\'? Spoiler: NÃO É. A TRG com a Rose tirou esse piano das minhas costas.' },
            { name: 'Patrícia Rosa', avatar: 'avatar8.jpg', text: 'Minha ansiedade não era só preocupação, era terror noturno. Já na primeira sessão, a Rose me deu uma ferramenta que me fez dormir a noite inteira.' },
            { name: 'Camila Vieira', avatar: 'avatar9.jpg', text: 'Minha procrastinação era só ansiedade disfarçada. Depois que reprocessamos a raiz do medo, minha vida profissional destravou.' },
            { name: 'Sofia Rodrigues', avatar: 'avatar10.jpg', text: 'Recomendo de olhos fechados. Uma profissional que não te julga, te ouve e te guia com uma segurança absurda.' },
            { name: 'Gabriela Moura', avatar: 'avatar11.jpg', text: 'O \'clique\' pra mim foi entender que minha irritabilidade vinha de um medo da infância. Mudou o jogo pra mim e pro meu relacionamento.' },
            { name: 'Laura Cristina', avatar: 'avatar12.jpg', text: 'Finalmente parei de me sentir culpada por querer um tempo pra mim. Antes eu achava que era egoísmo. Hoje eu entendo que é sobrevivência.' },
            { name: 'Isabela Nunes', avatar: 'avatar13.jpg', text: 'A gastrite nervosa... Eu achava que era o que eu comia. Mal sabia eu que era o que eu \'engolia\' e não dizia. Meu estômago parece outro.' },
            { name: 'Clara Boaventura', avatar: 'avatar14.jpg', text: 'Ver que a gente não tá sozinha nessa já é metade da cura. Ler os relatos aqui e fazer a terapia foi um alívio tão grande.' },
            { name: 'Vanessa Tuani', avatar: 'avatar15.jpg', text: 'Se você é mãe e se sente engolida pela culpa, faça isso por você. Me tornei uma mãe muito mais presente e paciente.' },
            { name: 'Daniela Almeida', avatar: 'avatar16.jpg', text: 'É como fazer uma faxina na alma. No final, a sensação de paz e de espaço interno que se abre é indescritível.' },
            { name: 'Renata Porto', avatar: 'avatar17.jpg', text: 'Eu tinha muito medo de \'mexer\' em coisas do passado. A Rose foi tão cuidadosa, tão respeitosa... a cura aconteceu de forma natural.' },
            { name: 'Thais Oliveira', avatar: 'avatar18.jpg', text: 'Meu foco no trabalho melhorou 200%. Aquela névoa mental sumiu. Minha energia não era mais gasta pra conter a ansiedade.' },
            { name: 'Alice Flávia', avatar: 'avatar19.jpg', text: 'Simples assim: a melhor decisão que eu tomei no último ano. Ponto.' },
            { name: 'Luísa Montes', avatar: 'avatar20.jpg', text: 'Se você tá lendo isso, no fundo você já sabe que precisa de ajuda. O medo paralisa, eu sei. Mas a dor de continuar como está é muito maior. Dê o primeiro passo.' }
        ];

        let commentsToShow = [...fakeComments];
        let nextCommentIndex = 5;

        function generateRandomTimeAgo() {
            const type = Math.random() > 0.4 ? 'dias' : 'horas';
            const dias = Math.floor(Math.random() * 6) + 1;
            const horas = Math.floor(Math.random() * 23) + 1;
            return type === 'dias' ? `há ${dias} dia${dias > 1 ? 's' : ''}` : `há ${horas} hora${horas > 1 ? 's' : ''}`;
        }

        function addCommentToUI(comment) {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';
            commentDiv.innerHTML = `
                <div class="comment-avatar"><img src="/static/img/${comment.avatar}" alt="avatar"></div>
                <div class="comment-body">
                    <p><strong>${comment.name}</strong> ${comment.text}</p>
                    <div class="comment-actions">Curtir • Responder • ${generateRandomTimeAgo()}</div>
                </div>`;
            commentsList.prepend(commentDiv);
        }

        function showGenericNotification(message) {
            notificationElement.innerHTML = message;
            notificationElement.classList.add('show');
            setTimeout(() => notificationElement.classList.remove('show'), 6000);
        }

        // Popula os comentários iniciais
        commentsToShow.slice(0, 5).forEach(c => addCommentToUI(c));

        function scheduleNextEvent() {
            const randomDelay = Math.random() * (35000 - 15000) + 15000;
            setTimeout(() => {
                // Decide aleatoriamente se mostra um novo comentário ou uma nova compra
                if (Math.random() > 0.5 && nextCommentIndex < commentsToShow.length) {
                    // MOSTRA NOVO COMENTÁRIO
                    const newComment = commentsToShow[nextCommentIndex];
                    addCommentToUI(newComment);
                    showGenericNotification(`💬 ${newComment.name} acabou de deixar um novo comentário`);
                    nextCommentIndex++;
                } else {
                    // MOSTRA NOVA COMPRA
                    const randomName = fakeComments[Math.floor(Math.random() * fakeComments.length)].name;
                    showGenericNotification(`✨ ${randomName} acaba de iniciar sua Jornada de Resgate.`);
                    // Aqui, a lógica de decrementar vagas pode ser re-adicionada se desejado
                }
                scheduleNextEvent(); // Agenda o próximo evento
            }, randomDelay);
        }
        
        // Inicia o ciclo de eventos
        setTimeout(scheduleNextEvent, 12000);
    }

    /**
 * Função da Seleção de Planos de Terapia (VERSÃO COM PREÇO OTIMIZADO)
 */
function initPlanSelection() {
    const planos = document.querySelectorAll('.plano-card');
    const offerBox = document.getElementById('offer-box');
    const offerDetails = document.getElementById('offer-details');

    if (planos.length > 0 && offerBox) {
        // Objeto de dados com preço detalhado
        const planosInfo = {
            plus: { 
                nome: 'PLANO PLUS', 
                valorVista: 'R$ 480,00', 
                parcelas: '5x de', 
                valorParcela: 'R$ 96,00', 
                vagasTotal: 4, 
                vagasDisponiveis: 3, 
                linkCompra: '#' 
            },
            premium: { 
                nome: 'PLANO PREMIUM', 
                valorVista: 'R$ 840,00', 
                parcelas: '8x de', 
                valorParcela: 'R$ 105,00', 
                vagasTotal: 4, 
                vagasDisponiveis: 2, 
                linkCompra: '#' 
            },
            master: { 
                nome: 'PLANO MASTER', 
                valorVista: 'R$ 1.200,00', 
                parcelas: '12x de', 
                valorParcela: 'R$ 100,00', 
                vagasTotal: 2, 
                vagasDisponiveis: 1, 
                linkCompra: '#' 
            }
        };
        
        planos.forEach(plano => {
            plano.addEventListener('click', () => {
                planos.forEach(p => p.classList.remove('selected'));
                plano.classList.add('selected');
                const planoSelecionado = plano.dataset.plano;
                const info = planosInfo[planoSelecionado];
                const vagasPreenchidas = info.vagasTotal - info.vagasDisponiveis;
                const percentualPreenchido = (vagasPreenchidas / info.vagasTotal) * 100;

                // Nova estrutura HTML para o preço
                offerDetails.innerHTML = `
                    <p class="plano-selecionado">${info.nome}</p>
                    <div class="price-section-rose">
                        <p class="price-prefix">Faça sua jornada acontecer por apenas:</p>
                        <div class="price-main">
                            <span class="price-installments">${info.parcelas}</span>
                            <span class="price-value">${info.valorParcela}</span>
                        </div>
                        <p class="price-descriptor">ou ${info.valorVista} à vista</p>
                    </div>
                    <div class="plano-disponibilidade">
                        URGENTE: Restam apenas ${info.vagasDisponiveis} de ${info.vagasTotal} vagas para este plano.
                        <div class="progress-bar"><div class="progress-bar-inner" style="width: ${percentualPreenchido}%"></div></div>
                    </div>
                    <a href="${info.linkCompra}" class="cta-button">GARANTIR MINHA VAGA NO ${info.nome.replace('PLANO ','')}</a>
                `;
                
                offerBox.classList.remove('offer-box-hidden');
                offerBox.classList.add('offer-box-visible');
                offerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }
}
    /**
     * Função do Acordeão (FAQ)
     */
    function initFaqAccordion() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        if (accordionHeaders.length > 0) {
            accordionHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    const content = header.nextElementSibling;
                    header.classList.toggle('active');
                    content.style.maxHeight = header.classList.contains('active') ? content.scrollHeight + 'px' : null;
                });
            });
        }
    }

    /**
     * Função Geral para Animações de Entrada ao Rolar
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.anim-on-scroll');
        if (animatedElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            animatedElements.forEach(element => observer.observe(element));
        }
    }

    // --- EXECUTA TODAS AS FUNÇÕES DE INICIALIZAÇÃO ---
    initHeadlineAnimation();
    initSymptomChecklist();
    initUnifiedSocialProof();
    initPlanSelection();
    initFaqAccordion();
    initScrollAnimations();
});
