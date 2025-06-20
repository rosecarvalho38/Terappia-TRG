document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DA SEÇÃO DE SINTOMAS ---
    const sintomasCheckboxes = document.querySelectorAll('.sintoma-item input[type="checkbox"]');
    const showSolutionBtn = document.getElementById('show-solution-btn');
    const conteudoPrincipal = document.getElementById('conteudo-principal');

    if (sintomasCheckboxes.length > 0 && showSolutionBtn) {
        sintomasCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const isAnyChecked = Array.from(sintomasCheckboxes).some(cb => cb.checked);
                showSolutionBtn.disabled = !isAnyChecked;
            });
        });

        showSolutionBtn.addEventListener('click', () => {
            if (!showSolutionBtn.disabled) {
                conteudoPrincipal.classList.remove('hidden');
                // Rola suavemente para a próxima seção
                document.querySelector('.secao-transicao').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- LÓGICA DA SELEÇÃO DE PLANOS ---
    const planos = document.querySelectorAll('.plano-card');
    const offerBox = document.getElementById('offer-box');
    const offerDetails = document.getElementById('offer-details');

    // Dados dos planos (isso pode vir do backend no futuro)
    const planosInfo = {
        plus: {
            nome: 'PLANO PLUS',
            desc: 'O Ponto de Partida Para a Sua Cura',
            investimento: 'R$ 480,00 à vista ou 5x de R$ 96,00',
            vagasTotal: 4,
            vagasRestantes: 3,
            linkCompra: '#' // Substitua pelo link de compra do Plano Plus
        },
        premium: {
            nome: 'PLANO PREMIUM',
            desc: 'A Transformação Profunda e Acelerada',
            investimento: 'R$ 840,00 à vista ou 8x de R$ 105,00',
            vagasTotal: 4,
            vagasRestantes: 2,
            linkCompra: '#' // Substitua pelo link de compra do Plano Premium
        },
        master: {
            nome: 'PLANO MASTER',
            desc: 'A Imersão Completa Para a Reconstrução Pessoal',
            investimento: 'R$ 1.200,00 à vista ou 12x de R$ 100,00',
            vagasTotal: 2,
            vagasRestantes: 1,
            linkCompra: '#' // Substitua pelo link de compra do Plano Master
        }
    };
    
    if (planos.length > 0 && offerBox) {
        planos.forEach(plano => {
            plano.addEventListener('click', () => {
                // Remove a seleção de todos
                planos.forEach(p => p.classList.remove('selected'));
                // Adiciona a seleção ao clicado
                plano.classList.add('selected');

                const planoSelecionado = plano.dataset.plano;
                const info = planosInfo[planoSelecionado];

                const percentualVagas = (info.vagasRestantes / info.vagasTotal) * 100;

                // Preenche a caixa de oferta com os dados do plano
                offerDetails.innerHTML = `
                    <p class="plano-selecionado">${info.nome}</p>
                    <p>${info.desc}</p>
                    <p class="plano-investimento"><strong>Investimento:</strong> ${info.investimento}</p>
                    <div class="plano-disponibilidade">
                        URGENTE: Restam apenas ${info.vagasRestantes} de ${info.vagasTotal} vagas para este plano.
                        <div class="progress-bar">
                            <div class="progress-bar-inner" style="width: ${100 - percentualVagas}%"></div>
                        </div>
                    </div>
                    <a href="${info.linkCompra}" class="cta-button">GARANTIR MINHA VAGA NO ${info.nome}</a>
                `;

                // Mostra a caixa de oferta
                offerBox.classList.remove('offer-box-hidden');
                offerBox.classList.add('offer-box-visible');
            });
        });
    }


    // --- LÓGICA DO ACORDEÃO (FAQ) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                header.classList.toggle('active');
                if (header.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    }

    // --- ANIMAÇÃO DE ENTRADA AO ROLAR ---
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
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});
