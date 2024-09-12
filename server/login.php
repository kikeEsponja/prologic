<?php
include "config.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['correo'];
    $password = $_POST['contras'];
    $sql = "SELECT * FROM `usuario` where correo = '" . $email . "' and contras = '" . $password . "' ";
    $query =  mysqli_query($conn, $sql);

    if (mysqli_num_rows($query) > 0) {
        $row = mysqli_fetch_assoc($query);
        session_start();
        $_SESSION['nombre'] = $row['nombre'];
        header('Location: ./home.php');
    } else {
        echo "<script> alert('Correo o contraseña incorrectas.'); </script>";
        echo '<a class="btn btn-warning" href="./login.php">volver</a>';
    }
}