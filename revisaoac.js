//instalando programas
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");


//configurando o roteamento para teste no postman
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;


//configurando o acesso ao mongodb
mongoose.connect('mongodb://127.0.0.1:27017/Eric-hopechildteste',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    //serverSelectionTimeoutMS : 20000
});


//criando a model do seu projeto
const PessoaSchema = new mongoose.Schema({
    nome : {type : String},
    email : {type : String, required : true},
    endereco : { type : String},
    numero : {type : Number},
    cep : {type : String, required : true},
    nascimento : {type : Date, required : true}
});


const Pessoa = mongoose.model("Pessoa", PessoaSchema);


//configurando os roteamentos
app.post("/cadastropessoa", async(req, res)=>{
    const nome = req.body.nome;
    const email = req.body.email;
    const endereco = req.body.endereco;
    const numero = req.body.numero;
    const cep  = req.body.cep;
    const nascimento = req.body.nascimento

//testando c todos os campos foram preenchidos 
    if(nome == null || email == null || numero == null || cep == null || nascimento == null){
        return res.status(400).json({error : "preencha os campo"})
    }

//teste mais importante da ac 
    const emailexiste = await Pessoa.findOne({email: email})
    if(emailexiste){
        return res.status(400).json({error : "e email ja existe"})
    }


    const pessoa = new Pessoa({
        nome : nome,
        email : email,
        endereco : endereco,
        numero : numero,
        cep : cep,
        nascimento : nascimento
    })


    try{
        const newPessoa = await pessoa.save();
        res.json({error : null, msg : "Cadastro ok", pessoaId : newPessoa._id});
    } catch(error){
        res.status(400).json({error});
    }


});
//rota para o get de cadastro
app.get("/cadastropessoa", async(req, res)=>{
    res.sendFile(__dirname +"/cadastropessoa.html");
})
//rota raiz

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})


//configurando a porta
app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// Define o número máximo de ouvintes de eventos para o objeto myEmitter
myEmitter.setMaxListeners(20); // Defina o número desejado de ouvintes

// Adicione seus ouvintes de eventos aqui
myEmitter.on('evento', () => {
  // Lógica do evento
});