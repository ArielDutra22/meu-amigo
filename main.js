
const stars = document.getElementById("stars");
const fallingPetals = document.getElementById("fallingPetals");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

let started = false;
let petalInterval = null;

// Criar estrelas no fundo
function createStars() {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 90; i++) {
        const star = document.createElement("span");

        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 4 + "s";
        star.style.animationDuration =
            (2 + Math.random() * 4) + "s";

        const size = 1 + Math.random() * 2;

        star.style.width = size + "px";
        star.style.height = size + "px";

        fragment.appendChild(star);
    }

    stars.appendChild(fragment);
}

// Criar pétalas voando pela tela
function createPetal() {
    if (!started) return;

    const petal = document.createElement("span");

    petal.className = "flying-petal";

    petal.style.left = Math.random() * 100 + "%";

    petal.style.animationDuration =
        (5 + Math.random() * 6) + "s";

    petal.style.setProperty(
        "--drift",
        (Math.random() * 260 - 130) + "px"
    );

    petal.style.setProperty(
        "--rotation",
        (Math.random() * 900 - 450) + "deg"
    );

    const size = 5 + Math.random() * 9;

    petal.style.width = size + "px";
    petal.style.height = size * 1.5 + "px";

    fallingPetals.appendChild(petal);

    petal.addEventListener("animationend", () => {
        petal.remove();
    }, { once: true });
}

// Iniciar a experiência automaticamente
function startExperience() {
    if (started) return;

    started = true;

    document.body.classList.add("started");

    // Primeiras pétalas
    for (let i = 0; i < 16; i++) {
        setTimeout(createPetal, i * 130);
    }

    // Pétalas continuam aparecendo
    petalInterval = setInterval(
        createPetal,
        reducedMotion ? 1000 : 250
    );

    // Mostrar a mensagem depois do florescimento
    setTimeout(() => {
        document.body.classList.add("show-message");
    }, reducedMotion ? 500 : 4800);
}

// Preparar o cenário
createStars();

if (document.readyState === "complete") {
    startExperience();
} else {
    window.addEventListener(
        "load",
        startExperience,
        { once: true }
    );
}
