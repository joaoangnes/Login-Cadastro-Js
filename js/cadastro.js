class Validator {
    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-cpf-validate',
            'data-email-validate',
            'data-equal',
            'data-password-validate',
            'data-fone-validate',
        ]
    }

    // Inicia a validação
    validate(form) {
        
        // Pegar os inputs
        let inputs = form.getElementsByTagName('input')
        
        // HTML Colletion -> array
        let inputsArray = [...inputs];
        
        // Resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');
        
        if(currentValidations.length > 0 ) {

            this.cleanValidations(currentValidations);
        }

        // Loop nos inputs e validação
        inputsArray.forEach(function(input) {
            // loop com todas as validações
            for(let i = 0; this.validations.length > i; i++) {
                // Verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null){
                    //data-min-length -> minlength
                    // limpando a string para virar um metodo
                    let method = this.validations[i].replace('data-','').replace('-','');

                    // valor do input
                    let value = input.getAttribute(this.validations[i]); 

                    // invocar metodo
                    this[method](input, value);
                }
            }   

        }, this);
         
        let currentValidations1 = document.querySelectorAll('form .error-validation');

        console.log(currentValidations1.length);
        // Caso não tenha nenhum erro de validação adicionar o usuario no array
        if(currentValidations1.length === 0 ){
            
            let nome = document.getElementById("nome").value;
            let cpf = document.getElementById("cpf").value;
            let email = document.getElementById("email").value;
            let fone = document.getElementById("fone").value;
            let senha = document.getElementById("senha").value; 

            usuario.adicionar(nome, cpf, email, fone, senha); // adiciona no array de usuarios
            usuario.adicionarLocalStorage(); // amarzena no local storage
            usuario.listar(); 

            this.limpaImput("nome");
            this.limpaImput("cpf");
            this.limpaImput("email");
            this.limpaImput("fone");
            this.limpaImput("senha");
            this.limpaImput("senhaConfirma");

            usuario.cadastroConcluido();   
        }else {
            usuario.cadastroErro();
        }
        //  console.log(currentValidations1);
    }

    // metodo para limpar input 
    limpaImput(inputName) {
        document.getElementById(inputName).value = ""
    }
     // método para validar se tem um mínimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter no minimo ${minValue} caracteres`;

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }

    }

    // verifica se um input passou do limite de caracteres
    cpfvalidate(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `Insira o CPF no padrão 000.000.000-00`;


        if(inputLength != minValue){
            this.printMessage(input, errorMessage);
        }   
    }

    // verifica se um input passou do limite de caracteres
    fonevalidate(input, minValue) {
        let inputLength = input.value.length;
    
        let errorMessage = `Insira o telefone no padrão (00)00000-0000`;
    
    
        if(inputLength != minValue){
            this.printMessage(input, errorMessage);
        }   
    }   

    // verifica se o input é requerido
    required(input) {
        
        let inputValue = input.value;

        if(inputValue === '') {
            let errorMessage = `Este campo é obrigatório`;
            this.printMessage(input, errorMessage);
            return false;
        }   
    }

    // valida email
    emailvalidate(input) {
        
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão joao@gmail.com`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    // verifica se o campo de confirmação de senha é igual a senha
    equal(input, inputName) {
        
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    // valida campo de senha
    passwordvalidate(input) {

        // explodir string em array
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
            uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
            numbers++;
        }
        }

        if(uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
            this.printMessage(input, errorMessage);
        }

    }

    // Metodo para imprimir mensagem de erro na tela
    printMessage(input, msg) {
  
        // quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');
        
    
        if(errorsQty === null){
            let template = document.querySelector('.error-validation').cloneNode(true);
            
            template.textContent = msg;
            
            let inputParent = input.parentNode;
            
            template.classList.remove('template');
            
            inputParent.appendChild(template);
        }
    }

    // remove todas as validações para fazer a checagem novamente
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}

class Usuario {
    constructor() {
        this.usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    }

    adicionar(nome, cpf, email, fone, senha) {
        this.usuarios.push({
            nome: nome,
            cpf: cpf,
            email: email,
            fone: fone,
            senha: senha
        });
    }

    listar() {
        console.log(this.usuarios);
    }

    adicionarLocalStorage() {
        localStorage.setItem("usuarios", JSON.stringify(this.usuarios)); // Salva o convidado no local storage do navegador, simulando um banco de dados
    }

    loginPagina() {
       location.href = "login.html";
    }

    cadastroConcluido() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 7000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    
        Toast.fire({
            icon: 'success',
            title: 'Cadastro concluido com sucesso!!'
        })
    }

    cadastroErro() {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 7000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
     
        Toast.fire({
            icon: 'error',
            title: 'Cadastro não concluido com sucesso!',
        })
     }
}

// Botão - ID
var elBotao = document.getElementById("botaoCadastrar");


let form = document.getElementById("formCadastro");

let validator = new Validator();
let usuario = new Usuario();


if(elBotao != null) {
elBotao.addEventListener('click', (e) =>{
    e.preventDefault();
    validator.validate(form);
});
}

