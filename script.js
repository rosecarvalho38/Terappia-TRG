document.addEventListener('DOMContentLoaded', () => {

    // --- ANIMAÇÃO DE TEXTO DA HEADLINE ---
    const headline = document.getElementById('main-headline');
    if (headline) {
        const text = headline.textContent.trim();
        const words = text.split(' ');
        headline.innerHTML = '';
        // Trecho Corrigido
words.forEach((word, i) => {
    const span = document.createElement('span');
    span.textContent = word; // Adiciona apenas a palavra ao span
    span.style.transitionDelay = `${i * 0.1}s`;
    headline.appendChild(span);

    // Adiciona um nó de texto contendo um espaço APÓS cada palavra
    headline.appendChild(document.createTextNode(' '));
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
        // Apenas adiciona a classe .is-visible ao conteúdo principal
        conteudoPrincipal.classList.add('is-visible');
        
        // Rola suavemente para a próxima seção
        const solucaoSection = document.getElementById('solucao');
        if (solucaoSection) {
            // Pequeno delay para a animação de aparição começar
            setTimeout(() => {
                solucaoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 200);
        }
    }
});
    }

    // --- LÓGICA DA PROVA SOCIAL (COMENTÁRIOS INSTAGRAM) ---
    const commentsList = document.getElementById('comments-list');
    const notificationElement = document.getElementById('new-comment-notification');
    if (commentsList && notificationElement) {
        const fakeComments = [
            // Novo Banco de Dados de Comentários
const fakeComments = [
    { name: 'Juliana P.', avatar: 'avatar1.jpg', text: 'Gente, sério. Minha enxaqueca era diária. Eu já tinha uma farmácia em casa. Fui em tudo que é médico. Na segunda sessão com a Rose, eu entendi a CAUSA da dor. Hoje faz um mês que não sei o que é tomar um remédio pra cabeça. Parece mágica.' },
    { name: 'Amanda G.', avatar: 'avatar2.jpg', text: 'Eu era a pessoa mais cética do mundo com terapia online. Achava que era papo de coach. Paguei pra ver e quebrei a cara (graças a Deus!). O acolhimento e a profundidade que a Rose alcança pela tela é algo que eu nunca tive no presencial. Não troco por nada.' },
    { name: 'Letícia B.', avatar: 'avatar3.jpg', text: 'A síndrome da \'mulher boazinha\' que tem que dar conta de tudo e agradar todo mundo... isso me consumia. Eu não sabia dizer não. A TRG com a Rose não me \'curou\' disso, ela me DEVOLVEU a minha voz. Hoje, minha paz não é negociável. Obrigada.' },
    { name: 'Carla S.', avatar: 'avatar4.jpg', text: 'Pra quem sofre com ansiedade de verdade, aquela que aperta o peito e dá vontade de sumir... só digo uma coisa: comecem. Eu tava no fundo do poço há 3 semanas. Hoje eu consigo respirar fundo de novo. É um alívio que eu não sentia há anos.' },
    { name: 'Mariana F.', avatar: 'avatar5.jpg', text: 'O mais surreal é que a gente não fica repassando o trauma mil vezes. É diferente de tudo. A Rose te guia pra olhar pra dor de um lugar seguro, sem sofrimento. E de repente, aquilo que te assombrava vira só uma lembrança distante. É libertador.' },
    { name: 'Fernanda L.', avatar: 'avatar6.jpg', text: 'Eu tava na dúvida, o valor parecia alto no começo. Mas aí botei na ponta do lápis o quanto eu já gastei com remédio, com saídas pra \'esquecer os problemas\', com comida pra tapar buraco... Gente, esse investimento em mim mesma foi o mais barato e o mais transformador de todos. Só vai.' },
    { name: 'Beatriz M.', avatar: 'avatar7.jpg', text: 'Aquele peso nos ombros que a gente acha que é \'normal\' da vida adulta? Spoiler: NÃO É. Era culpa, era medo, era um monte de coisa que eu nem sabia que carregava. A TRG com a Rose tirou esse piano das minhas costas. Hoje eu ando mais leve, literalmente.' },
    { name: 'Patrícia R.', avatar: 'avatar8.jpg', text: 'Minha ansiedade não era só preocupação, era terror noturno. Acordar com o coração na boca, com medo de tudo. Já na primeira sessão, a Rose me deu uma ferramenta que me fez dormir a noite inteira. Isso, pra mim, já tinha valido o processo todo.' },
    { name: 'Camila V.', avatar: 'avatar9.jpg', text: 'Eu era a rainha da procrastinação. Adiava tudo que era importante por medo de não ser perfeita. Hoje eu entendi que minha procrastinação era só ansiedade disfarçada. Depois que a gente reprocessou a raiz do medo, eu simplesmente comecei a FAZER as coisas. Minha vida profissional destravou.' },
    { name: 'Sofia R.', avatar: 'avatar10.jpg', text: 'Recomendo de olhos fechados. Uma profissional que não te julga, não te apressa, ela realmente te ouve e te guia com uma segurança absurda. O ambiente das sessões é um oásis de paz.' },
    { name: 'Gabriela M.', avatar: 'avatar11.jpg', text: 'O \'clique\' pra mim foi entender que minha irritabilidade com meu marido vinha de um medo que eu passei na infância. A Rose me ajudou a conectar os pontos de uma forma que NENHUM outro terapeuta tinha conseguido. Mudou o jogo pra mim e pro meu relacionamento.' },
    { name: 'Laura C.', avatar: 'avatar12.jpg', text: 'Finalmente parei de me sentir culpada por querer um tempo pra mim. Antes eu achava que era egoísmo. Hoje eu entendo que é sobrevivência. Obrigada, Rose, por me ensinar a colocar minha máscara de oxigênio primeiro.' },
    { name: 'Isabela N.', avatar: 'avatar13.jpg', text: 'O estômago alto, a queimação, a gastrite nervosa... Eu achava que era o que eu comia. Mal sabia eu que era o que eu \'engolia\' e não dizia. A terapia me ajudou a botar pra fora o que me fazia mal. Resultado: meu estômago parece outro.' },
    { name: 'Clara B.', avatar: 'avatar14.jpg', text: 'Eu pensei que era só comigo essa sensação de estar sorrindo numa festa mas por dentro estar em pânico. Ler os relatos aqui e depois fazer a terapia com a Rose foi um alívio tão grande... Ver que a gente não tá sozinha nessa já é metade da cura.' },
    { name: 'Vanessa T.', avatar: 'avatar15.jpg', text: 'Se você é mãe e se sente engolida pela culpa e pela exaustão, faça isso por você e pelos seus filhos. Eu me tornei uma mãe muito mais presente e paciente depois de cuidar da minha própria bagagem emocional. É um presente pra família inteira.' },
    { name: 'Daniela A.', avatar: 'avatar16.jpg', text: 'O processo é intenso, não vou mentir. Mas é uma intensidade que cura, que limpa. É como fazer uma faxina na alma. No final, a sensação de paz e de espaço interno que se abre é indescritível.' },
    { name: 'Renata P.', avatar: 'avatar17.jpg', text: 'Eu tinha muito medo de \'mexer\' em coisas do passado. A Rose foi tão cuidadosa, tão respeitosa com meu tempo... Em nenhum momento me senti forçada a nada. Ela criou um campo tão seguro que a cura aconteceu de forma natural.' },
    { name: 'Thais O.', avatar: 'avatar18.jpg', text: 'Meu foco no trabalho melhorou 200%. Aquela névoa mental, aquela dificuldade de tomar decisão... sumiu. Porque a minha energia não estava mais sendo gasta pra conter a ansiedade o tempo todo.' },
    { name: 'Alice F.', avatar: 'avatar19.jpg', text: 'Simples assim: a melhor decisão que eu tomei no último ano. Ponto.' },
    { name: 'Luísa M.', avatar: 'avatar20.jpg', text: 'Gente, eu só queria deixar registrado aqui. Se você tá lendo isso, no fundo da sua alma você já sabe que precisa de ajuda. O medo paralisa, eu sei. Mas a dor de continuar como está é muito maior. Dê o primeiro passo. Você merece essa paz. 🙏' }
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
