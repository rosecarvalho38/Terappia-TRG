// static/js/script.js (VERSÃO DEFINITIVA E FUNCIONAL)

document.addEventListener('DOMContentLoaded', () => {

    // NOVO objeto de planos com ancoragem e preço detalhado
const planosInfo = {
    plus: { 
        nome: 'PLANO PLUS', 
        desc: 'O Ponto de Partida Para a Sua Cura', 
        valorOriginal: 'R$ 732,00', 
        valorVista: 'R$ 584,00', 
        parcelas: '12x de', 
        valorParcela: 'R$ 60,40', 
        vagasTotal: 13, 
        vagasDisponiveis: 0, 
        linkCompra: 'https://pay.kiwify.com.br/3asCtd5' 
    },
    premium: { 
        nome: 'PLANO PREMIUM', 
        desc: 'A Transformação Profunda e Acelerada', 
        valorOriginal: 'R$ 1.000,00', 
        valorVista: 'R$ 898,00', 
        parcelas: '12x de', 
        valorParcela: 'R$ 92,87', 
        vagasTotal: 9, 
        vagasDisponiveis: 0, 
        linkCompra: 'https://pay.kiwify.com.br/F7AddT0' 
    },
    master: { 
        nome: 'PLANO MASTER', 
        desc: 'A Imersão Completa Para a Reconstrução', 
        valorOriginal: 'R$ 1.500,00', 
        valorVista: 'R$ 1.296,00', 
        parcelas: '12x de', 
        valorParcela: 'R$ 134,04', 
        vagasTotal: 5, 
        vagasDisponiveis: 0, 
        linkCompra: 'https://pay.kiwify.com.br/ofky8ml' 
    }
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

    // Estrutura HTML final e otimizada para a oferta
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
            <div class="progress-bar">
                <div class="progress-bar-inner" style="width: ${percentualPreenchido}%"></div>
            </div>
        </div>
        
        <a href="${info.linkCompra}" class="cta-button">GARANTIR MINHA VAGA NO ${info.nome.replace('PLANO ','')}</a>
    `;
}
    /**
 * Função para inicializar as vagas com valores aleatórios.
 */
function initRandomVagas() {
    // Garante um número mínimo de 2 vagas para ser mais crível
    planosInfo.plus.vagasDisponiveis = Math.floor(Math.random() * 4) + 5; // Gera de 5 a 8 vagas
    planosInfo.premium.vagasDisponiveis = Math.floor(Math.random() * 3) + 3; // Gera de 3 a 5 vagas
    planosInfo.master.vagasDisponiveis = Math.floor(Math.random() * 2) + 2; // Gera 2 ou 3 vagas
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

    { name: 'Juliana Pinho', avatar: 'avatar1.jpg', text: 'Gente, sério. Minha enxaqueca era diária. Na segunda sessão com a Rose, eu entendi a CAUSA da dor. Hoje faz um mês que não sei o que é tomar um remédio. Parece mágica.' },
    { name: 'Amanda Guedes', avatar: 'avatar2.jpg', text: 'Eu era a pessoa mais cética com terapia online. Paguei pra ver e quebrei a cara (graças a Deus!). O acolhimento e a profundidade que a Rose alcança pela tela é algo que eu nunca tive no presencial. Não troco por nada.' },
    { name: 'Letícia Bueloni', avatar: 'avatar3.jpg', text: 'A síndrome da \'mulher boazinha\'... isso me consumia. A TRG com a Rose me DEVOLVEU a minha voz. Hoje, minha paz não é negociável. Obrigada.' },
    { name: 'Carla Santos', avatar: 'avatar4.jpg', text: 'Pra quem sofre com ansiedade de verdade, aquela que aperta o peito e dá vontade de sumir... só digo uma coisa: comecem. Eu tava no fundo do poço há 3 semanas. Hoje eu consigo respirar fundo de novo.' },
    { name: 'Mariana Franco', avatar: 'avatar5.jpg', text: 'O mais surreal é que a gente não fica repassando o trauma mil vezes. É diferente de tudo. A Rose te guia pra olhar pra dor de um lugar seguro, sem sofrimento. E de repente, aquilo que te assombrava vira só uma lembrança distante. É libertador.' },
    { name: 'Fernanda Lívia', avatar: 'avatar6.jpg', text: 'Esse investimento em mim mesma foi o mais barato e o mais transformador de todos. Só vai.' },
    { name: 'Beatriz Macedo', avatar: 'avatar7.jpg', text: 'Aquele peso nos ombros que a gente acha que é \'normal\' da vida adulta? Spoiler: NÃO É. Era culpa, era medo, era um monte de coisa que eu nem sabia que carregava. A TRG com a Rose tirou esse piano das minhas costas.' },
    { name: 'Patrícia Rios', avatar: 'avatar8.jpg', text: 'Minha ansiedade se manifestava à noite. Eu simplesmente não dormia, ficava com o coração disparado pensando em mil problemas. Já na primeira sessão a Rose me ensinou uma técnica que me fez apagar. Só isso já valeu tudo.' },
    { name: 'Camila Veiga', avatar: 'avatar9.jpg', text: 'Eu procrastinava tudo no trabalho por medo de não ser boa o suficiente. Achava que era preguiça. Na terapia entendi que era autossabotagem pura. Depois que a gente tratou a raiz disso, recebi uma promoção. Surreal.' },
    { name: 'Vanessa T.', avatar: 'avatar10.jpg', text: 'Fiz anos de terapia convencional e nunca cheguei nem perto da profundidade que alcancei em poucas sessões de TRG. Uma fala sobre o problema, a outra vai lá e resolve a causa. Simples assim.' },
    { name: 'Gabriela Mota', avatar: 'avatar11.jpg', text: 'O "clique" pra mim foi entender que minha irritabilidade com meus filhos vinha de um padrão da minha própria infância. A Rose conectou os pontos de um jeito... mudou minha relação com eles da água pro vinho. 🙏' },
    { name: 'Isabela Neves', avatar: 'avatar12.jpg', text: 'Gastrite nervosa. Nó na garganta. Meu corpo gritava. Eu achava que era o que eu comia, mas na verdade era o que eu sentia e não falava. A terapia me deu as ferramentas pra cuidar de mim de verdade. As dores? Sumiram.' },
    { name: 'Laura Cunha', avatar: 'avatar13.jpg', text: 'Finalmente parei de me sentir culpada por querer um tempo pra mim. Antes eu achava que era egoísmo. Hoje eu entendo que é sobrevivência. A Rose me ensinou a colocar minha máscara de oxigênio primeiro.' },
    { name: 'Renata Paiva', avatar: 'avatar14.jpg', text: 'Eu tinha muito medo de \'mexer\' em coisas do passado, achava que ia sofrer mais. A Rose foi tão cuidadosa, tão profissional... em nenhum momento me senti desrespeitada. Ela cria um campo tão seguro que a cura acontece de forma leve.' },
    { name: 'Daniela Almeida', avatar: 'avatar15.jpg', text: 'O processo é intenso, não vou mentir. Mas é uma intensidade que limpa, que organiza a bagunça interna. É como fazer uma faxina na alma. A sensação de paz no final é indescritível.' },
    { name: 'Thais Oliveira', avatar: 'avatar16.jpg', text: 'Meu foco melhorou 200%. Aquela névoa mental, sabe? A dificuldade de tomar decisões... desapareceu. Hoje entendo que minha energia não está mais sendo gasta pra conter a ansiedade o tempo todo.' },
    { name: 'Alice Furtado', avatar: 'avatar17.jpg', text: 'A melhor decisão que tomei no último ano. Ponto. Se você tá em dúvida, para de pensar e só vai.' },
    { name: 'Luísa Mattos', avatar: 'avatar18.jpg', text: 'Gente, só queria dizer uma coisa. Se você tá lendo isso, no fundo você já sabe que precisa de ajuda. O medo paralisa, eu sei. Mas a dor de continuar como está é muito maior. Dê esse presente pra você mesma. Você merece. ✨' },
    { name: 'Sandra Costa', avatar: 'avatar19.jpg', text: 'Eu me sentia uma fraude. A síndrome da impostora me travava em tudo. A gente trabalhou a origem dessa crença e hoje eu consigo celebrar minhas conquistas sem achar que foi "sorte". Liberdade define.' },
    { name: 'Helena Martins', avatar: 'avatar20.jpg', text: 'Pra quem é mãe, como eu: façam. Eu era uma pilha de nervos, sem paciência. Hoje sou uma mãe muito mais presente e calma, porque cuidei da minha própria bagunça primeiro. Meus filhos ganharam uma nova mãe.' },
    { name: 'Priscila Dias', avatar: 'avatar21.jpg', text: 'O que eu mais gostei é que a Rose não te dá as respostas, ela te ensina a encontrar as suas próprias. É uma terapia que te dá autonomia e poder pessoal. Incrível.' },
    { name: 'Bárbara Lima', avatar: 'avatar22.jpg', text: 'Eu achava que nunca ia superar o fim do meu último relacionamento. Estava presa no passado. A TRG me ajudou a reprocessar essa dor e a seguir em frente de verdade, sem carregar o peso do que foi.' },
    { name: 'Vitória Reis', avatar: 'avatar23.jpg', text: 'Hoje eu me olhei no espelho e não precisei forçar um sorriso. Ele veio naturalmente. Fazia tempo que isso não acontecia. 😊' },
    { name: 'Yasmin Barros', avatar: 'avatar24.jpg', text: 'O valor do plano Premium pareceu um pouco alto, mas dividi no cartão e nem pesou. E o resultado... gente, não tem preço. É um investimento na sua sanidade, na sua paz. Vale cada centavo e mais.' },
    { name: 'Melissa Duarte', avatar: 'avatar25.jpg', text: 'Sempre fui muito racional, achava que conseguia resolver tudo com a lógica. Mas tem coisas que não estão na mente, estão no corpo. A TRG me ensinou a ouvir meu corpo. Que virada de chave.' },
    { name:- 'Raquel Campos', avatar: 'avatar26.jpg', text: 'O mais louco é ver as pessoas ao redor comentando: "Nossa, você parece mais leve", "Sua energia tá diferente". A mudança é de dentro pra fora, mas todo mundo nota.' },
    { name: 'Elisa Pinto', avatar: 'avatar27.jpg', text: 'Eu só queria parar de sentir medo do futuro. Vivia ansiosa pelo que podia acontecer. Hoje eu consigo focar no presente e sei que tenho as ferramentas pra lidar com o que vier. Essa segurança não tem preço.' }
]
        
        const fakePurchasers = [
            { name: 'Gabriela Mota' }, { name: 'Isabela Neves' }, { name: 'Laura Cunha' },
            { name: 'Renata Paiva' }, { name: 'Daniela Almeida' }, { name: 'Thais Oliveira' },
            { name: 'Alice Furtado' }, { name: 'Luísa Mattos' }, { name: 'Sandra Costa' },
            { name: 'Helena Martins' }, { name: 'Priscila Dias' }, { name: 'Bárbara Lima' },
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
            commentDiv.innerHTML = `<div class="comment-avatar"><img src="img/${comment.avatar}" alt="avatar"></div><div class="comment-body"><p><strong>${comment.name}</strong> ${comment.text}</p><div class="comment-actions">Curtir • Responder • ${timeAgo}</div></div>`;
            if (isNew) {
                commentsList.prepend(commentDiv);
                commentDiv.classList.add('anim-on-scroll', 'is-visible');
            } else {
                commentsList.appendChild(commentDiv);
            }
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
                if (Math.random() > 0.5 && shuffledCommentIndex < remainingComments.length) {
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
    
    /**
     * Função da Seleção de Planos de Terapia
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
                    setTimeout(() => {
                        offerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
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
 * Função da Urgência Evergreen com Data Fixa
 * Cria um prazo final único por visitante e exibe a data.
 */
function initEvergreenDeadline() {
    const deadlineElement = document.getElementById('deadline-date');
    if (!deadlineElement) return; // Só roda se o elemento existir

    // 1. Verifica se já existe um prazo salvo no navegador do usuário
    let deadlineString = localStorage.getItem('jornadaDeadline');

    // 2. Se não existir, cria um novo prazo para daqui a 2 dias e o salva
    if (!deadlineString) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 2);
        
        // Salva a data completa no localStorage
        localStorage.setItem('jornadaDeadline', targetDate.toISOString());
        deadlineString = targetDate.toISOString();
    }

    // 3. Formata a data para um formato amigável em português
    const targetDate = new Date(deadlineString);
    const diasDaSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    const mesesDoAno = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const diaSemana = diasDaSemana[targetDate.getDay()];
    const dia = targetDate.getDate();
    const mes = mesesDoAno[targetDate.getMonth()];

    const dataFormatada = `${diaSemana}, ${dia} de ${mes}`;

    // 4. Exibe a data na página
    deadlineElement.textContent = dataFormatada;
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
    initRandomVagas();
    initHeadlineAnimation();
    initSymptomChecklist();
    initSocialProof();
    initPlanSelection();
    initFaqAccordion();
    initScrollAnimations();
    initEvergreenDeadline();
});
