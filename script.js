document.addEventListener('DOMContentLoaded', () => {

    // --- ANIMAÇÃO DE TEXTO DA HEADLINE ---
    const headline = document.getElementById('main-headline');
    if (headline) {
        const text = headline.textContent.trim();
        const words = text.split(' ');
        headline.innerHTML = '';
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.transitionDelay = `${i * 0.1}s`;
            headline.appendChild(span);
        });
        setTimeout(() => {
            headline.classList.add('is-visible');
        }, 100);
    }

    // --- LÓGICA DO CHECKLIST DE SINTOMAS ---
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
                conteudoPrincipal.style.display = 'block';
                setTimeout(() => {
                    conteudoPrincipal.style.opacity = '1';
                    const solucaoSection = document.getElementById('solucao');
                    if (solucaoSection) {
                        solucaoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 10);
            }
        });
    }

    // --- LÓGICA DA PROVA SOCIAL (COMENTÁRIOS INSTAGRAM) ---
    const commentsList = document.getElementById('comments-list');
    const notificationElement = document.getElementById('new-comment-notification');
    if (commentsList && notificationElement) {
        const fakeComments = [
            { name: 'Carla S.', avatar: 'avatar1.jpg', text: 'Meninas, comecei há 3 semanas e a diferença na minha ansiedade é inacreditável. A Rose é luz.' },
            { name: 'Juliana P.', avatar: 'avatar2.jpg', text: 'Eu tinha dores de cabeça todos os dias. Fui em vários médicos. Na segunda sessão com a Rose, elas sumiram.' },
            { name: 'Mariana F.', avatar: 'avatar3.jpg', text: 'O mais incrível é como a gente se sente segura pra falar de tudo. Um ambiente de acolhimento que eu nunca tinha encontrado.' },
            { name: 'Fernanda L.', avatar: 'avatar4.jpg', text: 'Se você tá na dúvida, só vai. É um investimento em você mesma que vale cada centavo.' },
            { name: 'Beatriz M.', avatar: 'avatar5.jpg', text: 'A TRG mudou minha vida. Simples assim. O peso nos ombros sumiu.' },
            { name: 'Laura C.', avatar: 'avatar6.jpg', text: 'Finalmente entendi de onde vinha minha irritabilidade. Obrigada, Rose!' },
            { name: 'Sofia R.', avatar: 'avatar7.jpg', text: 'Recomendo de olhos fechados. Uma profissional incrível.' },
            { name: 'Clara B.', avatar: 'avatar8.jpg', text: 'Pensei que era só comigo, mas vi aqui que não. Sentindo um alívio só de ler.'}
        ];
        
        // NOVA FUNÇÃO para gerar tempos realistas
        function generateRandomTimeAgo() {
            const type = Math.random() > 0.4 ? 'dias' : 'horas';
            if (type === 'dias') {
                const dias = Math.floor(Math.random() * 6) + 1; // de 1 a 6 dias
                return `há ${dias} dia${dias > 1 ? 's' : ''}`;
            } else {
                const horas = Math.floor(Math.random() * 23) + 1; // de 1 a 23 horas
                return `há ${horas} hora${horas > 1 ? 's' : ''}`;
            }
        }

        function addComment(comment, atStart = false) {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';
            const timeAgo = atStart ? 'há poucos segundos' : generateRandomTimeAgo();
            commentDiv.innerHTML = `
                <div class="comment-avatar"><img src="/static/img/${comment.avatar}" alt="avatar"></div>
                <div class="comment-body">
                    <p><strong>${comment.name}</strong> ${comment.text}</p>
                    <div class="comment-actions">Curtir • Responder • ${timeAgo}</div>
                </div>`;
            if (atStart) commentsList.prepend(commentDiv);
            else commentsList.appendChild(commentDiv);
        }

        function showNotification(name) {
            notificationElement.innerHTML = `💬 ${name} acabou de deixar um novo comentário`;
            notificationElement.classList.add('show');
            setTimeout(() => notificationElement.classList.remove('show'), 5000);
        }
        
        const initialComments = fakeComments.slice(0, 5);
        initialComments.forEach(comment => addComment(comment));
        let nextCommentIndex = 5;

        function scheduleNextComment() {
            const randomDelay = Math.random() * (25000 - 15000) + 15000;
            setTimeout(() => {
                if (nextCommentIndex < fakeComments.length) {
                    const newComment = fakeComments[nextCommentIndex];
                    addComment(newComment, true);
                    showNotification(newComment.name);
                    nextCommentIndex++;
                    scheduleNextComment();
                }
            }, randomDelay);
        }
        scheduleNextComment();
    }
    
    // --- LÓGICA DA SELEÇÃO DE PLANOS ---
    const planos = document.querySelectorAll('.plano-card');
    const offerBox = document.getElementById('offer-box');
    const offerDetails = document.getElementById('offer-details');
    if (planos.length > 0 && offerBox) {
        const planosInfo = {
             plus: { nome: 'PLANO PLUS', desc: 'O Ponto de Partida Para a Sua Cura', investimento: 'R$ 480,00 à vista ou 5x de R$ 96,00', vagasTotal: 4, vagasDisponiveis: 3, linkCompra: '#' },
             premium: { nome: 'PLANO PREMIUM', desc: 'A Transformação Profunda e Acelerada', investimento: 'R$ 840,00 à vista ou 8x de R$ 105,00', vagasTotal: 4, vagasDisponiveis: 2, linkCompra: '#' },
             master: { nome: 'PLANO MASTER', desc: 'A Imersão Completa Para a Reconstrução', investimento: 'R$ 1.200,00 à vista ou 12x de R$ 100,00', vagasTotal: 2, vagasDisponiveis: 1, linkCompra: '#' }
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
                    <p class="plano-selecionado">${info.nome}</p>
                    <p class="plano-investimento"><strong>Investimento:</strong> ${info.investimento}</p>
                    <div class="plano-disponibilidade">
                        URGENTE: Restam apenas ${info.vagasDisponiveis} de ${info.vagasTotal} vagas para este plano.
                        <div class="progress-bar"><div class="progress-bar-inner" style="width: ${percentualPreenchido}%"></div></div>
                    </div>
                    <a href="${info.linkCompra}" class="cta-button">GARANTIR MINHA VAGA NO ${info.nome.replace('PLANO ','')}</a>`;
                
                offerBox.classList.remove('offer-box-hidden');
                offerBox.classList.add('offer-box-visible');
                offerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        });
    }

    // --- LÓGICA DO ACORDEÃO (FAQ) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isActive = header.classList.contains('active');
                if (!isActive) {
                    header.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    header.classList.remove('active');
                    content.style.maxHeight = null;
                }
            });
        });
    }

    // --- ANIMAÇÕES GERAIS DE ENTRADA AO ROLAR ---
    const genericAnimatedElements = document.querySelectorAll('.anim-on-scroll');
    if (genericAnimatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        genericAnimatedElements.forEach(element => observer.observe(element));
    }
});
