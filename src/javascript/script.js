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
    let passowrdGenerated = "";
    while (passowrdGenerated.length < size) {
        passowrdGenerated += randomCharType(charTypes);
    }
    return passowrdGenerated;
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
    const passowrdGenerated = generatePassword(size, charTypes);

    document.querySelector("#password_container").classList.add("show");
    document.querySelector("#password").textContent = passowrdGenerated;
});

document.querySelector("#copy").addEventListener("click", function () {
    navigator.clipboard.writeText(
        document.querySelector("#password").textContent
    );
    message("Senha copiada com sucesso!", "success");
});
