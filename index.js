let express = require("express");
let fs = require("fs");
let path = require("path");
let app = express();


//Middleware
app.use(express.static("public"));
//Procesar los datos a traves del formulario
app.use(express.urlencoded({extended: false}));



app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "index.html"));
});

app.get("/contacto", (request, response) => {
    response.sendFile(path.join(__dirname, "contact.html"));
});

app.get("/proyectos", (request, response) => {
    response.sendFile(path.join(__dirname, "projects.html"));
});

app.get("/nosotros",(request, response) => {
    response.sendFile(path.join(__dirname, "about.html"));
});

app.post("/usuarios", (request, response) => {
    fs.writeFile("db_usuarios.txt", JSON.stringify(request.body), (error) => {
        if(error) {
            console.log(error);
        }
        response.redirect("/");
    });
});

//Debe ir siempre al final
//app-use -> get, post, delete, put
app.use((request, response) => {
    response.sendFile(path.join(__dirname, "404.html"));
});

app.listen(8080, () => {
    console.log("Servidor inicializado en puerto 8080")
});