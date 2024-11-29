<?php 
 echo "conditional statements";

    
     $showVariable = true;
     $name = "Ram";
     $auth = false
     if($showVariable == true) {
       //execute code
       echo $name;
      
     } elseif($showVariable && $name == 'Ram' && $auth) {
        echo "Hello ".$name;

     } elseif($showVariable && $name) {

        echo 'not ram'
     } else {
        echo "else statement"
     }
     

     //condition  ? if condition : else condition

     //variable = (condition) ? if condition : else condition 

     //$showVariable = ($showVariable == true) ? $name : "short hand: else";

     $showVariable == true ? $name : "short hand: else";

     //Dont!
     /*
     $showVariable = ($showVariable == true) ? name : "short hand else";
     echo $showVariable; 
     */

?>