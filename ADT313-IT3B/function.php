<h1>Function </h1>
<?php
 function generateUser(){
     
    $user = "User 1";
    $role = "Student";

    echo $user."</br>";
    echo $role."</br>";
 }
 function editUser($value, $age){
    echo 'Edit '.$value.'</br>';
    echo 'Age '.$age.'</br>';

 }

 generateUser();
 editUser("zzzzzzz" , 20);

?>