document.addEventListener('DOMContentLoaded', () => {

    // --- ANIMAÇÃO DE TEXTO DA HEADLINE ---
    const headline = document.getElementById('main-headline');
    if (headline) {
        const text = headline.textContent;
        const words = text.split(' ');
        headline.textContent = '';
        words.forEach((word, i) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.transitionDelay = `${i * 0.1}s`;
            headline.appendChild(span);
        });
        // Ativa a animação após um pequeno delay
        setTimeout(() => headline.classList.add('is-visible'), 100);
    }

    // --- LÓGICA DO CHECKLIST DE SINTOMAS ---
    const sintomasCheckboxes = document.querySelectorAll('.sintoma-item input[type="checkbox"]');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const conteudoPrincipal = document.getElementById('conteudo-principal');

    if (sintomasCheckboxes.length > 0 && showSolutionBtn && conteudoPrincipal) {
        sintomasCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const isAnyChecked = Array.from(sintomasCheckboxes).some(cb => cb.checked);
                showSolutionBtn.disabled = !isAnyChecked;
            });
        });

        showSolutionBtn.addEventListener('click', () => {
            if (!showSolutionBtn.disabled) {
                conteudoPrincipal.style.display = 'block';
                setTimeout(() => {
                    document.getElementById('solucao').scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    }

    // --- LÓGICA DA PROVA SOCIAL (COMENTÁRIOS INSTAGRAM) ---
    const commentsList = document.getElementById('comments-list');
    const notificationElement = document.getElementById('new-comment-notification');

    if (commentsList && notificationElement) {
        const fakeComments = [
            { name: 'Carla S.', avatar: 'avatar1.jpg', text: 'Meninas, comecei há 3 semanas e a diferença na minha ansiedade é inacreditável. A Rose é luz.' },
            { name: 'Juliana P.', avatar: 'avatar2.jpg', text: 'Eu tinha dores de cabeça todos os dias. Fui em vários médicos. Na segunda sessão com a Rose, elas sumiram. Não sei explicar.' },
            { name: 'Mariana F.', avatar: 'avatar3.jpg', text: 'O mais incrível é como a gente se sente segura pra falar de tudo. Um ambiente de acolhimento que eu nunca tinha encontrado.' },
            { name: 'Fernanda L.', avatar: 'avatar4.jpg', text: 'Se você tá na dúvida, só vai. É um investimento em você mesma que vale cada centavo.' },
            { name: 'Beatriz M.', avatar: 'avatar5.jpg', text: 'A TRG mudou minha vida. Simples assim. O peso nos ombros sumiu.' },
            { name: 'Laura C.', avatar: 'avatar6.jpg', text: 'Finalmente entendi de onde vinha minha irritabilidade. Obrigada, Rose!' },
            { name: 'Sofia R.', avatar: 'avatar7.jpg', text: 'Recomendo de olhos fechados. Uma profissional incrível.' }
        ];
        let commentsToShow = [...fakeComments];

        function addComment(comment, atStart = false) {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-item';
            commentDiv.innerHTML = `
                <div class="comment-avatar"><img src="/static/img/${comment.avatar}" alt="avatar"></div>
                <div class="comment-body">
                    <p><strong>${comment.name}</strong> ${comment.text}</p>
                    <div class="comment-actions">Curtir • Responder • há poucos segundos</div>
                </div>
            `;
            if (atStart) {
                commentsList.prepend(commentDiv);
            } else {
                commentsList.appendChild(commentDiv);
            }
        }

        function showNotification(name) {
            notificationElement.textContent = `💬 ${name} acabou de deixar um novo comentário`;
            notificationElement.classList.add('show');
            setTimeout(() => {
                notificationElement.classList.remove('show');
            }, 5000);
        }
        
        // Popula os comentários iniciais
        commentsToShow.slice(0, 4).forEach(comment => addComment(comment));
        let nextCommentIndex = 4;

        // Adiciona novos comentários em tempo real
        function scheduleNextComment() {
            const randomDelay = Math.random() * (25000 - 15000) + 15000;
            setTimeout(() => {
                if (nextCommentIndex < commentsToShow.length) {
                    const newComment = commentsToShow[nextCommentIndex];
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
            plus: { nome: 'PLANO PLUS', investimento: 'R$ 480,00 à vista ou 5x de R$ 96,00', vagasTotal: 4, vagasRestantes: 3, linkCompra: '#' },
            premium: { nome: 'PLANO PREMIUM', investimento: 'R$ 840,00 à vista ou 8x de R$ 105,00', vagasTotal: 4, vagasRestantes: 2, linkCompra: '#' },
            master: { nome: 'PLANO MASTER', investimento: 'R$ 1.200,00 à vista ou 12x de R$ 100,00', vagasTotal: 2, vagasRestantes: 1, linkCompra: '#' }
        };
        
        planos.forEach(plano => {
            plano.addEventListener('click', () => {
                planos.forEach(p => p.classList.remove('selected'));
                plano.classList.add('selected');
                const planoSelecionado = plano.dataset.plano;
                const info = planosInfo[planoSelecionado];
                const vagasPreenchidas = info.vagasTotal - info.vagasRestantes;
                const percentualPreenchido = (vagasPreenchidas / info.vagasTotal) * 100;

                offerDetails.innerHTML = `
                    <p class="plano-selecionado">${info.nome}</p>
                    <p class="plano-investimento"><strong>Investimento:</strong> ${info.investimento}</p>
                    <div class="plano-disponibilidade">
                        URGENTE: Restam apenas ${info.vagasRestantes} de ${info.vagasTotal} vagas para este plano.
                        <div class="progress-bar"><div class="progress-bar-inner" style="width: ${percentualPreenchido}%"></div></div>
                    </div>
                    <a href="${info.linkCompra}" class="cta-button">GARANTIR MINHA VAGA NO ${info.nome.replace('PLANO ','')}</a>
                `;
                offerBox.classList.remove('offer-box-hidden');
                offerBox.classList.add('offer-box-visible');
            });
        });
    }

    // ... outras lógicas como FAQ (acordeão) podem ser adicionadas aqui
});
