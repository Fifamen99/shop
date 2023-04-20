<pre>
    <? print_r($_POST); ?>
</pre>


<?php
    
    // Формуємо дані
    $to      = 'admin@gmail.com';
    $subject = 'Замовлення з сайту';
    $message = 'Замовлення з сайта де є список замовлення';

    // Відправляємо листа про замовлення собі
    // mail($to, $subject, $message);

    // Листи приходять в цю папку:
    // C:\OSPanel\userdata\temp\email
?>