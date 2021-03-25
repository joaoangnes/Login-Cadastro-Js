const fields = document.querySelectorAll(".textb input");
const btn = document.querySelector(".btn");

// Animação do hover do botão e liberar vizualização da senha
if(btn !=null){
  function check(){
    if(fields[0].value != "" && fields[1].value != ""){
      btn.disabled = false;
    }else{
      btn.disabled = true;  
    }
  }

  fields[0].addEventListener("keyup",check);
  fields[1].addEventListener("keyup",check);

  document.querySelector(".show-password").addEventListener("click",function(){
    if(this.classList[2] == "fa-eye-slash"){
      this.classList.remove("fa-eye-slash");
      this.classList.add("fa-eye");
      fields[1].type = "text";
    }else{
      this.classList.remove("fa-eye");
      this.classList.add("fa-eye-slash");
      fields[1].type = "password";
    }
  });
}

class Usuarios {
  constructor() {
    this.usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  }

  validaDados (form) {
    let entrada = false;
    let emailLogin = document.getElementById("emailLogin").value;
    let senhaLogin = document.getElementById("senhaLogin").value;
    
    let re = /\S+@\S+\.\S+/;

    // explodir string em array
    let charArr = senhaLogin.split("");

    let uppercases = 0;
    let numbers = 0;

    if(!re.test(emailLogin)) {
      this.emailIncorreto();
    } 
    
    for(let i = 0; charArr.length > i; i++) {
      if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
      } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
      }
    }

    if(!re.test(emailLogin)) {
        this.emailIncorreto();
    } else if(uppercases === 0 || numbers === 0) {
        this.senhaIncorreta();
    } else{
        let usuariosCadastrados = this.usuarios;

        for(var i=0; i < usuariosCadastrados.length; i++) {
          if(usuariosCadastrados[i].email === emailLogin && usuariosCadastrados[i].senha === senhaLogin) {
            // alert(`Bem vindo ${usuariosCadastrados[i].nome}!!`);
            this.loginConcluido(usuariosCadastrados[i].nome);
            entrada = true;
            document.getElementById("emailLogin").value = "";
            document.getElementById("senhaLogin").value = "";
          }
        } 
      
        if(entrada != true){
          this.loginErro();
        } 
    }

    
    
     

  }

  loginConcluido(nome) {
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
        title: `Bem vindo ${nome}!!`
    })
  }

  senhaIncorreta(){
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
      title: `A senha precisa um caractere Maiúsculo e um Número`
  })
  }

  emailIncorreto() {
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
        title: `Insira um e-mail no padrão joao@gmail.com`
    })
  }

  loginErro() {
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
        title: `Email ou Senha incorretos!!`
    })
  }

}

var elBotao = document.getElementById("btnLogin");

let form = document.getElementById("login-form");

let usuario = new Usuarios();


elBotao.addEventListener('click', (e) =>{
    e.preventDefault();
    usuario.validaDados(form);
});

