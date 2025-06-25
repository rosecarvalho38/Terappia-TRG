// static/js/script.js (VERSÃO FINAL COM ESCASSEZ SINCRONIZADA)

document.addEventListener('DOMContentLoaded', () => {

    // Objeto central que guarda o estado das vagas.
    // É declarado aqui no topo para ser acessível por múltiplas funções.
    const planosInfo = {
        plus: { nome: 'PLANO PLUS', valorVista: 'R$ 480,00', parcelas: '5x de', valorParcela: 'R$ 96,00', vagasTotal: 4, vagasDisponiveis: 3, linkCompra: '#' },
        premium: { nome: 'PLANO PREMIUM', valorVista: 'R$ 840,00', parcelas: '8x de', valorParcela: 'R$ 105,00', vagasTotal: 4, vagasDisponiveis: 2, linkCompra: '#' },
        master: { nome: 'PLANO MASTER', valorVista: 'R$ 1.200,00', parcelas: '12x de', valorParcela: 'R$ 100,00', vagasTotal: 2, vagasDisponiveis: 1, linkCompra: '#' }
    };

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
     * Função de Prova Social (Comentários e Compras Sincronizadas)
     */
    function initSocialProofAndPurchaseNotifications() {
        const commentsList = document.getElementById('comments-list');
        const notificationElement = document.getElementById('new-comment-notification');

        if (!commentsList || !notificationElement) return;

        const fakeComments = [
            { name: 'Juliana Pinho', avatar: 'avatar1.jpg', text: 'Gente, sério. Minha enxaqueca era diária...' },
            { name: 'Amanda Guedes', avatar: 'avatar2.jpg', text: 'Eu era a pessoa mais cética com terapia online...' },
            { name: 'Letícia Bueloni', avatar: 'avatar3.jpg', text: 'A síndrome da \'mulher boazinha\'... isso me consumia...' },
            { name: 'Carla Santos', avatar: 'avatar4.jpg', text: 'Pra quem sofre com ansiedade de verdade, aquela que aperta o peito...' },
            { name: 'Mariana Franco', avatar: 'avatar5.jpg', text: 'O mais surreal é que a gente não fica repassando o trauma mil vezes...' },
            { name: 'Fernanda Lívia', avatar: 'avatar6.jpg', text: 'Esse investimento em mim mesma foi o mais barato e o mais transformador...' },
            { name: 'Beatriz Macedo', avatar: 'avatar7.jpg', text: 'Aquele peso nos ombros que a gente acha que é \'normal\'? Spoiler: NÃO É...' }
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
                <div class="comment-avatar"><img src="/static/img/${comment.avatar}" alt="avatar"></div>
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
            const randomDelay = Math.random() * (45000 - 25000) + 25000;
            setTimeout(() => {
                const eventType = Math.random();
                if (eventType > 0.65 && nextCommentIndex < fakeComments.length) {
                    // MOSTRA NOVO COMENTÁRIO
                    const newComment = fakeComments[nextCommentIndex];
                    addCommentToUI(newComment, true);
                    showNotification(`💬 <strong>${newComment.name}</strong> comentou: "<em>${newComment.text.substring(0, 80)}...</em>"`);
                    nextCommentIndex++;
                } else {
                    // MOSTRA NOVA COMPRA
                    const planosDisponiveis = Object.keys(planosInfo).filter(p => planosInfo[p].vagasDisponiveis > 0);
                    if (planosDisponiveis.length > 0) {
                        const planoCompradoId = planosDisponiveis[Math.floor(Math.random() * planosDisponiveis.length)];
                        planosInfo[planoCompradoId].vagasDisponiveis--;
                        const comprador = fakeComments[Math.floor(Math.random() * fakeComments.length)];
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
        setTimeout(scheduleNextEvent, 20000);
    }

    /**
     * Função da Seleção de Planos de Terapia (agora usando a função de update)
     */
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
    initSocialProofAndPurchaseNotifications();
    initPlanSelection();
    initFaqAccordion();
    initScrollAnimations();
});
