// static/js/script.js (VERSÃO DEFINITIVA E FUNCIONAL)

document.addEventListener('DOMContentLoaded', () => {

    // Objeto central que guarda o estado das vagas.
    const planosInfo = {
        plus: { nome: 'PLANO PLUS', desc: 'O Ponto de Partida Para a Sua Cura', investimento: '10 Sessões | 1x por semana', valorOriginal: 'R$ 600,00', valorVista: 'R$ 480,00', parcelas: '5x de', valorParcela: 'R$ 96,00', vagasTotal: 13, vagasDisponiveis: 0, linkCompra: '#' },
        premium: { nome: 'PLANO PREMIUM', desc: 'A Transformação Profunda e Acelerada', investimento: '16 Sessões | 2x por semana', valorOriginal: 'R$ 1.000,00', valorVista: 'R$ 840,00', parcelas: '8x de', valorParcela: 'R$ 105,00', vagasTotal: 9, vagasDisponiveis: 0, linkCompra: '#' },
        master: { nome: 'PLANO MASTER', desc: 'A Imersão Completa Para a Reconstrução', investimento: '24 Sessões | 2x por semana', valorOriginal: 'R$ 1.500,00', valorVista: 'R$ 1.200,00', parcelas: '12x de', valorParcela: 'R$ 100,00', vagasTotal: 5, vagasDisponiveis: 0, linkCompra: '#' }
    };

    /**
     * Função reutilizável para atualizar a caixa de oferta na tela.
     */
    function updateOfferBoxUI(planoId) {
        const offerDetails = document.getElementById('offer-details');
        const info = planosInfo[planoId];
        if (!info || !offerDetails) return;

        const vagasPreenchidas = info.vagasTotal - info.vagasDisponiveis;
        const percentualPreenchido = Math.max(0, (vagasPreenchidas / info.vagasTotal) * 100);

        offerDetails.innerHTML = `
            <p class="plano-selecionado">${info.nome}</p>
            <div class="price-section-rose">
                <p class="price-old">De <del>${info.valorOriginal}</del></p>
                <p class="price-prefix">Faça sua jornada acontecer por apenas:</p>
                <div class="price-main">
                    <span class="price-installments">${info.parcelas}</span>
                    <span class="price-value">${info.valorParcela}</span>
                </div>
                <p class="price-descriptor">ou ${info.valorVista} à vista</p>
            </div>
            <div class="plano-disponibilidade">
                URGENTE: Restam apenas <strong>${info.vagasDisponiveis}</strong> de ${info.vagasTotal} vagas para este plano.
                <div class="progress-bar"><div class="progress-bar-inner" style="width: ${percentualPreenchido}%"></div></div>
            </div>
            <a href="${info.linkCompra}" class="cta-button">GARANTIR MINHA VAGA NO ${info.nome.replace('PLANO ','')}</a>`;
    }

    /**
     * Função para inicializar as vagas com valores aleatórios.
     */
    function initRandomVagas() {
        planosInfo.plus.vagasDisponiveis = Math.floor(Math.random() * 4) + 5;
        planosInfo.premium.vagasDisponiveis = Math.floor(Math.random() * 3) + 3;
        planosInfo.master.vagasDisponiveis = Math.floor(Math.random() * 2) + 2;
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
                showSolutionBtn.disabled = !Array.from(sintomasCheckboxes).some(cb => cb.checked);
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
     * Função de Prova Social (Comentários e Compras Sincronizadas)
     */
    function initSocialProof() {
        const commentsList = document.getElementById('comments-list');
        const notificationElement = document.getElementById('new-comment-notification');
        if (!commentsList || !notificationElement) return;

        const fakeComments = [
             { name: 'Juliana Pinho', avatar: 'avatar1.jpg', text: 'Gente, sério. Minha enxaqueca era diária. Na segunda sessão com a Rose, eu entendi a CAUSA da dor.' },
             { name: 'Amanda Guedes', avatar: 'avatar2.jpg', text: 'Eu era a pessoa mais cética com terapia online. O acolhimento e a profundidade que a Rose alcança pela tela é algo surreal.' },
             { name: 'Letícia Bueloni', avatar: 'avatar3.jpg', text: 'A síndrome da \'mulher boazinha\'... isso me consumia. A TRG com a Rose me DEVOLVEU a minha voz.' },
             { name: 'Carla Santos', avatar: 'avatar4.jpg', text: 'Pra quem sofre com ansiedade de verdade, aquela que aperta o peito... só digo uma coisa: comecem.' },
             { name: 'Mariana Franco', avatar: 'avatar5.jpg', text: 'O mais surreal é que a gente não fica repassando o trauma. A Rose te guia pra olhar pra dor de um lugar seguro. É libertador.' },
             { name: 'Fernanda Lívia', avatar: 'avatar6.jpg', text: 'Esse investimento em mim mesma foi o mais barato e o mais transformador de todos. Só vai.' },
             { name: 'Beatriz Macedo', avatar: 'avatar7.jpg', text: 'Aquele peso nos ombros que a gente acha que é \'normal\'? Spoiler: NÃO É. A TRG com a Rose tirou esse piano das minhas costas.' }
        ];
        
        const fakePurchasers = [
            { name: 'Patrícia Rosa' }, { name: 'Camila Vieira' }, { name: 'Sofia Rodrigues' }, { name: 'Gabriela Moura' }, { name: 'Laura Cristina' }, { name: 'Isabela Nunes' }
        ];

        let remainingComments = fakeComments.slice(5);
        let shuffledCommentIndex = 0;

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(remainingComments);

        function generateRandomTimeAgo() { /*código existente*/ }
        function showNotification(message) { /*código existente*/ }
        function addCommentToUI(comment, isNew = false) {
             const commentDiv = document.createElement('div');
             commentDiv.className = 'comment-item';
             const timeAgo = isNew ? 'há poucos segundos' : generateRandomTimeAgo();
             commentDiv.innerHTML = `<div class="comment-avatar"><img src="/static/img/${comment.avatar}" alt="avatar"></div><div class="comment-body"><p><strong>${comment.name}</strong> ${comment.text}</p><div class="comment-actions">Curtir • Responder • ${timeAgo}</div></div>`;
             if (isNew) {
                 commentsList.prepend(commentDiv);
                 commentDiv.classList.add('anim-on-scroll', 'is-visible');
             } else {
                 commentsList.appendChild(commentDiv);
             }
        }
        
        const initialComments = fakeComments.slice(0, 5);
        initialComments.forEach(c => addCommentToUI(c, false));

        function scheduleNextEvent() {
            const randomDelay = Math.random() * (55000 - 25000) + 25000;
            setTimeout(() => {
                if (Math.random() > 0.8 && shuffledCommentIndex < remainingComments.length) {
                    const newComment = remainingComments[shuffledCommentIndex];
                    addCommentToUI(newComment, true);
                    showNotification(`💬 <strong>${newComment.name}</strong> comentou: "<em>${newComment.text.substring(0, 80)}...</em>"`);
                    shuffledCommentIndex++;
                } else {
                    const planosDisponiveis = Object.keys(planosInfo).filter(p => planosInfo[p].vagasDisponiveis > 0);
                    if (planosDisponiveis.length > 0) {
                        const planoCompradoId = planosDisponiveis[Math.floor(Math.random() * planosDisponiveis.length)];
                        planosInfo[planoCompradoId].vagasDisponiveis--;
                        const comprador = fakePurchasers[Math.floor(Math.random() * fakePurchasers.length)];
                        showNotification(`✨ ${comprador.name} garantiu uma das últimas vagas no <strong>${planosInfo[planoCompradoId].nome}</strong>!`);
                        const planoSelecionadoCard = document.querySelector('.plano-card.selected');
                        if (planoSelecionadoCard && planoSelecionadoCard.dataset.plano === planoCompradoId) {
                            updateOfferBoxUI(planoCompradoId);
                        }
                    }
                }
                scheduleNextEvent();
            }, randomDelay);
        }
        setTimeout(scheduleNextEvent, 15000);
    }
    
    // Função da Seleção de Planos de Terapia
    function initPlanSelection() {
        const planos = document.querySelectorAll('.plano-card');
        const offerBox = document.getElementById('offer-box');
        if (planos.length > 0 && offerBox) {
            planos.forEach(plano => {
                plano.addEventListener('click', () => {
                    planos.forEach(p => p.classList.remove('selected'));
                    plano.classList.add('selected');
                    const planoSelecionado = plano.dataset.plano;
                    updateOfferBoxUI(planoSelecionado);
                    offerBox.classList.remove('offer-box-hidden');
                    offerBox.classList.add('offer-box-visible');
                    setTimeout(() => {
                        offerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                });
            });
        }
    }

    // Função do Acordeão (FAQ)
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

    // Função Geral para Animações de Entrada ao Rolar
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
    initRandomVagas();
    initHeadlineAnimation();
    initSymptomChecklist();
    initSocialProof();
    initPlanSelection();
    initFaqAccordion();
    initScrollAnimations();
});
