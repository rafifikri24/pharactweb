var http = require("http")
var url = require("url")
var fs = require("fs")
var qs = require("querystring")
const port = process.env.PORT || 3000;

var hal2 = fs.readFileSync("./news.html");
var hal3 = fs.readFileSync("./gallery.html");
var hal4 = fs.readFileSync("./about.html");
// var result_login = fs.readFileSync("./profil.html");

function css(request, response) {
    if (request.url === "/style.css") {
        response.writeHead(200, { "Content-type": "text/css" });
        var fileContents = fs.readFileSync("./style.css", { encoding: "utf8" });
        response.write(fileContents);
        response.end()
    }
}

var server = http.createServer(function(request,response){
    css(request, response);
    response.writeHead(200, { "Content-Type": "text/html" });
    var q = url.parse(request.url,true)
    if (q.pathname == "/" && request.method == "GET"){
        var keyword = q.query.keyword;
        if (keyword){
            response.writeHead(200, {"Content-Type": "text/html"});
            // response.write("<h2>Pencarian</h2>");
            // response.write("<p>Anda Mencari : <b>" + keyword + "</b> </p>");
            // response.write("<h3><b></b>Tidak ada Hasil ! Maaf Website ini masih dalam tahap pengembangan</b></h3>");
            response.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="style.css">
                <title>Pharact</title>
            </head>
            <body>
                <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                    <symbol id="email" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                    </symbol>
                    <symbol id="facebook" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </symbol>
                    <symbol id="whatsapp" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                    </symbol>
                    <symbol id="like" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
                    </symbol>
                    <symbol id="comment" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22,4C22,2.89 21.1,2 20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H18L22,22V4Z" />
                    </symbol>
                    <symbol id="share" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
                    </symbol>
                </svg>
                <ul class="navbar">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/hal2">News</a>
                    </li>
                    <li>
                        <a href="/hal3">Gallery</a>
                    </li>
                    <li>
                        <a href="/hal4">About Us</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                </ul>
                <div class="container">
                    <div class="row">
                        <div class="column-12 kolom-xl-8">
                            <h1>Kata pencarian "${keyword}" tidak ada!</h1>
                            <p>Maaf, kata kunci yang anda cari tidak ada dalam web kami.</p>
                            <button type="submit"><a href='/'>Kembali</a></button>
                        </div>
                    </div>
                    <br><br><br><br><br>
                </div>
                <br>
                <ul class="footer">
                    <li>
                        <a href="#">Pharact Website</a>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, laudantium! Illo, fugit? Aperiam mollitia blanditiis fugit rerum laboriosam modi unde error, deleniti harum et dolorem neque quas asperiores nulla eligendi?</p>
                    </li>
                    <ul class="navbar-icon text-center">
                        <li>
                            <a hre="#">
                                <svg width="24" height="24">
                                    <use xlink:href="#email" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a hre="#">
                                <svg width="24" height="24">
                                    <use xlink:href="#whatsapp" />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a hre="#">
                                <svg width="24" height="24">
                                    <use xlink:href="#facebook" />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </ul>
            </body>
            </html>`)
            response.end();
            }
        else{
            fs.readFile("index.html",function(error,data){
                if (error){
                    response.writeHead(404,{"Content-Type": "text/html"});
                    response.end("404 Not Found");
                }
            response.writeHead(200,{"Content-Type":"text/html"});
            response.write(data);
            response.end();    
            });
        }
    }
    else if (request.url == '/hal2'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(hal2);
        response.end();
    }
    else if (request.url == '/hal3'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(hal3);
        response.end();
    }
    else if (request.url == '/hal4'){
        response.writeHead(200, { "Content-Type": "text/html" });
        response.write(hal4);
        response.end();
    }
    else if (request.url==="/login" && request.method === "GET"){
        fs.readFile("login.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data);
                return response.end();
            }
        });
    }
    else if (request.url==="/login" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
            if (formData.username === "mahasiswa" && formData.password === "rafi"){
                response.writeHead(200, { "Content-Type": "text/html" });
                // response.write("<h2>Selamat Datang Mahasiswa SP 3.2</h2>");
                // response.write("<p>username : "+formData.username+"</p>");
                // response.write("<p>password : "+formData.password+"</p>");
                // response.write("<a href='/'>Kembali</a>");
                response.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="style.css">
                    <title>Pharact</title>
                </head>
                <body>
                    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                        <symbol id="email" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                        </symbol>
                        <symbol id="facebook" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                        </symbol>
                        <symbol id="whatsapp" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                        </symbol>
                        <symbol id="like" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
                        </symbol>
                        <symbol id="comment" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22,4C22,2.89 21.1,2 20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H18L22,22V4Z" />
                        </symbol>
                        <symbol id="share" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
                        </symbol>
                    </svg>
                    <ul class="navbar">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/hal2">News</a>
                        </li>
                        <li>
                            <a href="/hal3">Gallery</a>
                        </li>
                        <li>
                            <a href="/hal4">About Us</a>
                        </li>
                        <li>
                            <a href="/">Log Out</a>
                        </li>
                    </ul>
                    <div class="container">
                        <div class="row">
                            <div class="column-12 kolom-xl-8">
                                <h1>Selamat datang Mahasiswa STIKOM PGRI BANYUWANGI</h1>
                                <h2>Rafi Fikrian Nirwana</h2>
                                <p>Nama saya Rafi Fikrian Nirwana. Saya lahir pada tanggal 8 bulan Juli 2002. Alamat rumah saya berada di Jl. Tidar Timur SMPN 3 Banyuwangi. Saya saat ini menempuh pendidikan ditingkat mahasiswa. Saya kuliah di STIKOM PGRI BANYUWANGI</p>
                                <table>
                                    <tr>
                                        <td>
                                            Username
                                        </td>
                                        <td> : </td>
                                        <td>
                                            <p>${formData.username}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Password
                                        </td>
                                        <td> : </td>
                                        <td>
                                            <p>${formData.password}</p>
                                        </td>
                                    </tr>
                                </table>
                                <ul class="navbar-icon text-center">
                                    <li>
                                        <a hre="#">
                                            <svg width="24" height="24">
                                                <use xlink:href="#email" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a hre="#">
                                            <svg width="24" height="24">
                                                <use xlink:href="#whatsapp" />
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a hre="#">
                                            <svg width="24" height="24">
                                                <use xlink:href="#facebook" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="column-12 kolom-xl-4">
                                <img class="icon" src="https://res.cloudinary.com/dkbb24jzm/image/upload/v1668408295/profil_etirp0.jpg" alt="">
                            </div>
                        </div>
                        <br><br><br><br><br>
                    </div>
                    <br>
                    <ul class="footer">
                        <li>
                            <a href="#">Pharact Website</a>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, laudantium! Illo, fugit? Aperiam mollitia blanditiis fugit rerum laboriosam modi unde error, deleniti harum et dolorem neque quas asperiores nulla eligendi?</p>
                        </li>
                        <ul class="navbar-icon text-center">
                            <li>
                                <a hre="#">
                                    <svg width="24" height="24">
                                        <use xlink:href="#email" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a hre="#">
                                    <svg width="24" height="24">
                                        <use xlink:href="#whatsapp" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a hre="#">
                                    <svg width="24" height="24">
                                        <use xlink:href="#facebook" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </ul>
                </body>
                </html>
                `);
                response.end();
                }
            else{
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<h2>Login Gagal</h2>");
                response.write("<a href='/login'>Coba Kembali</a>");
                response.end();
            }
        });

    }
    else if (request.url==="/signup" && request.method === "GET"){
        fs.readFile("signup.html",(error,data)=>{
            if (error){
                response.writeHead(404,{"Content-Type":"text/html"});
                return response.end("404 Server Not Found");                
            }
            else{
                response.writeHead(200, {"Content-Type":"text/html"});
                response.write(data);
                return response.end();
            }
        });
    }
    else if (request.url==="/signup" && request.method === "POST"){
        var requestBody = "";
        request.on("data",function(data){
            requestBody += data;
        });
        request.on("end",function(){
            var formData = qs.parse(requestBody);
            if ( formData.firstname && formData.lastname && formData.email 
                && formData.username && formData.password ){
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="style.css">
                    <title>Pharact</title>
                </head>
                <body>
                    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                        <symbol id="email" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
                        </symbol>
                        <symbol id="facebook" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                        </symbol>
                        <symbol id="whatsapp" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.71C7 10.93 7.89 12.1 8 12.27C8.14 12.44 9.76 14.94 12.25 16C12.84 16.27 13.3 16.42 13.66 16.53C14.25 16.72 14.79 16.69 15.22 16.63C15.7 16.56 16.68 16.03 16.89 15.45C17.1 14.87 17.1 14.38 17.04 14.27C16.97 14.17 16.81 14.11 16.56 14C16.31 13.86 15.09 13.26 14.87 13.18C14.64 13.1 14.5 13.06 14.31 13.3C14.15 13.55 13.67 14.11 13.53 14.27C13.38 14.44 13.24 14.46 13 14.34C12.74 14.21 11.94 13.95 11 13.11C10.26 12.45 9.77 11.64 9.62 11.39C9.5 11.15 9.61 11 9.73 10.89C9.84 10.78 10 10.6 10.1 10.45C10.23 10.31 10.27 10.2 10.35 10.04C10.43 9.87 10.39 9.73 10.33 9.61C10.27 9.5 9.77 8.26 9.56 7.77C9.36 7.29 9.16 7.35 9 7.34C8.86 7.34 8.7 7.33 8.53 7.33Z" />
                        </symbol>
                        <symbol id="like" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M23,10C23,8.89 22.1,8 21,8H14.68L15.64,3.43C15.66,3.33 15.67,3.22 15.67,3.11C15.67,2.7 15.5,2.32 15.23,2.05L14.17,1L7.59,7.58C7.22,7.95 7,8.45 7,9V19A2,2 0 0,0 9,21H18C18.83,21 19.54,20.5 19.84,19.78L22.86,12.73C22.95,12.5 23,12.26 23,12V10M1,21H5V9H1V21Z" />
                        </symbol>
                        <symbol id="comment" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22,4C22,2.89 21.1,2 20,2H4A2,2 0 0,0 2,4V16A2,2 0 0,0 4,18H18L22,22V4Z" />
                        </symbol>
                        <symbol id="share" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21,12L14,5V9C7,10 4,15 3,20C5.5,16.5 9,14.9 14,14.9V19L21,12Z" />
                        </symbol>
                    </svg>
                    <ul class="navbar">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/hal2">News</a>
                        </li>
                        <li>
                            <a href="/hal3">Gallery</a>
                        </li>
                        <li>
                            <a href="/hal4">About Us</a>
                        </li>
                        <li>
                            <a href="/">Log Out</a>
                        </li>
                    </ul>
                    <div class="">
                        <div class="con-log" align="center">
                            <h2>Anda Berhasil Mendaftar</h2>
                            <form class="form" action="/signup" method="POST">
                                <table class="box_login1" align="center">
                                    <tr>
                                        <td><label for='firstname'>Nama Depan</label></td>
                                        <td> : </td>
                                        <td>
                                            <p>${formData.firstname}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for='lastname'>Nama Belakang</label></td>
                                        <td> : </td>
                                        <td>
                                            <p>${formData.lastname}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for='email'>Email</label></td>
                                        <td> : </td>
                                        <td>
                                            <p>${formData.email}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for='username'>Username</label></td>
                                        <td> : </td>
                                        <td>
                                            <p>${formData.username}</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><label for='password'>Password</label></td>
                                        <td> : </td>
                                        <td>
                                            <p>${formData.password}</p>
                                        </td>
                                    </tr>
                                </table>
                            </form>
                            <button type="submit"><a href='/'>Kembali</a></button>
                        </div>
                    </div>
                    <br>
                    <br>
                    <br>
                    <ul class="footer">
                        <li>
                            <a href="#">Pharact Website</a>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, laudantium! Illo, fugit? Aperiam mollitia blanditiis fugit rerum laboriosam modi unde error, deleniti harum et dolorem neque quas asperiores nulla eligendi?</p>
                        </li>
                        <ul class="navbar-icon text-center">
                            <li>
                                <a hre="#">
                                    <svg width="24" height="24">
                                        <use xlink:href="#email" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a hre="#">
                                    <svg width="24" height="24">
                                        <use xlink:href="#whatsapp" />
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a hre="#">
                                    <svg width="24" height="24">
                                        <use xlink:href="#facebook" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </ul>
                </body>
                </html>
                `)
                response.end();
                }
            else{
                response.writeHead(200,{"Content-Type":"text/html"});
                response.write("<h2>Login Gagal</h2>");
                response.write("<a href='/login'>Coba Kembali</a>");
                response.end();
            }
        });

    }
});

server.listen(port);
console.log("server Berjalan")
