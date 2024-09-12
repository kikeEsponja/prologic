<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="author" content="fortrainevolution">
    <link rel="shortcut icon" href="/img/logoparami2.jpg">
    <link rel="stylesheet" href="/css/nivel.css" type="text/css">
    <title>Portafolio</title>
  	<style>
    	h2{
      		color: #000;
    	}
  	</style>
</head>
<body>
    <header>
    </header>

    <section>
        <center>
            <div>
                <h1>Estado del mensaje</h1>
                <p>Mensaje enviado</p>
                <button type="button" onclick="goBack()" class="btn btn-warning">Volver</button>
            </div>
        </center>
    </section>

    <div style="width: 100%; background: #eee; padding: 5%;">
    <?php            
          if($_SERVER["REQUEST_METHOD"] === "POST"){
            $mensaje = $_POST["mensaje"];
            $nombre = $_POST["nombre"];
            $correo = $_POST["correo"];
            $destinatario = "element3999@gmail.com";
            $asunto = "Nuevo mensaje desde el formulario";
            $cabeceras = "From: contact@fortrainevolution.com";
            //$cabeceras .= "Content-type: text/html; charset=UTF-8\r\n";
            
            $cuerpo = 	"Mensaje: " . $mensaje . "\n" .
          				"Correo: " . $correo . "\n" .
          				"Nombre: " . $nombre . "\n";
            
              mail($destinatario, $asunto, $cuerpo, $cabeceras, $email);
              
    		$respuestaAutomatica = "
    		<html>
    		<head>
        		<title>Respuesta Automática</title>
        		<style>
            		/* Estilos CSS para la respuesta automática */
            		body {
                		font-family: Arial, sans-serif;
                		background: #aaa;
                		color: #333;
                		margin: 0;
                		padding: 20px;
            		}
            		.container {
                    	background: linear-gradient(to bottom, #0f0, #002);
                		max-width: 600px;
                		margin: 0 auto;
                		background-color: #fff;
                		padding: 20px;
                		border-radius: 5px;
                		box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                        border: 2px solid black;
                        border-radius: 6px;
            		}
            		h1 {
                		color: #ff0;
            		}
            		p {
                    	color: #fff;
                		line-height: 1.6;
            		}
                    ul{
                    	color: #fff;
                    }
        		</style>
    		</head>
    		<body>
        		<div class=\"container\">
            		<h1>Gracias por su consulta</h1>
            		<p>responderé lo antes posible.</p>
        		</div>
    		</body>
    		</html>
    		";

    		// Cabeceras para correo HTML
    		$cabeceras_respuesta = "MIME-Version: 1.0" . "\r\n";
    		$cabeceras_respuesta .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    		$cabeceras_respuesta .= "From: contact@fortrainevolution.com";

    		mail($correo, "Respuesta Automática - Gracias por su consulta", $respuestaAutomatica, $cabeceras_respuesta);

    		echo "<h2>Gracias por su consulta. Mensaje enviado con éxito</h2>";
		} else {
    		echo "<p>No se recibió mensaje</p>";
		}
      ?>
	</div>

    <footer>
    </footer>
    <!--<script src="/js/index.js"></script>-->
    <script src="https://code.jquery.com/jquery-3.6.4.js" integrity="sha256-a9jBBRygX1Bh5lt8GZjXDzyOB+bWve9EiO7tROUtj/E=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
</body>
</html>