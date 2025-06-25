document.addEventListener('DOMContentLoaded', () => {

    // Objeto central que guarda o estado das vagas.
    // É declarado aqui no topo para ser acessível por múltiplas funções.
    /**
 * Função da Seleção de Planos de Terapia
 */
function initPlanSelection() {
    const planos = document.querySelectorAll('.plano-card');
    const offerBox = document.getElementById('offer-box');
    const offerDetails = document.getElementById('offer-details');

    if (planos.length > 0 && offerBox) {
        // ... (o objeto planosInfo continua o mesmo)
        const planosInfo = {
            plus: { nome: 'PLANO PLUS', valorVista: 'R$ 480,00', parcelas: '5x de', valorParcela: 'R$ 96,00', vagasTotal: 4, vagasDisponiveis: 3, linkCompra: '#' },
            premium: { nome: 'PLANO PREMIUM', valorVista: 'R$ 840,00', parcelas: '8x de', valorParcela: 'R$ 105,00', vagasTotal: 4, vagasDisponiveis: 2, linkCompra: '#' },
            master: { nome: 'PLANO MASTER', valorVista: 'R$ 1.200,00', parcelas: '12x de', valorParcela: 'R$ 100,00', vagasTotal: 2, vagasDisponiveis: 1, linkCompra: '#' }
        };

        planos.forEach(plano => {
            plano.addEventListener('click', () => {
                planos.forEach(p => p.classList.remove('selected'));
                plano.classList.add('selected');
                const planoSelecionado = plano.dataset.plano;
                const info = planosInfo[planoSelecionado];
                const vagasPreenchidas = info.vagasTotal - info.vagasDisponiveis;
                const percentualPreenchido = (vagasPreenchidas / info.vagasTotal) * 100;

                offerDetails.innerHTML = `
                    <div class="price-section-rose">
                        <p class="plano-selecionado">${info.nome}</p>
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
                    <a href="${info.linkCompra}" class="cta-button">GARANTIR MINHA VAGA NO ${info.nome.replace('PLANO ','')}</a>`;
                
                offerBox.classList.remove('offer-box-hidden');
                offerBox.classList.add('offer-box-visible');

                // COMANDO DE ROLAGEM DENTRO DO SETTIMEOUT
                setTimeout(() => {
                    offerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100); 
            });
        });
    }
}

    /**
     * Função de Animação da Headline Principal
     */
    function initHeadlineAnimation() {
        const headline = document.getElementById('main-headline');
        if (headline) {
            const text = headline.textContent.trim();
            const words = text.split(' ');
            headline.innerHTML = '';
            words.forEach((word) => {
                const span = document.createElement('span');
                span.textContent = word;
                headline.appendChild(span);
                headline.appendChild(document.createTextNode(' '));
            });
            setTimeout(() => {
                headline.classList.add('is-visible');
            }, 100);
        }
    }

    /**
     * Função do Checklist de Sintomas
     */
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

    /**
 * Função de Prova Social Híbrida (Comentários e Compras Sincronizadas)
 * VERSÃO FINAL CORRIGIDA
 */
function initSocialProof() {
    const commentsList = document.getElementById('comments-list');
    const notificationElement = document.getElementById('new-comment-notification');

    // Só roda se os elementos principais existirem
    if (!commentsList || !notificationElement) return;

    // LISTA 1: Para a caixa de comentários (com texto completo)
    const fakeComments = [
        { name: 'Juliana Pinho', avatar: 'avatar1.jpg', text: 'Gente, sério. Minha enxaqueca era diária. Na segunda sessão com a Rose, eu entendi a CAUSA da dor. Hoje faz um mês que não sei o que é tomar um remédio. Parece mágica.' },
        { name: 'Amanda Guedes', avatar: 'avatar2.jpg', text: 'Eu era a pessoa mais cética com terapia online. Paguei pra ver e quebrei a cara (graças a Deus!). O acolhimento e a profundidade que a Rose alcança pela tela é algo que eu nunca tive no presencial. Não troco por nada.' },
        { name: 'Letícia Bueloni', avatar: 'avatar3.jpg', text: 'A síndrome da \'mulher boazinha\'... isso me consumia. A TRG com a Rose me DEVOLVEU a minha voz. Hoje, minha paz não é negociável. Obrigada.' },
        { name: 'Carla Santos', avatar: 'avatar4.jpg', text: 'Pra quem sofre com ansiedade de verdade, aquela que aperta o peito e dá vontade de sumir... só digo uma coisa: comecem. Eu tava no fundo do poço há 3 semanas. Hoje eu consigo respirar fundo de novo.' },
        { name: 'Mariana Franco', avatar: 'avatar5.jpg', text: 'O mais surreal é que a gente não fica repassando o trauma mil vezes. É diferente de tudo. A Rose te guia pra olhar pra dor de um lugar seguro, sem sofrimento. E de repente, aquilo que te assombrava vira só uma lembrança distante. É libertador.' },
        { name: 'Fernanda Lívia', avatar: 'avatar6.jpg', text: 'Esse investimento em mim mesma foi o mais barato e o mais transformador de todos. Só vai.' },
        { name: 'Beatriz Macedo', avatar: 'avatar7.jpg', text: 'Aquele peso nos ombros que a gente acha que é \'normal\' da vida adulta? Spoiler: NÃO É. Era culpa, era medo, era um monte de coisa que eu nem sabia que carregava. A TRG com a Rose tirou esse piano das minhas costas.' }
    ];
    
    // LISTA 2: Nomes dedicados para as notificações de compra
    const fakePurchasers = [
        { name: 'Patrícia R.'}, { name: 'Camila V.'}, { name: 'Sofia R.'},
        { name: 'Gabriela M.'}, { name: 'Laura C.'}, { name: 'Isabela N.'},
        { name: 'Clara B.'}, { name: 'Vanessa T.'}, { name: 'Daniela A.'},
        { name: 'Renata P.'}, { name: 'Thais O.'}, { name: 'Alice F.'}, { name: 'Luísa M.'}
    ];

    let nextCommentIndex = 5;

    function generateRandomTimeAgo() {
        const type = Math.random() > 0.4 ? 'dias' : 'horas';
        const dias = Math.floor(Math.random() * 6) + 1;
        const horas = Math.floor(Math.random() * 23) + 1;
        return type === 'dias' ? `há ${dias} dia${dias > 1 ? 's' : ''}` : `há ${horas} hora${horas > 1 ? 's' : ''}`;
    }

    function addCommentToUI(comment, isNew = false) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        const timeAgo = isNew ? 'há poucos segundos' : generateRandomTimeAgo();
        commentDiv.innerHTML = `
            <div class="comment-avatar"><img src="img/${comment.avatar}" alt="avatar"></div>
            <div class="comment-body">
                <p><strong>${comment.name}</strong> ${comment.text}</p>
                <div class="comment-actions">Curtir • Responder • ${timeAgo}</div>
            </div>`;
        if (isNew) commentsList.prepend(commentDiv);
        else commentsList.appendChild(commentDiv);
    }

    function showNotification(message) {
        notificationElement.innerHTML = message;
        notificationElement.classList.add('show');
        setTimeout(() => notificationElement.classList.remove('show'), 8000);
    }
    
    const initialComments = fakeComments.slice(0, 5);
    initialComments.forEach(c => addCommentToUI(c, false));

    function scheduleNextEvent() {
        const randomDelay = Math.random() * (55000 - 25000) + 25000;
        
        setTimeout(() => {
            const eventType = Math.random();
            if (eventType > 0.65 && nextCommentIndex < fakeComments.length) {
                // MOSTRA NOVO COMENTÁRIO (35% de chance)
                const newComment = fakeComments[nextCommentIndex];
                addCommentToUI(newComment, true);
                showNotification(`💬 <strong>${newComment.name}</strong> comentou: "<em>${newComment.text.substring(0, 80)}...</em>"`);
                nextCommentIndex++;
            } else {
                // MOSTRA NOVA COMPRA (65% de chance)
                const planosDisponiveis = Object.keys(planosInfo).filter(p => planosInfo[p].vagasDisponiveis > 0);
                if (planosDisponiveis.length > 0) {
                    const planoCompradoId = planosDisponiveis[Math.floor(Math.random() * planosDisponiveis.length)];
                    
                    // Decrementa a vaga do plano escolhido
                    planosInfo[planoCompradoId].vagasDisponiveis--;

                    // Pega um nome da lista de COMPRADORAS
                    const comprador = fakePurchasers[Math.floor(Math.random() * fakePurchasers.length)];
                    
                    // Mostra a notificação específica da compra
                    showNotification(`✨ ${comprador.name} garantiu uma das últimas vagas no <strong>${planosInfo[planoCompradoId].nome}</strong>!`);

                    // Verifica se o card do plano "comprado" está selecionado na tela
                    const planoSelecionadoCard = document.querySelector('.plano-card.selected');
                    if (planoSelecionadoCard && planoSelecionadoCard.dataset.plano === planoCompradoId) {
                        // Se estiver, atualiza a UI em tempo real!
                        updateOfferBoxUI(planoCompradoId);
                    }
                }
            }
            scheduleNextEvent();
        }, randomDelay);
    }
    setTimeout(scheduleNextEvent, 20000);
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
    initSocialProofAndPurchaseNotifications();
    initPlanSelection();
    initFaqAccordion();
    initScrollAnimations();
});
