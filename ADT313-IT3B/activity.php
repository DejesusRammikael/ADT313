<h1>Hands-on Activity</h1>

 <?php
      $table = array(
        "header" => array(
            "Firstname",
            "Middlename",
            "Lastname",
            "Section",
            "Course",
            "YearLevel"

         /*   foreach($table as $tables){
                foreach($tables as "")
            } */
        ),
        "body" => [
            array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        ),
        array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        ),
        array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        ),
        array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        ),
        array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        ),
        array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        ),
        array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        ),
        array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        ),
        array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        ),
        array(
            "firstname" => "Firstname",
            "middlename" => "Middlename",
            "lastname" => "Lastname",
            "section" => "Section",
            "course" => "Course",
            "yearlevel" => "YearLevel"
        )
        ],
      )
     
 ?>
    <table border="1">
        <thead> 
        <?php foreach ($table['header'] as $header){ ?>

        <th> <?php echo $header;?> 
        
        <?php } ?> 
        <th>StudentID</th>
        <th><?php echo $table['header'][0]?></th>
        </thead>
        <tbody> 
          
            <tr> 
                <td>123</td>
                <td> <?php echo $table['body'][0]['firstname'] ?> </td>
                <td> <?php echo $table['body'][0]['middlename'] ?> </td>
                <td> <?php echo $table['body'][0]['lastname'] ?> </td>
                <td> <?php echo $table['body'][0]['section'] ?> </td>
                <td> <?php echo $table['body'][0]['course'] ?> </td>
                <td> <?php echo $table['body'][0]['yearlevel'] ?> </td>
            </tr>
        </tbody>
    </table>
        
            