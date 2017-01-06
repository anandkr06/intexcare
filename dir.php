<?php
$dir = new DirectoryIterator($path='D:/xampp/htdocs/intexcare/Views');
foreach ($dir as $fileinfo) {
    if ($fileinfo->isDir() && !$fileinfo->isDot()) {
        echo $fileinfo->getFilename().'<br>';
    }
}?>

$("dl> dd:gt("+($("dd").length-3)+")").hide();$("dl> dt:gt("+($("dt").length-3)+")").hide();

setTimeout(function(){ $("dl> dd:gt("+($("dd").length-3)+")").hide();$("dl> dt:gt("+($("dt").length-3)+")").hide();}, 3000);




$(".col-md-4.bloG>.widget.widget-recent-post>dl> dd:gt("+($("dd").length-3)+")").hide();
$(".col-md-4.bloG>.widget.widget-recent-post>dl> dt:gt("+($("dt").length-3)+")").hide();

$("#anand>.widget-recent-post>dl> dd:gt("+($("dd").length-3)+")").hide();
$("#anand>.widget-recent-post>dl> dt:gt("+($("dt").length-3)+")").hide();