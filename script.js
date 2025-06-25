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

    // --- NOVO SISTEMA UNIFICADO DE PROVA SOCIAL (VERSÃO CORRIGIDA) ---
function initUnifiedSocialProof() {
    const commentsList = document.getElementById('comments-list');
    const notificationElement = document.getElementById('new-comment-notification');

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
    
    // LISTA 2: Nomes para as notificações de "compra" (início da jornada)
    const fakePurchasers = [
        { name: 'Patrícia Rosa' }, { name: 'Camila Vieira' }, { name: 'Sofia Rodrigues' },
        { name: 'Gabriela Moura' }, { name: 'Laura Cristina' }, { name: 'Isabela Nunes' },
        { name: 'Clara Boaventura' }, { name: 'Vanessa Tuani' }, { name: 'Daniela Almeida' },
        { name: 'Renata Porto' }, { name: 'Thais Oliveira' }, { name: 'Alice Flávia' }, { name: 'Luísa Montes' }
    ];

    let commentsToShow = [...fakeComments];
    let nextCommentIndex = 5;

    function generateRandomTimeAgo() {
        const type = Math.random() > 0.4 ? 'dias' : 'horas';
        const dias = Math.floor(Math.random() * 6) + 1;
        const horas = Math.floor(Math.random() * 23) + 1;
        return type === 'dias' ? `há ${dias} dia${dias > 1 ? 's' : ''}` : `há ${horas} hora${horas > 1 ? 's' : ''}`;
    }

    // FUNÇÃO CORRIGIDA: Aceita o parâmetro 'isNew'
    function addCommentToUI(comment, isNew = false) {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment-item';
        
        // Lógica para definir o tempo do comentário
        const timeAgo = isNew ? 'há poucos segundos' : generateRandomTimeAgo();
        
        commentDiv.innerHTML = `
            <div class="comment-avatar"><img src="/static/img/${comment.avatar}" alt="avatar"></div>
            <div class="comment-body">
                <p><strong>${comment.name}</strong> ${comment.text}</p>
                <div class="comment-actions">Curtir • Responder • ${timeAgo}</div>
            </div>`;
        
        if (isNew) {
            commentsList.prepend(commentDiv); // Adiciona no topo
        } else {
            commentsList.appendChild(commentDiv); // Adiciona no final
        }
    }

    function showNotification(message) {
        notificationElement.innerHTML = message;
        notificationElement.classList.add('show');
        setTimeout(() => notificationElement.classList.remove('show'), 8000);
    }

    // Popula os comentários iniciais (isNew é false)
    commentsToShow.slice(0, 5).forEach(c => addCommentToUI(c, false));

    function scheduleNextEvent() {
        const randomDelay = Math.random() * (55000 - 25000) + 25000;
        
        setTimeout(() => {
            if (Math.random() > 0.7 && nextCommentIndex < commentsToShow.length) {
                // MOSTRA NOVO COMENTÁRIO
                const newComment = commentsToShow[nextCommentIndex];
                // Chamada CORRIGIDA: passa 'true' para indicar que é um novo comentário
                addCommentToUI(newComment, true); 
                showNotification(`💬 <strong>${newComment.name}</strong> comentou: "<em>${newComment.text.substring(0, 80)}...</em>"`);
                nextCommentIndex++;
            } else {
                // MOSTRA NOVA COMPRA
                const randomPurchaser = fakePurchasers[Math.floor(Math.random() * fakePurchasers.length)];
                showNotification(`✨ ${randomPurchaser.name} acaba de iniciar sua Jornada de Resgate.`);
            }
            scheduleNextEvent();
        }, randomDelay);
    }
    
    setTimeout(scheduleNextEvent, 20000);
}
    
    // Inicia o ciclo de eventos após um tempo inicial maior (20 segundos)
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
