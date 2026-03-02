<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if(!empty($_POST["botonEnviar"])){
        echo "Enviar correo <br>";
        // Recibir los datos del formulario
      echo $_POST["names"]." email ".$_POST["email"]." texto ".$_POST["texto"];
        $nombre =  $_POST["names"];
        $email =  $_POST["email"];
        $mensaje =  $_POST["texto"];

      $mail = new PHPMailer(true);

      try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->SMTPAuth   = true;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587; // o 465 si usas SSL o 587

        $mail->Host       = 'smtp.gmail.com';   // Cambia esto
        $mail->Username   = 'sistemasevcr2021@gmail.com'; // Cambia esto
        $mail->Password   = 'cxertkxerawvrigk';            // Cambia esto
        //$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;// o PHPMailer::ENCRYPTION_SMTPS PHPMailer::ENCRYPTION_STARTTLS; 
        

        // Configuración del correo
        $mail->setFrom('sistemasevcr2021@gmail.com', 'Formulario Web');
        $mail->addAddress('rgarcia@globalnom.net'); // A quién se envía el correo
        //$mail->addReplyTo($email, $nombre);

        $mail->isHTML(true);
        $mail->Subject = 'Nuevo mensaje desde el formulario';
        $mail->Body    = "
            <h2>Nuevo mensaje desde el sitio web</h2>
            <p><b>Nombre:</b> $nombre</p>
            <p><b>Correo:</b> $email</p>
            <p><b>Mensaje:</b><br>$mensaje</p>
        ";

        $mail->send();
        echo 'Mensaje enviado correctamente.';
    }  catch (Exception $e) {
        echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
    }
}
?>