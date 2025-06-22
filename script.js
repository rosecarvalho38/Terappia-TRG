// static/js/script.js (VERSÃO FINAL COM TODAS AS NOTIFICAÇÕES)More actions

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
        
        if (!commentsList || !notificationElement) return;

        // LISTA 1: Para a caixa de comentários (com texto completo)
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
            { name: 'Sofia Rodrigues', avatar: 'avatar10.jpg', text: 'Recomendo de olhos fechados. Uma profissional que não te julga, te ouve e te guia com uma segurança absurda.' }
        ];

        // LISTA 2: Apenas nomes para as notificações de compra
        const fakePurchasers = [
            { name: 'Gabriela M.'}, { name: 'Laura C.'}, { name: 'Isabela N.'},
            { name: 'Clara B.'}, { name: 'Vanessa T.'}, { name: 'Daniela A.'},
            { name: 'Renata P.'}, { name: 'Thais O.'}, { name: 'Alice F.'},
            { name: 'Luísa M.'}
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
                <div class="comment-avatar"><img src="img/${comment.avatar}" alt="avatar"></div>
                <div class="comment-body">
                    <p><strong>${comment.name}</strong> ${comment.text}</p>
                    <div class="comment-actions">Curtir • Responder • ${generateRandomTimeAgo()}</div>
                </div>`;
            commentsList.prepend(commentDiv);
        }

        function showGenericNotification(message) {
            notificationElement.innerHTML = message;
            notificationElement.classList.add('show');
            setTimeout(() => notificationElement.classList.remove('show'), 8000); // Mais tempo para ler
        }

        // Popula os comentários iniciais na caixa de prova social
        commentsToShow.slice(0, 5).forEach(c => addCommentToUI(c));

        function scheduleNextEvent() {
            // Frequência reduzida: entre 25 e 55 segundos
            const randomDelay = Math.random() * (55000 - 25000) + 25000; 
            setTimeout(() => {
                // Decide aleatoriamente se mostra um novo comentário ou uma nova compra
                if (Math.random() > 0.6 && nextCommentIndex < commentsToShow.length) {
                    // MOSTRA NOVO COMENTÁRIO (40% de chance)
                    const newComment = commentsToShow[nextCommentIndex];
                    addCommentToUI(newComment); // Adiciona na caixa de comentários
                    // Formata a notificação para incluir o texto do comentário
                    showGenericNotification(`💬 <strong>${newComment.name}</strong> comentou: "${newComment.text}"`);
                    nextCommentIndex++;
                } else {
                    // MOSTRA NOVA COMPRA (60% de chance)
                    const randomPurchaser = fakePurchasers[Math.floor(Math.random() * fakePurchasers.length)];
                    showGenericNotification(`✨ ${randomPurchaser.name} acaba de iniciar sua Jornada de Resgate.`);
                }
                scheduleNextEvent(); // Agenda o próximo evento
            }, randomDelay);
        }
        
        // Inicia o ciclo de eventos
        setTimeout(scheduleNextEvent, 20000); // Começa após 20 segundos
    }

        // Inicia o ciclo de eventos
        setTimeout(scheduleNextEvent, 12000);
        setTimeout(scheduleNextEvent, 20000);
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
