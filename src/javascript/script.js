function getChartTypes() {
    const uppercase = document.querySelector("#include_uppercase").checked;
    const lowercase = document.querySelector("#include_lowercase").checked;
    const number = document.querySelector("#include_number").checked;
    const specialCharacter = document.querySelector(
        "#include_special_character"
    ).checked;

    const charTypes = [];
    if (uppercase) {
        charTypes.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }
    if (lowercase) {
        charTypes.push("abcdefghijklmnopqrstuvwxyz");
    }
    if (number) {
        charTypes.push("0123456789");
    }
    if (specialCharacter) {
        charTypes.push("!@#$%^&*(){}[]|\\/?><;:");
    }
    return charTypes;
}

function getPasswordSize() {
    const size = document.querySelector("#size").value;
    if (isNaN(size) || size < 4 || size > 128) {
        message("Tamanho invalido, digite um número entre 4 e 128!", "warning");
        return;
    }

    return size;
}

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    return charTypes[randomIndex][
        Math.floor(Math.random() * charTypes[randomIndex].length)
    ];
}

function generatePassword(size, charTypes) {
    let passwordGenerated = "";
    const requiredCharTypes = [];

    if (document.querySelector("#include_uppercase").checked) {
        requiredCharTypes.push(randomCharType(["ABCDEFGHIJKLMNOPQRSTUVWXYZ"]));
    }
    if (document.querySelector("#include_lowercase").checked) {
        requiredCharTypes.push(randomCharType(["abcdefghijklmnopqrstuvwxyz"]));
    }
    if (document.querySelector("#include_number").checked) {
        requiredCharTypes.push(randomCharType(["0123456789"]));
    }
    if (document.querySelector("#include_special_character").checked) {
        requiredCharTypes.push(randomCharType(["!@#$%^&*(){}[]|\\/?><;:"]));
    }

    passwordGenerated = requiredCharTypes.join("");

    while (passwordGenerated.length < size) {
        passwordGenerated += randomCharType(charTypes);
    }

    return shuffleString(passwordGenerated);
}

function shuffleString(string) {
    const array = string.split("");
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
}

function message(text, status = "success") {
    Toastify({
        text: text,
        duration: 3000,
        style: {
            background: status === "success" ? "#00437f" : "#dc2626",
            boxShadow: "none",
        },
    }).showToast();
}

document.querySelector("#generate").addEventListener("click", function () {
    const size = getPasswordSize();
    const charTypes = getChartTypes();

    if (!size) {
        return;
    }
    if (!charTypes.length) {
        message("Selecione pelo menos um tipo de caractere!", "warninh");
        return;
    }
    const passwordGenerated = generatePassword(size, charTypes);

    document.querySelector("#password_container").classList.add("show");
    document.querySelector("#password").textContent = passwordGenerated;
});

document.querySelector("#copy").addEventListener("click", function () {
    navigator.clipboard.writeText(
        document.querySelector("#password").textContent
    );
    message("Senha copiada com sucesso!", "success");
});
