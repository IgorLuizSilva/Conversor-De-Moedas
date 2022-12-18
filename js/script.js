const listaDeConversao = document.querySelectorAll('.listaDeConversao #select')
const conversaoDe = document.querySelector('.De #select')
const conversaoPara = document.querySelector('.Para #select')
const botao = document.querySelector('form button')

for(let i = 0; i < listaDeConversao.length; i++){
    for( let codigo_moeda in listaDePaises){
        let seletor =''
        if(i == 0){
            seletor = codigo_moeda == 'BRL' ? 'selected' : ''
        }else if(i == 1){
            seletor = codigo_moeda == 'USD' ? 'selected' : ''
        }

        let opcoes = ` <option value="${codigo_moeda}" ${seletor}>${codigo_moeda}</option>`

        listaDeConversao[i].insertAdjacentHTML('beforeend', opcoes)
    }

    listaDeConversao[i].addEventListener('change', e=>{
        bandeira(e.target)
    })
}

function bandeira(elemento){
    for(let code in listaDePaises){
        if(code == elemento.value){
            let img = elemento.parentElement.querySelector('img')
            img.src =`https://flagcdn.com/48x36/${listaDePaises[code].toLowerCase()}.png`
        }
    }
}

window.addEventListener('load', ()=>{
    obterValor()
})

botao.addEventListener('click', e=>{
    e.preventDefault()
    obterValor()
})

const icone = document.querySelector('.listaDeConversao .icone')

icone.addEventListener('click', ()=>{
    let inversao = conversaoDe.value
    conversaoDe.value = conversaoPara.value
    conversaoPara.value = inversao
    bandeira(conversaoDe)
    bandeira(conversaoPara)
    obterValor()
})

function obterValor(){
    const valor = document.querySelector('.valor input'),
    resultado = document.querySelector('.resultado')
    

    let val = valor.value
    
    if(val == '' || val == '0'){
        valor.value = '1'
        val = 1
    }
     resultado.innerHTML = 'Fazendo Conversão...'
    const chave = '830421eeb8ed2573943e5f90'

    let url = `https://v6.exchangerate-api.com/v6/${chave}/latest/${conversaoDe.value}`

    fetch(url)
    .then(response => response.json())
    .then(result =>{
        let taxaDeConversao = result.conversion_rates[conversaoPara.value]
        let totalDeConversao = (val * taxaDeConversao).toFixed(2)
        resultado.innerHTML = `${val} ${conversaoDe.value} = ${totalDeConversao} ${conversaoPara.value}`
    })
    .catch(()=>{
        resultado.innerHTML = 'Ops...temos um erro por aqui :( !!'
    })
}