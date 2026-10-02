// Arquivo de configuração e processamento do Partido PMarvel

let candidatos = [];
const NOME_PARTIDO = "PMarvel";
const NUMERO_PARTIDO = "92";

async function carregarCandidatos() {
    try {
        const response = await fetch('candidatos.json');
        const data = await response.json();
        
        if (data[NOME_PARTIDO]) {
            candidatos = data[NOME_PARTIDO].map(c => ({
                nome: c.nome,
                foto: c.foto,
                cargo: "",
                numero: ""
            }));
            return true;
        }
        return false;
    } catch (error) {
        console.error("Erro ao carregar candidatos:", error);
        return false;
    }
}

function validarNumeroCandidato(numero, cargo) {
    if (!numero.startsWith(NUMERO_PARTIDO)) {
        return { valido: false, erro: `O número deve começar com ${NUMERO_PARTIDO}.` };
    }

    const tamanho = numero.length;
    switch (cargo) {
        case "Presidente":
            if (tamanho !== 2) return { valido: false, erro: "Para Presidente, o número deve ter exatos 2 dígitos." };
            break;
        case "Governador(a)":
        case "Senador(a)":
            if (tamanho !== 3) return { valido: false, erro: `Para ${cargo}, o número deve ter 3 dígitos.` };
            break;
        case "Deputado(a) Federal":
            if (tamanho !== 4) return { valido: false, erro: "Para Deputado(a) Federal, o número deve ter 4 dígitos." };
            break;
        case "Deputado(a) Estadual":
            if (tamanho !== 5) return { valido: false, erro: "Para Deputado(a) Estadual, o número deve ter 5 dígitos." };
            break;
        default:
            return { valido: false, erro: "Cargo inválido." };
    }
    return { valido: true, erro: "" };
}